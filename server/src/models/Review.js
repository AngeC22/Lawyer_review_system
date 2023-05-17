const Model = require("./Model");

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["review", "lawyerId", "userId", "rating"],
      properties: {
        review: { type: "string" },
        lawyerId: { type: ["integer", "string"] },
        userId: { type: ["integer", "string"] },
        rating: { type: ["integer", "string"] },
      },
    };
  }
  static get relationMappings() {
    const Lawyer = require("./Lawyer");
    const User = require("./User");

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
