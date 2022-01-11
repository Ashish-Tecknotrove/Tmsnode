import { BelongsToManyGetAssociationsMixin } from "sequelize";
import { Sequelize,DataTypes } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import { Model } from "sequelize";
import Users from "./users.model";



class Class extends Model{
    public name!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    public getUsers!:BelongsToManyGetAssociationsMixin<Users>

    public readonly Users?: Users[]

    public static initialize(sequelize: Sequelize) {
        this.init({
            name: DataTypes.STRING
        }, {
            sequelize: sequelize,
            name: {
                singular: 'Class',
                plural: 'Classes'
            }
        })
    }
}


export default Class;