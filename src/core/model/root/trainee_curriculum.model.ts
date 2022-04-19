import {DataType} from "sequelize-typescript";
import {Model} from "sequelize";
import sequelizeconnection from "../../database/sequelize";
import Curriculum from "./curriculum.model";
import TechnologyCategory from "./technology.model";
import Languages from "../language/language.model";
import Trainee from "./trainee.model";
import Users from "./users.model";


export default class TraineeCurriculum extends Model {
    id!:number;
    trainee_id!:number;
    trainee_user_id!:number;
    curriculum_id!:number;
    technology_id!:number;
    language_id!:number;
    created_by!:number;
    updated_by!:number;
    deleted_by!:number;
}


TraineeCurriculum.init({
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    trainee_id: {
        type: DataType.INTEGER,
        references: {
            model: Trainee,
            key: 'id'
        }
    },
    trainee_user_id: {
        type: DataType.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    language_id: {
        type: DataType.INTEGER,
        references: {
            model: Languages,
            key: 'id'
        }
    },
    curriculum_id: {
        type: DataType.INTEGER,
        references: {
            model: Curriculum,
            key: 'id'
        }
    },
    technology_id: {
        type: DataType.INTEGER,
        references: {
            model: TechnologyCategory,
            key: 'id'
        }
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
    },
    IsBlock: {
        
        type: DataType.TINYINT,
        defaultValue: 0
    }
}, {
    timestamps:false,
    sequelize: sequelizeconnection,
    tableName: 'trainee_curriculum'
});

TraineeCurriculum.belongsTo(Curriculum, {
    foreignKey: 'curriculum_id'
})

TraineeCurriculum.belongsTo(TechnologyCategory, {
    foreignKey: 'technology_id'
})

TraineeCurriculum.belongsTo(Languages, {
    foreignKey: "language_id"
});