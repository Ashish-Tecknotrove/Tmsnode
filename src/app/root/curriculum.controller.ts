import CurriculumParentCategory from "../../model/root/curriculum_parent_category.model";
import { Request, Response } from "express";
import TechnologyCategory from "../../model/root/technology.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";


class CurriculumController {

    async create_curriculum_parent_category() {

    }


    async add_curriculum_parent_test() {

    }

    async getTechnology(req: Request, res: Response)
    {
        try {
            const getTechnology = await TechnologyCategory.findAll();

            if (getTechnology != null) {
                return res.status(200).json({
                    response_code: 1,
                    message: "Fetching Technology List...",
                    data: getTechnology
                });

            }
            else {
                return res.status(500).json({ response_code: 0, message: "No Technology Found...",data:"" })
            }
        }
        catch (e) {
            return res.status(200).json({
                response_code: 1,
                message: e,
                data: ''
            })
        }
    }

    async getCurriculumParent(req: Request, res: Response) {
        try {

            const technology_id=req.body.technology_id;

            const getCurriculum = await CurriculumParentCategory.findAll({
                where:{
                    technology_type_id:technology_id
                }
            });

            if (getCurriculum != null) {
                return res.status(200).json({
                    response_code: 1,
                    message: "Fetching Curriculum List...",
                    data: getCurriculum
                });

            }
            else {
                return res.status(500).json({ response_code: 0, message: "No Curriculum Parent Category Found...",data:"" })
            }
        }
        catch (e) {
            return res.status(200).json({
                response_code: 1,
                message: e,
                data: ''
            })
        }

    }

    async getCurriculumParentTest(req: Request, res: Response)
    {
        try {

            const parent_id=req.body.parent_id;

            const getTest = await CurriculumParentCategoryTest.findAll({
                where:{
                    parent_id:parent_id
                }
            });

            if (getTest != null) {
                return res.status(200).json({
                    response_code: 1,
                    message: "Fetching List...",
                    data: getTest
                });

            }
            else {
                return res.status(500).json({ response_code: 0, message: "No  Parent Category Found...",data:"" })
            }
        }
        catch (e) {
            return res.status(200).json({
                response_code: 1,
                message: e,
                data: ''
            })
        }
    }

    async buildCurriculum(req:Request,res:Response)
    {
        
    }


}

export default new CurriculumController();