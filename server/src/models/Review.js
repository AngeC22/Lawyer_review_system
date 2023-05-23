const Model = require("./Model");

// const Review = require("./Revie
// for relationMappings look back at week 6 material
// the require statements ened to be defined in the `relationmappings()`
class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id", "text"],
      properties: {
        id: { type: "integer" },
        text: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Review, Lawyer, User } = require("./index");

    return {
      lawyer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lawyer,
        join: {
          from: "reviews.lawyerId",
          to: "lawyers.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Review;
