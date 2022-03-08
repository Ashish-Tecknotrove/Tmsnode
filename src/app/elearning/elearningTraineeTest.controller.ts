import ElearningMaster from "../../model/elearning/eLearningmaster.model";
import Curriculum from "../../model/root/curriculum.model";
import CurriculumParentCategoryTest from "../../model/root/curriculum_parent_category_test.model";
import TraineeCurriculum from "../../model/root/trainee_curriculum.model";
import responseCodes from "../../strings/response-codes";
import express, { NextFunction, Request, Response } from "express";
import CurriculumBuilder from "../../model/root/curriculumbuilder.model";
import ElearningResult from "../../model/elearning/eLearningresult.model";
import { Op, Sequelize } from "sequelize";
import ElearningTrainingSession from "../../model/root/elearning_training_session.model";
import responseStrings from "../../strings/response-strings";
import Trainee from "../../model/root/trainee.model";
import ElearningTraineeScromData from "../../model/root/elearning_trainee_scrom_data.model";
import { AnyAaaaRecord } from "dns";
import sequelize from "sequelize";

//TODO THIS FILE CREATED TOTALLY FOR TRAINEE DASHBOARD API FOR ELEARNING 
class ElearningTraineeTest
{
    //TODO THIS FUNCTION USED TO LOAD THE ELEARNING DATA
    async getElearningTestData(req: Request, res: Response)
    {
        try
        {
            var trainee_id=req.body.trainee_id;

            await TraineeCurriculum.findAll({
                include:[
                    {
                        model:Curriculum,
                        include:[{
                            model:CurriculumBuilder,
                            include:[{
                                model:CurriculumParentCategoryTest,
                                required:true,
                                include:[
                                    {model:ElearningMaster,required:true},
                                    {
                                        model:ElearningResult,
                                        required:false,
                                        limit:1,
                                        order:[['id','DESC']],
                                        where:{trainee_id:req.body.trainee_id}
                                     }],
                                     where:sequelize.where(sequelize.col('TraineeCurriculum.language_id'), sequelize.col('Curriculum->CurriculumBuilders->CurriculumParentCategoryTest.language_id')),
                                    }],
                                    
                            where:{
                                [Op.or]:
                                [
                                    {attempts:{[Op.not]:'null'}},
                                    {attempts:{[Op.not]:''}},
                                    {attempts:{[Op.not]:'0'}}
                            ]}
                        }],
                        where:{
                            IsDeleted:0
                        }
                        
                    }
                ],
                where:
                {
                    IsDeleted:0,
                    IsBlock:0,
                    technology_id:1,
                    trainee_id:trainee_id

                },
                 //logging:console.log
            }).then(async (elearningData:any)=>
            {
                if(elearningData.length !=0)
                {
                    var trainee_email:any;
                    await Trainee.findOne({
                        where:{id:trainee_id}
                    }).then((data:any)=>{trainee_email=data["email"];});
                    const filePath = 
                    new URL(req.protocol + '://' + req.get('host') + "/resources/course/");

                    for(let i=0;i<elearningData.length;i++)
                    {
                        var j_array=elearningData[i]["Curriculum"]["CurriculumBuilders"];
                        for(let j=0;j<j_array.length;j++)
                        {
                            var master=j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"];
                        j_array[j]["CurriculumParentCategoryTest"]["ElearningMaster"]["dataValues"]["test_link"]
                        = filePath+master["folderName"]+'/index_lms.html'+
                        "?actor=%7B%22mbox%22%3A%22mailto%3a"+trainee_email+"%22%2C%22"+
                        "name%22%3A%22Super%22%2C%22objectType%22%3A%22Agent%22%7D&auth=Basic%20Og%3D%3D&test_id="+master['test_id']+
                        "&endpoint=http%3A%2F%2F"+ req.get('host')+"%2FTMS" +"%2Ftrainee"+"%2Felearning"+"%2FstoreElearningResult";
                        }

                    }
                    res.status(responseCodes.SUCCESS).json({ response_code: 1, 
                        message:"All Data fetched",data:elearningData })
                }
                else
                {
                    res.status(responseCodes.BAD_REQUEST).json({ response_code: 0, 
                        message:"All Data fetched",data:"Oops! no data found" })
                }
                

            }).catch(err=>
            {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })
            });

        }
        catch(err:any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })
        }
    }

    async start_training_session(req: Request, res: Response)
    {
        try
        {

            //TODO CHECK TRAINING SESSION EXIS
            await ElearningTrainingSession.findAll({
                where:{
                    trainee_id:req.body.trainee_id,
                    status:'1'
                },
                logging:console.log
                
            }).then(async (sessionData)=>
            {
                if(sessionData.length == 0)
                {
                    const TraineeData={
                        trainee_id:req.body.trainee_id,
                        session_id:'',
                        status:'1',
                        createdAt:responseStrings.currentTime
                    }
                    await ElearningTrainingSession.create({...TraineeData}).then(async(newSession)=>
                    {
                        const update={
                            session_id:'session_'+newSession['id']
                        }
                        await ElearningTrainingSession.update({...update},{where:{id:newSession['id']}}).then(completed=>
                        {
                            res.status(responseCodes.SUCCESS).json({
                                responseCodes:1,
                                sessionId:'session_'+newSession['id'],
                                message:"Can start test",
                                startTest:1
                            })

                        }).catch(err=>{

                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })

                        });

                    },err=>{
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })
                    });
                }
                else
                {
                    res.status(responseCodes.BAD_REQUEST).json({
                        responseCodes:0,
                        message:"Ooop! you have already open the test and not closed it properly. please reset the test",
                        startTest:0
                    })
                }

            }).catch(err=>{

                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })

            });

        }
        catch(err:any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })

        }
    }

    async reset_training_session(req: Request, res: Response)
    {
        try
        {
            var trainee_id=req.body.trainee_id;
            var updateData={
                status:'0'
            };
            await ElearningTrainingSession.update({...updateData},{where:{trainee_id:trainee_id}})
            .then(async(clearSession)=>
            {
                await ElearningTrainingSession.findAll({
                    order:[['id','DESC']]
                }).then(async(lastSessionData)=>
                {
                    var add=lastSessionData[0]['id'] + 1;
                    const TraineeData={
                        trainee_id:trainee_id,
                        session_id:'session_'+add,
                        status:"1",
                        createdAt:responseStrings.currentTime
                    }
                    await ElearningTrainingSession.create({...TraineeData}).then(async(newSession:any)=>
                    {
                        res.status(responseCodes.SUCCESS).json({
                            responseCodes:1,
                            sessionId:newSession['session_id'],
                            message:"Can start test",
                            startTest:1
                        })

                    },err=>{
                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })
                    });

                }).catch(err=>
                {
                    res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })

                })

            }).catch(err=>{
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })
            })
        }
        catch(err:any)
        {
             res.status(responseCodes.INTERNAL_SERVER_ERROR).json({ response_code: 0, message:"Oops! "+ err.message })
        }
    }

    async store_trainee_test_data(req: Request, res: Response)
    {
        try
        {
            var test_id=req.query.test_id;
            var scrom_data=req.body; //! response We are getting form scrom
            var question_count=10;
            
            var traineeData:any;
            var trainee_email = scrom_data['actor']['mbox'].split(":").pop();//TODO Spliting Trainee Email

            await Trainee.findOne({where:{email:trainee_email}}).then((traineeres:any)=>{traineeData=traineeres}).catch(err=>{res.status(500).json({message:err.message})});
            //! This Condition Will Execute When result is not null
            if(scrom_data['result'])
            {
                
                //!TODO CHECK USER HAS GIVEN THE RESPONSE
                if(scrom_data['object']['definition']['correctResponsesPattern'])
                {
                    var question=scrom_data['object']['definition']['name']['und'];
                    var correct_answer=scrom_data['object']['definition']['correctResponsesPattern'][0];
                    var trainee_given_answer=scrom_data['result']['response'];
                    var score=scrom_data['result']['score']['raw'];

                    // console.log(question);
                    //TODO ADD STATUS IF TRAINEE ANSWER IS CORRECT
                    var given_answer_status="";
                    if(correct_answer == trainee_given_answer)
                    {
                        given_answer_status="Correct";
                    }
                    else
                    {
                        given_answer_status="Incorrect";
                    }

                    //?? CHECK TRAIINEE SELECTED OPTION SO WE CAN GET THE SELECT ANSWER OF THE TRAINEE
                    var options_loop=scrom_data['object']['definition']['choices'];
                    var selected_answer_text="";
                    for(var i=0;i<options_loop.length;i++)
                    {
                        if(options_loop[i]["id"] == trainee_given_answer)
                        {
                            selected_answer_text=options_loop[i]['description']['und'];
                        }
                    }
                    //??END

                    var check_data_exist_elearningData=await ElearningTraineeScromData.findAll({where:{
                        test_id:test_id,
                        trainee_id:traineeData["id"],
                        question:question
                    }})

                    var new_elearning_data_inserted_id:any;
                    // TODOD If Data Already Exist Maintain Attempt Count 
                    if(check_data_exist_elearningData.length != 0)
                    {
                        var get_last_updated_data=await ElearningTraineeScromData.findAll({where:{
                            test_id:test_id,
                            trainee_id:traineeData["id"],
                            question:question
                        },order:[['id','DESC']]});

                        var increment_attempt=get_last_updated_data[0]['attempt_no'] + 1;
                        var insert_array={
                            test_id:test_id,
                            trainee_id:traineeData["id"],
                            attempt_no:increment_attempt,
                            question:question,
                            answer:selected_answer_text,
                            status:given_answer_status,
                            mark:score,
                            created_by:traineeData["id"],
                            createdAt:responseStrings.currentTime
                        };

                        await ElearningTraineeScromData.create({...insert_array}).then(createSuccess=>
                        {
                            new_elearning_data_inserted_id=createSuccess['id'];

                        }).catch(err=>
                        {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});
                        })
                    }
                    else
                    {
                        var get_trainees_current_attempt=await ElearningTraineeScromData.findAll({where:{
                            test_id:test_id,
                            trainee_id:traineeData["id"]
                        },order:[['attempt_no','DESC']]});

                        var createarray:any;

                        if(get_trainees_current_attempt.length != 0 )
                        {

                            createarray={
                                test_id:test_id,
                                trainee_id:traineeData["id"],
                                attempt_no:get_trainees_current_attempt[0]["attempt_no"],
                                question:question,
                                answer:selected_answer_text,
                                status:given_answer_status,
                                mark:score,
                                created_by:traineeData["id"],
                                createdAt:responseStrings.currentTime
                            };
                        }
                        else
                        {
                            createarray={
                                test_id:test_id,
                                trainee_id:traineeData["id"],
                                attempt_no:1,
                                question:question,
                                answer:selected_answer_text,
                                status:given_answer_status,
                                mark:score,
                                created_by:traineeData["id"],
                                createdAt:responseStrings.currentTime
                            };
                        }



                        await ElearningTraineeScromData.create({...createarray}).then(createSuccess=>
                            {
                                new_elearning_data_inserted_id=createSuccess['id'];
    
                            }).catch(err=>
                            {
                                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});
                            })

                    }

                    var get_elearning_data_row:any;
                    await ElearningTraineeScromData.findOne({where:{
                        id:new_elearning_data_inserted_id
                     }}).then((res:any)=>{get_elearning_data_row=res});

                    //! Store Data in ELearning Result
                    var check_data_exit_in_elearning_result=await ElearningResult.findAll({where:{
                       curriculum_test_id:test_id,
                       trainee_id:traineeData["id"],
                       attempt_no:get_elearning_data_row["attempt_no"]
                    },order:[['id','DESC']]});

                    //!TODO if Result is Not Null Them Update the Result
                    if(check_data_exit_in_elearning_result.length != 0)
                    {
                        question_count += question_count;
                        var newScore=check_data_exit_in_elearning_result[0]['score'] + score;

                        var update_result_array={
                            curriculum_test_id:test_id,
                            trainee_id:traineeData["id"],
                            attempt_no:get_elearning_data_row["attempt_no"],
                            total:question_count,
                            score:newScore,
                            status:'pending',
                            created_by:traineeData["id"],
                            createdAt:responseStrings.currentTime                        
                        };

                        var id=check_data_exit_in_elearning_result[0]["id"];
                        await ElearningResult.update({...update_result_array},{where:{id:id}}).then(update=>{

                            res.status(responseCodes.SUCCESS).json({response_code:0,message:"Test data and result updated successfully."});

                        }).catch(err=>
                        {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});

                        })


                    }
                    //TODO Create New Row
                    else
                    {
                        var result_array={
                            curriculum_test_id:test_id,
                            trainee_id:traineeData["id"],
                            attempt_no:get_elearning_data_row["attempt_no"],
                            total:'',
                            score:score,
                            status:'pending',
                            created_by:traineeData["id"],
                            createdAt:responseStrings.currentTime                        
                        };

                        await ElearningResult.create({...result_array}).then(done=>
                        {
                            res.status(responseCodes.SUCCESS).json({response_code:0,message:"Test data and result added successfully."});
                        }).catch(err=>
                        {
                            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"407 Oops! "+err});

                        })
                    }

                }
                 //?? This Condition Will Execute when Test Completed
                else if(scrom_data['result']['duration'])
                {               
                    var duration = scrom_data['result']['duration'];
                    var status_d = scrom_data['verb']['display']['en-US'];

                    var elearning_data=await ElearningResult.findAll({where:{
                        curriculum_test_id:test_id,
                        trainee_id:traineeData["id"]
                     },order:[['id','DESC']]});

                     var status:any;
                     if(scrom_data["result"]["success"] == true)
                     {
                         status = "passed";
                     }
                     else
                     {
                         status = "failed";
                     }

                     var update_data={
                        duration:duration,
                        status:status
                     };

                     await ElearningResult.update({...update_data},{where:{id:elearning_data[0]["id"]}}).then(final=>{

                        res.status(responseCodes.SUCCESS).json({response_code:1,message:"Final result updated successfullty."});


                     }).catch(err=>{

                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});

                     })
                }
                else
                {
                    res.status(responseCodes.SUCCESS).json({response_code:0,message:"Oops! Trainee Response not found"});

                }
            }
            else
            {
                    res.status(responseCodes.SUCCESS).json({response_code:0,message:"Oops! Trainee Response not found"});

            }   


        }
        catch(err:any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});
        }
    }

    async handle_scrom_activities_state(req: Request, res: Response)
    {
        try
        {
            res.status(responseCodes.SUCCESS).json({response_code:0,message:"Handling Scrom"});
        }
        catch(err:any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});
        }
        
    }

    async get_trainee_test_details(req: Request, res: Response)
    {
        try
        {
            var trainee_id=req.body.trainee_id;
            var test_id=req.body.test_id;

            await ElearningResult.findAll({
                where:{
                    trainee_id:trainee_id,
                    curriculum_test_id:test_id
                },
                order:[["id","DESC"]]
            }).then(async (elearningData:any)=>
            {
                if(elearningData.length != 0)
                {
                    await ElearningTraineeScromData.findAll({
                        where:{
                            trainee_id:trainee_id,
                            test_id:test_id,
                            attempt_no:elearningData[0]["attempt_no"]
                        },
                        order:[["id","ASC"]]
                    }).then(finalData=>
                    {
                        var final_Data={
                            attempt_no:elearningData[0]["attempt_no"],
                            score:elearningData[0]["attempt_no"],
                            status:elearningData[0]["status"],
                            duration:elearningData[0]["duration"],
                            cratedAt:elearningData[0]["createdAt"],
                            detailInfo:finalData
                        }
                        res.status(responseCodes.SUCCESS).json({response_code:1,message:"Details data fetched successfully.",data:final_Data});


                    }).catch(err=>{

                        res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops!" + err});

                    });
                }
                else
                {
                    res.status(responseCodes.BAD_REQUEST).json({response_code:0,message:"Oops! no result data found"});

                }
            }).catch(err=>
            {
                res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});

            })

        }
        catch(err:any)
        {
            res.status(responseCodes.INTERNAL_SERVER_ERROR).json({response_code:0,message:"Oops! "+err});
        }
    }


}


export default new ElearningTraineeTest();