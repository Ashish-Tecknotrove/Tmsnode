import { DataType } from "sequelize-typescript"
import { Model } from "sequelize";
import sequelizeconnection from "../../../../database/sequelize";
import Company from "../../../root/company.model";
import Trainee from "../../../root/trainee.model";
import Trainer from "../../../root/trainer.model";



export default class ClinicalPerformance extends Model
{
    Id!:number;
    company_id!:number;
    trainer_id!:string;
    trainee_enrollmentId!:string;
    LanguageCT!:string;
    VehicleTypeCT!:string;
    VehicleTypeCTOtherLang	!:string;
    TransmissionCT!:string;
    TransmissionCTOtherLang!:string;
    ModuleCT!:string;
    ModuleCTOtherLang!:string;
    ReactionTimeCT!:string;
    DateTimeCT!:string;
    OccurenceCT!:number;
    PrePostCT!:string;
    FaultsCT!:string;
    TotalScoreCT!:number;
    ResultCT!:string;
    ResultCTOtherLang!:string;
    RemarksCT!:string;
    RemarksCTOtherLang!:string;
    SessionStatusCT!:string;
    SessionStatusCTOtherLang!:string;
    CurriculumNameCT!:string;
    CurriculumNameCTOtherLang!:string;
    CurriculumStartDateCT!:string;
    CBOccurenceCT!:number;
    NotesCT!:string;
    ScenarioType!:string;
    Sync!:string;
    created_by!:string;
    createdAt!:string;
    IsDeleted!:string;
}

ClinicalPerformance.init({
    Id: {
        type: DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    company_id : {
        type:DataType.INTEGER,
        references:{
            model:Company,
            key:"id"
        }
    },
    trainer_id : {
        type:DataType.INTEGER,
        references:{
            model:Trainer,
            key:"id"
        }
    },
    trainee_enrollmentId:{
        type:DataType.INTEGER,
        references:{
            model:Trainee,
            key:"enrollmentId"
        }
    },
    LanguageCT:{
        type:DataType.STRING
    },
    VehicleTypeCT:{
        type:DataType.STRING
    },
    VehicleTypeCTOtherLang:{
        type:DataType.STRING
    },
    TransmissionCT:{
        type:DataType.STRING
    },
    TransmissionCTOtherLang:{
        type:DataType.STRING
    },
    ModuleCT:{
        type:DataType.STRING
    },
    ModuleCTOtherLang:{
        type:DataType.STRING
    },
    ReactionTimeCT:{
        type:DataType.STRING
    },
    DateTimeCT:{
        type:DataType.STRING
    },
    OccurenceCT:{
        type:DataType.STRING
    },
    PrePostCT:{
        type:DataType.STRING
    },
    FaultsCT:{
        type:DataType.STRING
    },
    TotalScoreCT:{
        type:DataType.STRING
    },
    ResultCT:{
        type:DataType.STRING
    },
    ResultCTOtherLang:{
        type:DataType.STRING
    },
    RemarksCT:{
        type:DataType.STRING
    },
    RemarksCTOtherLang:{
        type:DataType.STRING
    },
    SessionStatusCT:{
        type:DataType.STRING
    },
    SessionStatusCTOtherLang:{
        type:DataType.STRING
    },
    CurriculumNameCT:{
        type:DataType.STRING
    },
    CurriculumNameCTOtherLang:{
        type:DataType.STRING
    },
    CurriculumStartDateCT:{
        type:DataType.STRING
    },
    CBOccurenceCT:{
        type:DataType.STRING
    },
    NotesCT:{
        type:DataType.STRING
    },
    ScenarioType:{
        type:DataType.STRING
    },
    Sync:{
        type:DataType.TINYINT,
        defaultValue:1
    },
    created_by:{
        type:DataType.STRING
    },
    createdAt:{
        type:DataType.STRING
    },
    IsDeleted:{
        type:DataType.TINYINT,
        defaultValue:0
    },
    
},{
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: 'clinicaltestperformance'
})

ClinicalPerformance.belongsTo(Trainer,{
    foreignKey:'trainer_id'
})