const Model = require("./Model");

// const Review = require("./Revie
// for relationMappings look back at week 6 material
// the require statements ened to be defined in the `relationmappings()`
class Lawyer extends Model {
  static get tableName() {
    return "lawyers";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "url", "educationBackground", "workExperience", "language", "location"],
      properties: {
        name: { type: "string" },
        imageUrl: { type: "string" },
        url: { type: "string" },
        educationBackground: { type: "string" },
        workExperience: { type: "string" },
        language: { type: "string" },
        location: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    const { User, Review } = require("./index");

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "lawyers.reviewId",
          to: "reviews.id",
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
