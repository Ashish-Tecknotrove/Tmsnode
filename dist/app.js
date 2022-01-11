"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const root_routes_1 = __importDefault(require("./src/routes/root/root_routes"));
const curriculumroutes_1 = __importDefault(require("./src/routes/root/curriculumroutes"));
var multer = require('multer');
var cors = require('cors');
var upload = multer();
const app = (0, express_1.default)();
const form = multer();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(upload.array());
app.use(express_1.default.static('public'));
app.listen(process.env.PORT || 8000, () => {
    console.log("Node Server Started Running");
});
app.use("/TMS", root_routes_1.default);
app.use("/TMS", curriculumroutes_1.default);
// app.use("/api/v1/",LanguageRoutes)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome To TMS" });
});
