import { DataTypes, Model } from "sequelize";
import sequelizeconnection from "../../database/sequelize";

interface TechnologyCategoryAttributes{
    id:number;
    name:string;
    description:number;
    created_by:number;
    updated_by:number;
}



export default class TechnologyCategory extends Model<TechnologyCategoryAttributes> implements TechnologyCategoryAttributes{
    id!: number;
    name!: string;
    description!: number;
    created_by!: number;
    updated_by!: number;

}


TechnologyCategory.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    created_by:{
        type:DataTypes.INTEGER
    },
    updated_by:{
        type:DataTypes.INTEGER
    }
},{
    sequelize:sequelizeconnection,
    tableName:'technology_type'
});
