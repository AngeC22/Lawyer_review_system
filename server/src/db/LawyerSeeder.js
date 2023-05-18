import { Lawyer } from "../models/index.js";
class LawyerSeeder {
  static async seed() {
    const lawyerData = [
      {
        name: "Jane",
        id: "3",
        url: "http",
        location: "NYC",
        language: "Chinese",
        educationBackground: "Master",
        workExperience: "years",
      },
    ];

    for (const lawyer of lawyerData) {
      const lawyerObject = await Lawyer.query().findOne({ id: lawyer.id });
      if (!lawyerObject) {
        await Lawyer.query().insert(lawyer);
      }
    }
  }
}

export default LawyerSeeder;
