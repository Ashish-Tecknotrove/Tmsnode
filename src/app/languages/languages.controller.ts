import { where } from 'sequelize/types';
import { body } from 'express-validator';
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import Languages from "../../model/language/language.model";
import responseCodes from "../../strings/response-codes";
import Applabels from "../../model/language/app.label";
import responseStrings from '../../strings/response-strings';
import ApplabelValue from '../../model/language/app.label.value';


class LanguageController {
    async create(req: Request, res: Response) {
        const id = uuidv4();

        try {
            const record = await Languages.create({ ...req.body });
            return res.json({ msg: "Successfully Created Language" });

        } catch (e:any) {
            return res.json({ msg: e.message });
        }
    }

    //* App Label
    async createAppLabel(req: Request, res: Response) {
        try {
            await Applabels.findAll({
                where: {
                    name: req.body.name,
                    IsDeleted: 0
                }
            }).then(async (result_) => {
                if (result_.length == 0) {

                    req.body.updated_by = "";

                    await Applabels.create({ ...req.body })
                        .then((result) => {
                            return res
                                .status(responseCodes.SUCCESS)
                                .json({ response_code: 1, message: responseStrings.ADD, data: result });
                        }).catch((err_: any) => {
                            return res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                } else {
                    return res
                        .status(responseCodes.CREATED)
                        .json({ response_code: 0, message: responseStrings.EXISTS });
                }
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }

    async getAppLabel(req: Request, res: Response) {
        try {
            let whereObj = {};

            if (req.body.appLabelId) {
                whereObj = {
                    id: req.body.appLabelId,
                    IsDeleted: 0
                }
            } else {
                whereObj = {
                    IsDeleted: 0
                }
            }


            await Applabels.findAll({
                // include: [{
                //     model: ApplabelValue,
                //     where: {
                //         IsDeleted: 0
                //     },
                //     required: false
                // }],
                where: whereObj
            }).then(async (result) => {
                return res.status(responseCodes.SUCCESS)
                    .json({ response_code: 1, message: responseStrings.GET, data: result });
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }

    async updateAppLabel(req: Request, res: Response) {
        try {
            await Applabels.findAll({
                where: {
                    id: req.body.appLabelId,
                    IsDeleted: 0
                }
            }).then(async (result_) => {
                if (result_.length != 0) {

                    let updateObj = {
                        name: req.body.name,
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await Applabels.update(updateObj, {
                        where: {
                            id: req.body.appLabelId
                        }
                    })
                        .then((result) => {
                            return res
                                .status(responseCodes.SUCCESS)
                                .json({ response_code: 0, message: responseStrings.UPDATED });
                        }).catch((err_: any) => {
                            return res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                } else {
                    return res
                        .status(responseCodes.BAD_REQUEST)
                        .json({ response_code: 0, message: responseStrings.NOT });
                }
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }

    async deleteAppLabel(req: Request, res: Response) {
        try {
            await Applabels.findAll({
                where: {
                    id: req.body.appLabelId,
                    IsDeleted: 0
                }
            }).then(async (result_) => {
                if (result_.length != 0) {

                    let updateObj = {
                        IsDeleted: 1,
                        deleted_by: req.body.deleted_by,
                        deletedAt: responseStrings.currentTime
                    }

                    await Applabels.update(updateObj, {
                        where: {
                            id: req.body.appLabelId
                        }
                    })
                        .then((result) => {
                            return res
                                .status(responseCodes.SUCCESS)
                                .json({ response_code: 0, message: responseStrings.DELETE, data: result });
                        }).catch((err_: any) => {
                            return res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                } else {
                    return res
                        .status(responseCodes.BAD_REQUEST)
                        .json({ response_code: 0, message: responseStrings.NOT });
                }
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }
    //* End App Label

    //* App Labels Value
    async createAppLabelValue(req: Request, res: Response) {
        try {
            await ApplabelValue.findAll({
                where: {
                    name: req.body.name,
                    f_languageid: req.body.f_languageid,
                    f_labelid: req.body.f_labelid,
                    IsDeleted: 0
                }
            }).then(async (result_) => {
                if (result_.length == 0) {

                    req.body.updated_by = "";

                    await ApplabelValue.create({ ...req.body })
                        .then((result) => {
                            return res
                                .status(responseCodes.SUCCESS)
                                .json({ response_code: 0, message: responseStrings.ADD, data: result });
                        }).catch((err_: any) => {
                            return res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                } else {
                    return res
                        .status(responseCodes.CREATED)
                        .json({ response_code: 0, message: responseStrings.EXISTS });
                }
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }

    async getAppLabelValue(req: Request, res: Response) {
        try {
            await ApplabelValue.findAll({
                include: [{
                    model: Applabels,
                    attributes: ['id', 'name'],
                    where: {
                        IsDeleted: 0
                    },
                    required: false
                }],
                where: {
                    // f_labelid: req.body.f_labelid,
                    IsDeleted: 0
                },
                // logging:console.log
            }).then(async (result) => {
                return res.status(responseCodes.SUCCESS)
                    .json({ response_code: 0, message: responseStrings.GET, data: result });
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }

    async updateAppLabelValue(req: Request, res: Response) {
        try {
            await ApplabelValue.findAll({
                where: {
                    id: req.body.applabelvalueid,
                    IsDeleted: 0
                }
            }).then(async (result_) => {
                if (result_.length != 0) {

                    let updateObj = {
                        name: req.body.name,
                        updated_by: req.body.updated_by,
                        updatedAt: responseStrings.currentTime
                    }

                    await ApplabelValue.update(updateObj, {
                        where: {
                            id: req.body.applabelvalueid
                        }
                    })
                        .then((result) => {
                            return res
                                .status(responseCodes.SUCCESS)
                                .json({ response_code: 0, message: responseStrings.UPDATED });
                        }).catch((err_: any) => {
                            return res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                } else {
                    return res
                        .status(responseCodes.BAD_REQUEST)
                        .json({ response_code: 0, message: responseStrings.NOT });
                }
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }

    async deleteAppLabelValue(req: Request, res: Response) {
        try {
            await ApplabelValue.findAll({
                where: {
                    id: req.body.applabelvalueid,
                    IsDeleted: 0
                }
            }).then(async (result_) => {
                if (result_.length != 0) {

                    let updateObj = {
                        IsDeleted: 1,
                        deleted_by: req.body.deleted_by,
                        deletedAt: responseStrings.currentTime
                    }

                    await ApplabelValue.update(updateObj, {
                        where: {
                            id: req.body.applabelvalueid
                        }
                    })
                        .then((result) => {
                            return res
                                .status(responseCodes.SUCCESS)
                                .json({ response_code: 0, message: responseStrings.DELETE });
                        }).catch((err_: any) => {
                            return res
                                .status(responseCodes.INTERNAL_SERVER_ERROR)
                                .json({ response_code: 0, message: err_.message });
                        });
                } else {
                    return res
                        .status(responseCodes.BAD_REQUEST)
                        .json({ response_code: 0, message: responseStrings.NOT });
                }
            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });

        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }
    //* End App Labels Value

    async getMappingswithLanguage(req: Request, res: Response) {

        try {
            var language_id=req.body.language_id;
            let applabels = await Applabels.findAll({
                include: [{
                    model: ApplabelValue,
                    attributes: ['name', 'f_languageid'],
                    where: {
                        f_languageid:language_id,
                        IsDeleted: 0
                    },
                    required: false
                }],
                where: {
                    IsDeleted: 0
                },
                attributes: ['name'],
            });

            await Languages.findAll({
                where: {
                    id:language_id,
                    IsDeleted: 0
                },
                attributes: ['id', 'name']
            }).then((result) => {
                const initialValue = {};

                let labelData = result.reduce((obj: any, item: { [x: string]: any; }) => {
                    //console.log(item['id']);

                    let applabelsobj = applabels.filter(function (currentElement:any) {
                        if(currentElement.ApplabelValue){
                            return currentElement.ApplabelValue.f_languageid == item['id'] || currentElement.ApplabelValue==null;
                        }else{
                            return "";
                        }
                      });

                    const initialValue2 = {};

                    const applabelsObjStruc = applabelsobj.reduce((obj2: any, item2: { [x1: string]: any; }) => {

                            return {
                                ...obj2,
                                [item2['name']]: (item2.ApplabelValue) ? item2.ApplabelValue.name : "",
                            };
                        
                    }, initialValue2);

                    return {
                        ...obj,
                        ["language"]: applabelsObjStruc,
                    };
                }, initialValue);


                return res.status(responseCodes.SUCCESS)
                    .json({ response_code: 0, message: responseStrings.GET, data: labelData });

            }).catch((err: any) => {
                return res
                    .status(responseCodes.INTERNAL_SERVER_ERROR)
                    .json({ response_code: 0, message: err.message });
            });



        } catch (err: any) {
            return res
                .status(responseCodes.INTERNAL_SERVER_ERROR)
                .json({ response_code: 0, message: err.message });
        }
    }



}

export default new LanguageController();