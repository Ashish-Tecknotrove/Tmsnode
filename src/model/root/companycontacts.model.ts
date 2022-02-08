import {Model} from "sequelize";
import {AllowNull, DataType} from "sequelize-typescript";
import sequelizeconnection from "../../database/sequelize";
import Company from "./company.model";
import CompanyUser from "./compayuser.model";


interface CompanyContactsAttrivutes {
    id: number;
    company_id: number;
    name: string;
    department: string;
    mobile_no: string;
    created_by: number;
    updated_by: number;
    active: number;
}


export default class CompanyContact extends Model {
    declare id: number;
    company_id!: number;
    name!: string;
    department!: string;
    mobile_no!: string;
    created_by!: number;
    updated_by!: number;
    active!: number;

}


CompanyContact.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_id: {
        type: DataType.INTEGER,
        references: {
            model: Company,
            key: 'id'
        }

    },
    name: {
        type: DataType.STRING(100),
        allowNull: false
    },
    department: {
        type: DataType.STRING(100),
        allowNull: false
    },
    mobile_no: {
        type: DataType.STRING,
        allowNull: false
    },
    created_by: {
        type: DataType.STRING,
        allowNull: false
    },
    updated_by: {
        type: DataType.STRING,
        allowNull: false
    },
    createdAt: {
        type: "TIMESTAMP"
    },
    updatedAt: {
        type: "TIMESTAMP"
    },
    deletedAt: {
        type: "TIMESTAMP"
    },
    IsDeleted: {
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: true,
    sequelize: sequelizeconnection,
    tableName: 'company_contacts'
});

// //TODO Company User
// CompanyUser.belongsTo(Company, {
//     foreignKey: 'company_id'
// });

