import express from "express";
import { Lawyer } from "../../../models/index.js";

const lawyerRouter = new express.Router();

lawyerRouter.get("/", async (req, res) => {
  try {
    console.log("I'm BACKEND");
    const lawyers = await Lawyer.query();
    console.log(lawyers);
    return res.status(200).json({ lawyers });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

lawyerRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("HEY YO");
    const lawyer = await Lawyer.query().findById(id);
    console.log(lawyer);
    return res.status(200).json({ lawyer });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default lawyerRouter;
