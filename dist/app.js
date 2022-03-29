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
const elearningcontentroutes_1 = __importDefault(require("./src/routes/elearning/elearningcontentroutes"));
const language_routes_1 = __importDefault(require("./src/routes/language/language.routes"));
const traineeroutes_1 = __importDefault(require("./src/routes/root/traineeroutes"));
const morgan_1 = __importDefault(require("morgan"));
const trainerroutes_1 = __importDefault(require("./src/routes/root/trainerroutes"));
const subcompanyroutes_1 = __importDefault(require("./src/routes/root/subcompanyroutes"));
const master_departmentroutes_1 = __importDefault(require("./src/routes/root/master_departmentroutes"));
const company_departmentroutes_1 = __importDefault(require("./src/routes/root/company_departmentroutes"));
const elearning_traineeroutes_1 = __importDefault(require("./src/routes/elearning/elearning.traineeroutes"));
const simulatorRoutes_1 = __importDefault(require("./src/routes/root/simulatorRoutes"));
process.env.TZ = "Asia/Calcutta";
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
});
console.log(nDate);
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
app.use('/resources', express_1.default.static('resources'));
app.listen(process.env.PORT || 8000, () => {
    console.log("Node Server Started Running");
});
app.use("/TMS", root_routes_1.default);
app.use("/TMS", curriculumroutes_1.default);
app.use("/TMS", companyroutes_1.default);
app.use("/TMS/subscription", subscriptionroutes_1.default);
app.use("/TMS/elearning", elearningcontentroutes_1.default);
app.use("/TMS", language_routes_1.default);
app.use("/TMS", traineeroutes_1.default);
app.use("/TMS/companyadmin", trainerroutes_1.default);
app.use("/TMS/department", master_departmentroutes_1.default);
app.use("/TMS/department", company_departmentroutes_1.default);
app.use("/TMS/subcompany", subcompanyroutes_1.default),
    app.use("/TMS/trainee/elearning", elearning_traineeroutes_1.default);
app.use("/TMS/simulator", simulatorRoutes_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.enable('trust proxy');
app.use(express_1.default.static(__dirname));
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome To TMS" });
});
exports.default = app;
