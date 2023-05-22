import { Lawyer } from "../../models/index.js";
class LawyerSeeder {
  static async seed() {
    const lawyerData = [
      {
        name: "John Smith",
        id: "3",
        url: "http",
        location: "Los Angeles, CA",
        language: "English, Spanish",
        educationBackground: "J.D. from UCLA School of Law",
        workExperience: " 10 years of practice in criminal defenses",
        specialty: "Criminal law, DUI/DWI, drug offenses, assault",
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
