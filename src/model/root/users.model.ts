import {DataTypes, Model} from "sequelize";
import {DataType} from "sequelize-typescript";


import sequelizeConnection from "../../database/sequelize";
import Languages from "../language/language.model";
import Company from "./company.model";
import CompanyContact from "./companycontacts.model";
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
    created_by: number;
    updated_by: number;
    deletedAt: string;
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
    created_by!: number;
    updated_by!: number;
    deletedAt!: string;
}


Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aadhar_no: {
        type: DataTypes.STRING
    },
    mobile_no: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.INTEGER
    },
    email_verified_at: {
        type: DataTypes.STRING
    },
    is_admin: {
        type: DataTypes.TINYINT,
        defaultValue: '0'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_wordpress: {
        type: DataTypes.STRING
    },
    user_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: UserType,
            key: 'id'
        }
    },
    product_purchased: {
        type: DataTypes.STRING
    },
    activation_date: {
        type: DataTypes.DATE
    },
    deactivation_date: {
        type: DataTypes.DATE
    },
    language: {
        type: DataTypes.INTEGER,
        references: {
            model: Languages,
            key: 'id'
        },
        allowNull: false
    },
    portal_language: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    },
    is_user_active: {
        type: DataTypes.TINYINT
    },
    disable_user: {
        type: DataTypes.TINYINT
    },
    trainee_license_limit: {
        type: DataTypes.STRING
    },
    sequence_test: {
        type: DataTypes.STRING
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    updatedAt: {
        type: "TIMESTAMP"
    },
    deletedAt: {
        type: "TIMESTAMP",
    },
    IsDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'users'
});


//TODO Association with Language
Users.belongsTo(Languages, {
    foreignKey: "language",
    as: ""
});

//TODO Accociation with Company

Users.belongsTo(Company, {
    foreignKey: "company_id",
    as: ""
});


//TODO Assciaction with Trainee Table
// Users.belongsTo(CompanyContact, {
//     foreignKey: "id",
//     as: ""
// });