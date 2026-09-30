import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  console.log("---- Request info ----");

  console.log("method:", req.method);
  console.log("url:", req.url);
  console.log("params:", req.params);
  console.log("query:", req.query);
  console.log("body:", req.body);
  console.log("ip:", req.ip);
  console.log("cookies:", req.cookies);

  console.log("protocol:", req.protocol);
  console.log("secure:", req.secure);

  //header info
  console.log("all headers:", req.headers);
  console.log("user-agent:", req.get("user-agent"));
  console.log("accept (what client expects back):", req.get("accept"));
  console.log("content-type (what client is sending):", req.get("content-type"));
  console.log("accept-language:", req.get("accept-language"));
  console.log("referer:", req.get("referer"));
  console.log("authorization:", req.get("authorization"));
  console.log("mobile hint:", req.get("sec-ch-ua-mobile"));

  //send JSON back
  res.json({ userId: req.params.id, message: "Hello User route!" });
});

//post
app.post("/users", (req, res) => {
  console.log("content-type:", req.get("content-type"));
  console.log("body:", req.body);
  res.json({ message: "User received", data: req.body });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});