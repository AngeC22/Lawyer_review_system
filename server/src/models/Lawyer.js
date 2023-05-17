const Model = require("./Model");
const Review = require("./Review");

class Lawyer extends Model {
  static get tableName() {
    return "lawyers";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "lawFirmUrl",
        "educationBackground",
        "workExperience",
        "specialty",
        "language",
        "location",
      ],
      properties: {
        name: { type: "string" },
        lawFirmUrl: { type: "string" },
        educationBackground: { type: "string" },
        workExperience: { type: "string" },
        specialty: { type: "string" },
        language: { type: "string" },
        location: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "lawyers.id",
          to: "reviews.lawyerId",
        },
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "lawyers.id",
          through: {
            from: "reviews.lawyerId",
            to: "reviews.userId",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Lawyer;
