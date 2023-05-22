/* eslint-disable no-console */
import { connection } from "../boot.js";
import LawyerSeeder from "./seeders/LawyerSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here

    console.log("Seeding lawyers");
    await LawyerSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
