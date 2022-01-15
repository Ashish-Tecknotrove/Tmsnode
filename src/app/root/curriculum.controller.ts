import CurriculumParentCategory from "../../model/root/curriculum_parent_category.model";
import { Request, Response } from "express";
import TechnologyCategory from "../../model/root/technology.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import CurriculumBuilder from "../../model/root/curriculumbuilder.model";
import Curriculum from "../../model/root/curriculum.model";


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
                include:[{
                    model:CurriculumParentCategoryTest
                }],
                where:{
                    technology_type_id:technology_id
                },

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

        //Create Curriculum
        const curriculum={
            company_id:req.body.company_id,
            name:req.body.name,
            created_by:req.body.created_by,
            updated_by:req.body.updated_by,
        };

        //Check Curriculum Already Exist
        var check_curriculum_exist=await Curriculum.findOne({
            where:{
                name:req.body.name
            }
        });

        if(check_curriculum_exist == null)
        {
            //Parse JSON String into JSON Object
            var curriculumBody=req.body.curriculum;
            var curriculumBodyData=JSON.parse(curriculumBody);
            //Parse JSON String into JSON Object

            //Step 1 Create Curriculum Data
            await Curriculum.create({...curriculum}).then(function (data)
            {
                //Get Curriculum Id
                var curriculum_id=data['id'];

                //Add This id and Created Curriculum Builder with parent id
                for(var i=0;i < curriculumBodyData.length;i++)
                {
                    var curriculum_data={
                        curriculum_id:curriculum_id,
                        curriculum_parent_category_id:curriculumBodyData[i]["cp_id"],
                        curriculum_parent_category_test_id:curriculumBodyData[i]["cptest_id"],
                        created_by:curriculumBodyData[i]["created_by"],
                        updated_by:curriculumBodyData[i]["updated_by"]
                    }

                    CurriculumBuilder.create({...curriculum_data}).then(function ()
                    {

                    }).catch(function (err){
                        console.log(err);
                    })
                }

                res.status(200).json({response_code:1,curriculum_id:data['id'],message:"Curriculum Created Successfully..."})

            }).catch(function (err){
                res.status(500).json({response_code:0,message:err});
            });
        }
        else
        {
            res.status(500).json({response_code:0,message:"Curriculum Already Exist"});
        }





    }


}

export default new CurriculumController();