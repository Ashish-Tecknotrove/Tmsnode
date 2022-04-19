import { DataType } from 'sequelize-typescript';
import { Model } from "sequelize";
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
    deleted_by: string
    deletedAt: string
    createdAt: string
    updatedAt: string
    IsDeleted: number
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
    deleted_by!: string
    deletedAt!: string
    createdAt!: string
    updatedAt!: string
    IsDeleted!: number

}


Subscription.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    curriculum_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Curriculum,
            key: "id"
        }
    },
    company_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    technology_type: {
        type: DataType.INTEGER,
    },
    course: {
        type: DataType.STRING(50),

    },
    day_no: {
        type: DataType.STRING(50),
        allowNull: false
    },
    calender_type: {
        type: DataType.STRING(50),
        allowNull: false
    },
    licence_no: {
        type: DataType.STRING(100),
        allowNull: false
    },
    licenceType: {
        type: DataType.STRING(100),
        defaultValue:"0"                    //0 is Limited and 1 is unlimited
    },
    payment_type: {
        type: DataType.STRING(100),
        allowNull: false
    },
    activation_date: {
        type: DataType.STRING(100),
        allowNull: false
    },
    expiry_date: {
        type: DataType.STRING(100),
    },
    payment_note: {
        type: DataType.STRING(50),
    },
    status: {
        type: DataType.ENUM('0', '1'),
        defaultValue: "1",
    },
    note: {
        type: DataType.STRING(50),
    },
    created_by: {
        type: DataType.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataType.INTEGER
    },
    deleted_by: {
        type: DataType.INTEGER
    },
    createdAt: {
        type: DataType.STRING(100)
    },
    updatedAt: {
        type: DataType.STRING(100)
    },
    deletedAt: {
        type: DataType.STRING(100)
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: 'subscriptions'
});


// // //TODO Association With Company
Subscription.belongsTo(Curriculum, {
    foreignKey: 'curriculum_id',
    targetKey: "id"
});

// Subscription.hasMany(Curriculum,{
//     foreignKey:'curriculum_id',
// })