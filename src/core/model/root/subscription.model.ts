import {DataTypes, Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import Curriculum from "./curriculum.model";


interface SubscriptionAttributes {
    id: number;
    curriculum_id: string;
    company_id: number;
    technology_type: number
    course: string;
    day_no: number
    calender_type: string;
    licence_no: string;
    licenceType: string
    payment_type: string;
    activation_date: string;
    expiry_date: string;
    payment_note: string;
    status: string;
    note: string;
    created_by: number
    updated_by: number
	deleted_by:string
	deletedAt:string
    createdAt: string
    updatedAt: string
	IsDeleted:number
}


export default class Subscription extends Model {
    declare id: number;
    curriculum_id!: string;
    company_id!: number;
    technology_type!: number;
    course!: string;
    day_no!: number;
    calender_type!: string;
    licence_no!: string;
    licenceType!: string;
    payment_type!: string;
    activation_date!: string;
    expiry_date!: string;
    payment_note!: string;
    status!: string;
    note!: string;
    created_by!: number
    updated_by!: number
	deleted_by!:string
    deletedAt!:string
    createdAt!:string
    updatedAt!:string
	IsDeleted!:number

}


Subscription.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    curriculum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Curriculum,
            key: "id"
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    technology_type: {
        type: DataTypes.INTEGER,
    },
    course: {
        type: DataTypes.STRING(50),

    },
    day_no: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    calender_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    licence_no: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    licenceType: {
        type: DataTypes.STRING(100),
    },
    payment_type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    activation_date: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    expiry_date: {
        type: DataTypes.STRING(100),
    },
    payment_note: {
        type: DataTypes.STRING(50),
    },
    status: {
        type: DataTypes.ENUM('0', '1'),
        defaultValue: "1",
    },
    note: {
        type: DataTypes.STRING(50),
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted_by: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: "TIMESTAMP",
    },
    updatedAt: {
        type: "TIMESTAMP",
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
}, {
    sequelize: sequelizeconnection,
    tableName: 'subscriptions'
});


// // //TODO Association With Company
Subscription.belongsTo(Curriculum, {
    foreignKey: 'curriculum_id',
    targetKey:"id"
});

// Subscription.hasMany(Curriculum,{
//     foreignKey:'curriculum_id',
// })