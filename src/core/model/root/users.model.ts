import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";


import sequelizeConnection from "../../database/sequelize";
import Languages from "../language/language.model";
import Company from "./company.model";
import CompanyUser from "./compayuser.model";
import Trainee from "./trainee.model";
import UserType from "./usertype.model";


interface UsersAttributes {
    id: number;
    company_id: number;
    name: string;
    email: string;
    aadhar_no: string;
    mobile_no: number;
    department: string;
    email_verified_at: string;
    is_admin: number;
    password: string;
    password_wordpress: string;
    created_at: string;
    updated_at: string;
    user_type: string;
    product_purchased: string;
    activation_date: string;
    deactivation_date: string;
    language: number;
    portal_language: number;
    is_user_active: number;
    disable_user: number;
    trainee_license_limit: number;
    sequence_test: number;
    created_by: number
    updated_by: number
    deleted_by: string
    deletedAt: string
    createdAt: string
    updatedAt: string
    IsDeleted: number
}

export default class Users extends Model {
    declare id: number;
    company_id!: number;
    name!: string;
    email!: string;
    aadhar_no!: string;
    mobile_no!: number;
    department!: string;
    email_verified_at!: string;
    is_admin!: number;
    password!: string;
    password_wordpress!: string;
    created_at!: string;
    updated_at!: string;
    user_type!: string;
    product_purchased!: string;
    activation_date!: string;
    deactivation_date!: string;
    language!: number;
    portal_language!: number;
    is_user_active!: number;
    disable_user!: number;
    trainee_license_limit!: number;
    sequence_test!: number;
    created_by!: number
    updated_by!: number
    deleted_by!: string
    deletedAt!: string
    createdAt!: string
    updatedAt!: string
    IsDeleted!: number
    IsBlock!: number
}


Users.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    aadhar_no: {
        type: DataType.STRING
    },
    mobile_no: {
        type: DataType.STRING
    },
    email_verified_at: {
        type: DataType.STRING
    },
    is_admin: {
        type: DataType.TINYINT,
        defaultValue: '0'
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    password_wordpress: {
        type: DataType.STRING
    },
    user_type: {
        type: DataType.INTEGER,
        allowNull: true,
        references: {
            model: UserType,
            key: 'id'
        }
    },
    activation_date: {
        type: DataType.DATE
    },
    deactivation_date: {
        type: DataType.DATE
    },
    language: {
        type: DataType.INTEGER,
        references: {
            model: Languages,
            key: 'id'
        },
        allowNull: false
    },
    portal_language: {
        type: DataType.TINYINT,
        defaultValue: 1,
        references: {
            model: Languages,
            key: 'id'
        },
    },
    created_by: {
        type: DataType.INTEGER
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
    },
    IsBlock: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps:false,
    sequelize: sequelizeConnection,
    tableName: 'users'
});


//TODO Association with Language
Users.belongsTo(Languages, {
    foreignKey: "language",
    as: "TraineeLanguage"
});

Users.belongsTo(Languages, {
    foreignKey: "language",
    as: ""
});

Users.belongsTo(Languages, {
    foreignKey: "portal_language",
    as: "portalLanguage"
});

Users.belongsTo(Company, {
    foreignKey: "company_id",
    targetKey: "id",
});

CompanyUser.belongsTo(Users, {
    foreignKey: "login_table_id",
    targetKey: "id"
});

