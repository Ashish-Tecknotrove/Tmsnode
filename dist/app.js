"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import bodyParser from "body-parser";
//
// import root_route from "./src/routes/root/root_routes" ;
// import curriculumroutes from "./src/routes/root/curriculumroutes";
// import Languages from "./src/model/language/language.model";
// import LanguageRoutes from "./src/routes/language/language.routes";
// var multer = require('multer');
// var cors = require('cors')
// var upload = multer();
const app = (0, express_1.default)();
// const form = multer();
// dotenv.config();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(cors())
// app.use(upload.array());
app.use(express_1.default.static('public'));
app.listen(process.env.PORT || 8000, () => {
    console.log("Node Server Started Running");
});
// app.use("/TMS",root_route);
// app.use("/TMS",curriculumroutes);
// // app.use("/api/v1/",LanguageRoutes)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome To TMS" });
});
