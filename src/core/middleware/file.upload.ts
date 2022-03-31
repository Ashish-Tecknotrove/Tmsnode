import {Request, Response} from "express";
import multer = require("multer");
import {NextFunction} from "express";

class FileUpload {

    async image_upload(req: Request, res: Response, next: NextFunction) {
        console.log("Uploding function starts....");
        //

        const storage = multer.diskStorage({
            destination: await function (req: any, file: any, cb: any) {
                cb(null, 'resources/company_logo')
            },
            filename: function (req: any, file: any, cb: any) {
                cb(null, file.originalname)
                console.log(file.originalname)
            }
        });
        //
        const fileFilter = await function (req: any, file: any, cb: any) {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") 
            {

                cb(null, true);

            } else {
                cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
            }
        };

        const upload = multer({storage: storage, fileFilter: fileFilter});

        upload.array('images', 5);

    }


}


export default new FileUpload();