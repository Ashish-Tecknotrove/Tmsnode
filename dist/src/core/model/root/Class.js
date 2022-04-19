"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
class Class extends sequelize_2.Model {
    static initialize(sequelize) {
        this.init({
            name: sequelize_1.DataTypes.STRING
        }, {
            sequelize: sequelize,
            name: {
                singular: 'Class',
                plural: 'Classes'
            }
        });
    }
}
exports.default = Class;
