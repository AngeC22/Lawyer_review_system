import express from "express";
import { Lawyer } from "../../../models";

const lawyerShowRouter = new express.Router();

lawyerShowRouter.get("/", async (req, res) => {
  try {
    const lawyers = await Lawyer.query();
    return res.status(200).json({ lawyers });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

lawyerShowRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const lawyer = await Lawyer.query().findById(id);
    return res.status(200).json({ lawyer });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

lawyerShowRouter.post("/", async (req, res) => {
  try {
    const lawyerData = req.body;
    const newLawyer = await Lawyer.query().insert(lawyerData);
    return res.status(201).json({ lawyer: newLawyer });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default lawyerShowRouter;
