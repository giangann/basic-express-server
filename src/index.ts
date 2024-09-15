import Express from "express";
import cors from "cors";

const port = 5173;
const app = Express();
const route = Express.Router();
app.use(
  cors({
    // origin: "*",
    origin: ["http://localhost:8081", "exp://192.168.2.14:8081"], // Replace with your actual origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// default route
route.get("/", (req, res) => {
  res.json("Hello, basic express server");
});

route.get("/me", (req, res) => {
  const mockData = {
    id: 1,
    name: "JohnDue",
    auth: "1-JohnDue-auth-value",
  };
  res.send(mockData);
});
route.get("/auth", (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token);
  if (!token) res.status(500).json("No token");

  res.json(token);
});
route.post("/auth/login", (req, res) => {
  const specialistToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiTm8gYWRkIiwicm9sZSI6IkNodXnDqm4gdmnDqm4iLCJwaG9uZSI6IjAwMDAwMDAwMDAwIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gS2jDoWkiLCJlbWFpbCI6Im52a0BnbWFpbC5jb20iLCJzdWIiOiIwMDAwMTExMTExMTEiLCJpYXQiOjE3MjYzOTQ4NDMsImV4cCI6MTcyNjQ4MTI0M30.g3yHOT0VnmdRRQbzx_ktzOFBAooRQIyfCkV7MMmI31U";
  try {
    const idCard = req.body?.identifyCard ?? "";
    const password = req.body?.password ?? "";

    if (idCard !== "000011111111" || password !== "!Khai01011970") throw new Error("Wrong cridentials");

    res.status(200).send({
      statusCode: 200,
      data: {
        token: specialistToken,
      },
    });
  } catch (error: any) {
    res.status(400).send({ statusCode: 400, error: error.message ?? "Unknown Error" });
  }
});

// Use the route
app.use("/", route);

// start
app.listen(port, () => {
  console.log("Express app running on port", port);
});
