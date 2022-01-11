import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";


interface CurriculumAttributes{
    id:number;
    company_id:number;
    name:string;
    created_by:number;
    updated_by:number;

}


export default class Curriculum extends Model<CurriculumAttributes> implements CurriculumAttributes
{
    id!: number;
    company_id!: number;
    name!: string;
    created_by!: number;
    updated_by!: number;


}


Curriculum.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    company_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:"id"
        }
    },
    name:{
        type:DataTypes.INTEGER,
    },
    created_by:{
        type:DataTypes.INTEGER
    },
    updated_by:{
        type:DataTypes.INTEGER
    }

},{
    sequelize:sequelizeconnection,
    tableName:'curriculum'
})


Curriculum.belongsTo(Company,{
    foreignKey:"company_id"
})