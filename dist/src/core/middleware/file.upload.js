"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
class FileUpload {
    image_upload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("Uploding function starts....");
            //
            const storage = multer.diskStorage({
                destination: yield function (req, file, cb) {
                    cb(null, 'resources/company_logo');
                },
                filename: function (req, file, cb) {
                    cb(null, file.originalname);
                    console.log(file.originalname);
                }
            });
            //
            const fileFilter = yield function (req, file, cb) {
                if (file.mimetype === "image/jpg" ||
                    file.mimetype === "image/jpeg" ||
                    file.mimetype === "image/png") {
                    cb(null, true);
                }
                else {
                    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
                }
            };
            const upload = multer({ storage: storage, fileFilter: fileFilter });
            upload.array('images', 5);
        });
    }
}
exports.default = new FileUpload();
