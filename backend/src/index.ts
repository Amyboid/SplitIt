import { Hono } from "hono";
import { fillUserData, getUsers } from "./lib/logto";
import { db } from "./lib/database";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

const HOSTURL = "http://localhost:5173/api/avatars/";

const app = new Hono();
app.use(logger())

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

app.get("/groups", (c) => {
  return c.text("hey")
})

app.post("/add/group", async (c) => {
  const data = await c.req.json()
  db.setNewGroup(data.groupname, data.groupdescription)
  //todo
  return c.text("hp")
})




app.get(
  '/avatars/*',
  serveStatic({
    root: './',
  })
)



export default app;
