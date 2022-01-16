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
const companyroutes_1 = __importDefault(require("./src/routes/root/companyroutes"));
const subscriptionroutes_1 = __importDefault(require("./src/routes/root/subscriptionroutes"));
var multer = require('multer');
var formData = multer();
var cors = require('cors');
const app = (0, express_1.default)();
dotenv_1.default.config();
//app.use(bodyParser());
app.use(body_parser_1.default.json()); // For Accepting the JSON Data
app.use(body_parser_1.default.urlencoded()); // For Accepting the x-www-form-Data
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors());
//app.use(formdata.array());
app.use(express_1.default.static('public'));
app.listen(process.env.PORT || 8000, () => {
    console.log("Node Server Started Running");
});
app.use("/TMS", root_routes_1.default);
app.use("/TMS", curriculumroutes_1.default);
app.use("/TMS", companyroutes_1.default);
app.use("/TMS/subscription", subscriptionroutes_1.default);
// app.use("/api/v1/",LanguageRoutes)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome To TMS" });
});
exports.default = app;
