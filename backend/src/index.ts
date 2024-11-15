import { Hono } from "hono";
import { fetchAccessToken } from "./lib/logto";
import { logtoEndpoint } from "./lib/logto";

const app = new Hono();

const newUsers: string[] = [];

app.post("/newuser", async (c) => {
  const id = (await c.req.json()).user.id;
  newUsers.push(id);
  return c.text("ok");
});

app.get("/isnewuser/:uid", (c) => {
  const { uid } = c.req.param();
  if (newUsers.includes(uid)) return c.json({ new: true });
  return c.json({ new: false });
});

export default app;
