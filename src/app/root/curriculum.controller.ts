import CurriculumParentCategory from "../../model/root/curriculum_parent_category.model";
import { Request, Response } from "express";
import TechnologyCategory from "../../model/root/technology.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import CurriculumBuilder from "../../model/root/curriculumbuilder.model";
import Curriculum from "../../model/root/curriculum.model";
import Company from "../../model/root/company.model";
import { Op } from "sequelize";
import { parse } from "path/posix";
import sequelize from "sequelize";
import responseCodes from "../../strings/response-codes";
import Languages from "../../model/language/language.model";
import moment from "moment";


class CurriculumController {


    async create_curriculum_parent_category(req: Request, res: Response) {
        try {
            await CurriculumParentCategory.create({ ...req.body }).then(function (data) {
                res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Create Curriculum Parent Category Successfully." ,data:data});

            }).catch(function (err) {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            });
        }
        catch (error) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error });
        }
    }


    async create_curriculum_parent_category_test(req: Request, res: Response) {
        try {
            await CurriculumParentCategoryTest.create({ ...req.body }).then(function (data) {
                res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Create Curriculum Parent Category Test Successfully." ,data:data});

            }).catch(function (err) {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
            });
        }
        catch (error) {
            return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: error });
        }
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

    async getCompanyCurriculum(req: Request, res: Response)
    {
        try
        {
            const company_id=req.body.company_id;

            await Curriculum.findAll({
                where:{
                    company_id:company_id
                }
            }).then(data=>{

                res.status(200).json({response_code:0,message:'Curriculum Fetched',data:data});
    
            }).catch(err=>{

                res.status(500).json({response_code:0,message:err});
            });
        }
        catch(err)
        {
            res.status(500).json({response_code:1,message:err});
        }
    }


    async getCurriculumParent(req: Request, res: Response) {
        try {

            const technology_id=req.body.technology_id;

            const getCurriculum = await CurriculumParentCategory.findAll({
                where:{
                    technology_type_id:{
                        [Op.in]:[sequelize.literal(`${technology_id}`)]
                    }
                },
                // logging: console.log

            });

            if (getCurriculum != null) {
                return res.status(200).json({
                    response_code: 1,
                    message: "Fetching Curriculum Parent Category List...",
                    data: getCurriculum
                });

            }
            else {
                return res.status(500).json({ response_code: 0, message: "No Curriculum Parent Category Found...",data:"" })
            }
        }
        catch (e) {
            return res.status(200).json({
                response_code: 0,
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
                 include:[
                    {
                         model:Languages, 
                         attributes : {
                             exclude:['id','description', 'created_by','isDeleted','createdAt','updatedAt'],
                        },
                    }],
                where:{
                    parent_id:parent_id,
                    IsDeleted:0
                }
            });

            if (getTest != null) {
                return res.status(200).json({
                    response_code: 1,
                    message: "Fetching Curriculum Test List...",
                    data: getTest
                });

            }
            else {
                return res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "No  Parent Category Found...",data:"" })
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

    async deleteCurriculumParentCategoryTest(req:Request,res:Response){

        try {

            const test_id=req.body.test_id;

            let check_company_is_valid=await CurriculumParentCategoryTest.findOne({
                where:{
                    id:test_id,
                    IsDeleted:0
                },
                // logging:console.log
            }).catch(err=>{
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:err});
            });

            const updateData={
                IsDeleted:1,
                deletedAt:moment().format('YYYY-MM-DD HH:mm:ss')
            }

            // console.log("check_company_is_valid->",check_company_is_valid);

            if(check_company_is_valid != null){
                await CurriculumParentCategoryTest.update(updateData,{where:{id:test_id}}).then(function (data) 
                {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Curriculam Parent Category Test Delete successfully"});
    
                }).catch(function (err) {
    
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            }else{
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: "Curriculam Parent Category Test not found!"});
            }

        }catch(e){
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:1,message:e});
        }



    }

    async updateCurriculumParentCategoryTest(req:Request,res:Response){

        try {

            const test_id=req.body.test_id;

            let check_company_is_valid=await CurriculumParentCategoryTest.findOne({
                where:{
                    id:test_id,
                    IsDeleted:0
                },
                // logging:console.log
            }).catch(err=>{
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:err});
            });

            const updateData={
                prefix:req.body.prefix,
                title:req.body.title
            }

            if(check_company_is_valid != null){
                await CurriculumParentCategoryTest.update(updateData,{where:{id:test_id}}).then(function (data) 
                {
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, message: "Curriculam Parent Category Test Update successfully"});
    
                }).catch(function (err) {
    
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message: err });
                });
            }

        }catch(e){
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:1,message:e});
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
                name:req.body.name,
                IsDeleted:0
            },
            logging: console.log
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