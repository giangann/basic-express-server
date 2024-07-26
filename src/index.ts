import Express from "express";
import cors from "cors";

const port = 5000;
const app = Express();
const route = Express.Router();
app.use(
  cors({
    // origin: ["http://localhost:3000", "http://localhost:8081"],
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// default route
// app.use("/", (req, res) => {
//   res.json("Hello, basic express server");
// });

route.get("/me", (req, res) => {
  const mockData = {
    id: 1,
    name: "JohnDue",
  };
  res.send(mockData);
});

// Use the route
app.use("/", route);

// start
app.listen(port, () => {
  console.log("Express app running on port", port);
});
