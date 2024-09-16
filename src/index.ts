import Express from "express";
import cors from "cors";

const port = 5001;
const specialistToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiTm8gYWRkIiwicm9sZSI6IkNodXnDqm4gdmnDqm4iLCJwaG9uZSI6IjAwMDAwMDAwMDAwIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gS2jDoWkiLCJlbWFpbCI6Im52a0BnbWFpbC5jb20iLCJzdWIiOiIwMDAwMTExMTExMTEiLCJpYXQiOjE3MjYzOTQ4NDMsImV4cCI6MTcyNjQ4MTI0M30.g3yHOT0VnmdRRQbzx_ktzOFBAooRQIyfCkV7MMmI31U";
const specialistUserInfo = {
  user: {
    name: "Nguyễn Văn Khái",
    email: "nvk@gmail.com",
    address: "No add",
    phone: "00000000000",
    identifyCard: "000011111111",
    roleName: "Chuyên viên",
    roleCode: "SPECIALIST",
  },
};
const app = Express();
const route = Express.Router();
app.use(Express.json());

app.use((req, res, next) => {
  const origin = req.get('origin');

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers, ngrok-skip-browser-warning, Ngrok-Skip-Browser-Warning',
  );

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});
app.use(
  cors({
    // origin: "*",
    origin: ["http://localhost:8081", "exp://192.168.2.14:8081", "http://localhost:5173"], // Replace with your actual origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"],
  })
);

// default route
route.get("/", (req, res) => {
  res.json("Hello, basic express server");
});

route.get("/check", (req, res) => {
  try {
    res.status(200).send({
      statusCode: 200,
      data: "Checking success, welcome to my basic-express-server",
    });
  } catch (error: any) {
    res.status(500).send({
      statusCode: 401,
      error: error?.message ?? "Unknown Error",
    });
  }
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
    res.status(401).send({ statusCode: 401, error: error.message ?? "Unknown Error" });
  }
});

route.get("/auth/verify-token", (req, res) => {
  try {
    const token = req.query?.token ?? "";
    if (!token) throw new Error("Invalid token!");

    res.status(200).send({
      statusCode: 200,
      data: specialistUserInfo,
    });
  } catch (error: any) {
    res.status(401).send({ statusCode: 401, error: error.message ?? "Unknown Error" });
  }
});

// Use the route
app.use("/", route);

// start
app.listen(port, () => {
  console.log("Express app running on port", port);
});
