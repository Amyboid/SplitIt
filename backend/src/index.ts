import { Hono } from "hono";
import { fillUserData, getUsers } from "./lib/logto";
import { db } from "./lib/database";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

const HOSTURL = "http://localhost:5173/api/avatars/";

const app = new Hono();
app.use(logger());

app.get(
  '/avatars/*',
  serveStatic({
    root: './',
  })
)

app.post("/newuser", async (c) => {
  const id = (await c.req.json()).user.id;
  db.setNewUser(id)
  return c.text("ok");
});

app.get("/isnewuser/:userid", (c) => {
  const { userid } = c.req.param();
  const status = db.getUserById(userid)
  if (status.length && (status[0][1] === userid)) return c.json({ new: true });
  return c.json({ new: false });
});

app.post("/onboarduser", async (c) => {
  const formdata = await c.req.formData();
  console.log();
  const image: File = formdata.get("avatar") as File;
  const fileName = `${(new Bun.CryptoHasher("md5")).update(`${Date.now()}_${image.name}`,).digest("hex")}.${image.type.split('/')[1]}`;
  const arrayBuffer = await image.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer);
  await Bun.write(`./avatars/${fileName}`, buffer)

  const data = (await fillUserData({ ...Object.fromEntries(formdata.entries()), avatar: `https://splitit.local/${fileName}` }))
  console.log("nmmm", data);


  if (data.ok) {
    db.deleteNewUser(formdata.get("userid") as string)
    db.setUser(formdata.get("username") as string, formdata.get("userid") as string)
    c.status(200)
    return c.text("ok")
  }
  c.status(501)
  return c.text("not ok")
})

app.get("/users", async (c) => {
  return c.json(
    (await getUsers())
      .map((e: any) => ({ username: e.username, name: e.name, avatar: (HOSTURL + e.avatar.split('.local/')[1]) }))
  )
})

app.get("/groups/:username", (c) => {
  const { username } = c.req.param();
  const groupIds = db.getGroupByUsername(username).map((e) => e[1]) as (number | bigint)[]
  console.log(groupIds);
  const groups = groupIds.map(e => ({
    ...db.getGroupById(e)[0] as Object,
    GroupMembers: db.getMembersByGroupId(e)
  }))

  return c.json(groups)
})

app.get("/groups/:groupid/members", async (c) => {
  const { groupid } = c.req.param();
  let gid: number | bigint = 0;

  if (!/^-?\d+$/.test(groupid)) {
    throw new Error("Invalid number string");
  }

  // Convert to BigInt if the number is too large for a regular integer
  if (groupid.length > 15) {
    gid = BigInt(groupid);
  } else {
    gid = parseInt(groupid);
  }

  const members = db.getMembersByGroupId(gid);

  return c.json(
    (await getUsers()).filter((e: any) => members.includes(e.username))
      .map((e: any) => ({ username: e.username, name: e.name, avatar: (HOSTURL + e.avatar.split('.local/')[1]) }))
  );
})

app.post("/groups/:groupid/expense", async (c) => {
  const { groupid } = c.req.param();
  let gid: number | bigint = 0;
  if (!/^-?\d+$/.test(groupid)) {
    throw new Error("Invalid number string");
  }
  if (groupid.length > 15) {
    gid = BigInt(groupid);
  } else {
    gid = parseInt(groupid);
  }

  let data = await c.req.json();

  console.log("datta:  ", data);
  for (const element of data.ExpenseDivisions) {
    console.log("elem:  ", element);
    if (isNaN(element.Percentage)) return c.text("error")
  }

  const ExpenseId = db.addExpense({ GroupId: gid, ...data });

  data.ExpenseDivisions.map((e: any) => {
    // console.log(e);

    db.addExpenseDivision({ ExpenseId: ExpenseId, ...e })
  })

  return c.json([]);
})

app.post("/add/group", async (c) => {
  const data = await c.req.json()
  console.log(data);

  const groupId = (db.setNewGroup(data.groupname, data.groupdescription)).lastInsertRowid


  data.groupmembers.forEach((e: any) => {
    const hostUser = data.groupmembers.at(-1).name
    // if (e.name === hostUser) {
    //   db.addUserToGroup(groupId, e.name)
    //   return
    // }
    const InvitationId = (Bun.hash(groupId + e.name + Date.now())).toString(16)
    const NotificationId = (db.addNotifications(e.name, hostUser + " invited you to join " + data.groupname + "#" + InvitationId, "invitation")).lastInsertRowid;

    db.addUserToGroupInvitations(InvitationId, e.name, groupId, NotificationId)
  })
  return c.text("hp")
})

app.get("/invitation/accept/:invitationId", async (c) => {
  const { invitationId } = c.req.param()
  const { Username, GroupId, NotificationId } = db.getGroupInfoByInvitationId(invitationId)[0] as any
  db.addUserToGroup(GroupId, Username)
  console.log(db.deleteInvitationByInvitationId(invitationId))
  db.deleteNotificationByNotificationId(NotificationId)
  return c.text("ok")
  
})

app.get("/invitation/reject/:invitationId", async (c) => {
  const { invitationId } = c.req.param()
  const { NotificationId } = db.getGroupInfoByInvitationId(invitationId)[0] as any
  db.deleteInvitationByInvitationId(invitationId)
  db.deleteNotificationByNotificationId(NotificationId)
  return c.text("ok")
})

app.get("/notifications/:username", async (c) => {
  const { username } = c.req.param();
  console.log(username);

  console.log(db.getNotificationsByUsername(username));
  return c.json(db.getNotificationsByUsername(username))
})

app.get("/expenses/:groupid/:userid", async (c) => {
  const { groupid, userid } = c.req.param();
  console.log(groupid, userid);

  const userDebt = db.getExpenseByUserId(userid).reduce((accumulator: number, [amount, percentage]: any) => {
    accumulator += (percentage / 100) * amount; // Contribution of percentage
    return accumulator; // Return the accumulator for the next iteration
  }, 0);

  return c.json({userDebt, expenses: db.getExpenseByGroupId(groupid)})
})


app.get(
  '/avatars/*',
  serveStatic({
    root: './',
  })
)
app.get('/test', (c) => {
  return c.text("running...");
})




export default app;
