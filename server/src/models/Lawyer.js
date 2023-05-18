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
        url: { type: "string" },
        educationBackground: { type: "string" },
        workExperience: { type: "string" },
        language: { type: "string" },
        location: { type: "string" },
      },
    };
  }
}

module.exports = Lawyer;
