"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const authentication_routes_1 = __importDefault(require("./src/auth/authentication.routes"));
const superadmin_routes_1 = __importDefault(require("./src/app/superadmin/routes/root/superadmin.routes"));
const superadmin_elearningcontent_routes_1 = __importDefault(require("./src/app/superadmin/routes/elearning/superadmin.elearningcontent.routes"));
const trainee_elearning_routes_1 = __importDefault(require("./src/app/trainee/routes/elearning/trainee.elearning.routes"));
const trainee_root_routes_1 = __importDefault(require("./src/app/trainee/routes/root/trainee.root.routes"));
const additionalresources_routes_1 = __importDefault(require("./src/resources/additionalresources.routes"));
const company_admin_routes_1 = __importDefault(require("./src/app/companyadmin/routes/root/company_admin.routes"));
const trainer_routes_1 = __importDefault(require("./src/app/trainer/routes/root/trainer.routes"));
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
//controller.use(bodyParser());
app.use(body_parser_1.default.json()); // For Accepting the JSON Data
app.use(body_parser_1.default.urlencoded()); // For Accepting the x-www-form-Data
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors());
//controller.use(formdata.array());
app.use('/resources', express_1.default.static('resources'));
app.listen(process.env.PORT || 8000, () => {
    console.log("Node Server Started Running");
});
app.disable('x-powered-by');
//TODO ROUTES
app.use("/TMS/auth", authentication_routes_1.default);
app.use("/TMS/resources", additionalresources_routes_1.default);
//TODO SUPER ADMIN ROUTES
app.use("/TMS/superadmin", superadmin_routes_1.default);
app.use("/TMS/superadmin/elearning", superadmin_elearningcontent_routes_1.default);
//TODO SUPER ADMIN ROUTES ENDS
//TODO TRAINEE ROUTES
app.use("/TMS/trainee", trainee_root_routes_1.default);
app.use("/TMS/trainee/elearning", trainee_elearning_routes_1.default);
//TODO TRAINEE ROUTES --END
//TODO COMPANY ADMIN ROUTES
app.use("/TMS/companyadmin", company_admin_routes_1.default);
//TODO COMPANY ADMIN ROUTES --END
//TODO TRAINER ROUTES
app.use("/TMS/trainer", trainer_routes_1.default);
//TODO TRAINER ROUTES --END
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(__dirname));
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome To TMS" });
});
exports.default = app;
