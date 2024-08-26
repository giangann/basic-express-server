"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = 5173;
const app = (0, express_1.default)();
const route = express_1.default.Router();
app.use((0, cors_1.default)({
    // origin: "*",
    origin: ["http://localhost:8081", "exp://192.168.2.14:8081"], // Replace with your actual origins
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
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
    if (!token)
        res.status(500).json("No token");
    res.json(token);
});
// Use the route
app.use("/", route);
// start
app.listen(port, () => {
    console.log("Express app running on port", port);
});
