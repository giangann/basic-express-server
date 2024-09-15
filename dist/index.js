"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = 5001;
const app = (0, express_1.default)();
const route = express_1.default.Router();
app.use(express_1.default.json());
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
route.post("/auth/login", (req, res) => {
    var _a, _b, _c, _d, _e;
    const specialistToken = "eyJhbGciOiJIUzI1NiJ9.eyJhZGRyZXNzIjoiTm8gYWRkIiwicm9sZSI6IkNodXnDqm4gdmnDqm4iLCJwaG9uZSI6IjAwMDAwMDAwMDAwIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gS2jDoWkiLCJlbWFpbCI6Im52a0BnbWFpbC5jb20iLCJzdWIiOiIwMDAwMTExMTExMTEiLCJpYXQiOjE3MjYzOTQ4NDMsImV4cCI6MTcyNjQ4MTI0M30.g3yHOT0VnmdRRQbzx_ktzOFBAooRQIyfCkV7MMmI31U";
    try {
        const idCard = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.identifyCard) !== null && _b !== void 0 ? _b : "";
        const password = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.password) !== null && _d !== void 0 ? _d : "";
        if (idCard !== "000011111111" || password !== "!Khai01011970")
            throw new Error("Wrong cridentials");
        res.status(200).send({
            statusCode: 200,
            data: {
                token: specialistToken,
            },
        });
    }
    catch (error) {
        res.status(400).send({ statusCode: 400, error: (_e = error.message) !== null && _e !== void 0 ? _e : "Unknown Error" });
    }
});
// Use the route
app.use("/", route);
// start
app.listen(port, () => {
    console.log("Express app running on port", port);
});
