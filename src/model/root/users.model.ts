import { DataTypes, Model } from "sequelize";
import { DataType } from "sequelize-typescript";


import sequelizeConnection from "../../database/sequelize";
import Languages from "../language/language.model";
import Company from "./company.model";
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
  deleted_at: number;
}

export default class Users extends Model<UsersAttributes> implements UsersAttributes {
  id!: number;
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
  deleted_at!: number;
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
    type: DataTypes.STRING,
    allowNull: true
  },
  mobile_no: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  email_verified_at: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_admin: {
    type: DataTypes.TINYINT,
    defaultValue:'0',
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password_wordpress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  user_type: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
      model:UserType,
      key:'id'
    }
  },
  product_purchased: {
    type: DataTypes.STRING,
    allowNull: true
  },
  activation_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deactivation_date: {
    type: DataTypes.DATE,
    allowNull: true
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
    type: DataTypes.TINYINT,
    allowNull: true
  },
  disable_user: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  trainee_license_limit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sequence_test: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  tableName: 'users'
});


//TODO Association with Language
Users.belongsTo(Languages, {
  foreignKey: "portal_language",
  as: ""
});

//TODO Accociation with Company

Users.belongsTo(Company, {
  foreignKey: "company_id",
  as: ""
});


//TODO Assciaction with Trainee Table
