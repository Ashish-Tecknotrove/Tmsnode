"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_2 = __importDefault(require("../../database/sequelize"));
const cities_model_1 = __importDefault(require("../resources/cities.model"));
const countries_model_1 = __importDefault(require("../resources/countries.model"));
const states_model_1 = __importDefault(require("../resources/states.model"));
const compayuser_model_1 = __importDefault(require("./compayuser.model"));
const curriculum_model_1 = __importDefault(require("./curriculum.model"));
const masterpanel_model_1 = __importDefault(require("./masterpanel.model"));
const subscription_model_1 = __importDefault(require("./subscription.model"));
class Company extends sequelize_1.Model {
}
exports.default = Company;
Company.init({
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_name: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        unique: true
    },
    enrollment_id: {
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    },
    panel_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        references: {
            model: masterpanel_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    company_type: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0,
        allowNull: true
    },
    gst: {
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true
    },
    picture: {
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: true
    },
    simulator_count: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    address: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    pincode: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    city_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: "cities",
            key: "id"
        }
    },
    state_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    country_id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    contact_person_count: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    trainee_unique_login: {
        type: sequelize_typescript_1.DataType.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,
    },
    company_unique_id: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    api_decider: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    registration_type: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    day_no: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    calender_type: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    created_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    },
    deleted_by: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    createdAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    updatedAt: {
        type: sequelize_typescript_1.DataType.STRING(50),
    },
    deletedAt: {
        type: sequelize_typescript_1.DataType.STRING(50)
    },
    IsDeleted: {
        type: sequelize_typescript_1.DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps: true,
    sequelize: sequelize_2.default,
    tableName: 'companies'
});
Company.hasMany(compayuser_model_1.default, {
    foreignKey: 'company_id'
});
compayuser_model_1.default.belongsTo(Company, {
    foreignKey: "company_id",
    targetKey: "id"
});
Company.hasMany(subscription_model_1.default, {
    // as:"subscriptions",
    foreignKey: 'company_id'
});
subscription_model_1.default.belongsTo(Company, {
    foreignKey: 'company_id',
    targetKey: "id"
});
Company.hasMany(curriculum_model_1.default, {
    foreignKey: 'company_id',
});
Company.belongsTo(countries_model_1.default, {
    foreignKey: 'country_id'
});
Company.belongsTo(states_model_1.default, {
    foreignKey: 'state_id'
});
Company.belongsTo(cities_model_1.default, {
    foreignKey: 'city_id'
});
Company.belongsTo(masterpanel_model_1.default, {
    foreignKey: 'panel_id'
});
// Company.belongsTo("cities",{
// });
