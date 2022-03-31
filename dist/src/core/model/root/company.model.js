"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
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
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    enrollment_id: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    panel_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: masterpanel_model_1.default,
            key: 'id'
        },
        allowNull: false
    },
    company_type: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: true
    },
    gst: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    picture: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    simulator_count: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    pincode: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    city_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "cities",
            key: "id"
        }
    },
    state_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    country_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    contact_person_count: {
        type: sequelize_1.DataTypes.STRING,
    },
    trainee_unique_login: {
        type: sequelize_1.DataTypes.ENUM('email', 'mobile', 'aadhar'),
        defaultValue: 'email',
        allowNull: false,
    },
    company_unique_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    api_decider: {
        type: sequelize_1.DataTypes.STRING,
    },
    registration_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    day_no: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    calender_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    deleted_by: {
        type: sequelize_1.DataTypes.INTEGER
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
    IsDeleted: {
        type: sequelize_1.DataTypes.TINYINT,
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
