import express from "express";
import { Lawyer, Review } from "../../../models/index.js";
import { ValidationError } from "objection";

const reviewRouter = new express.Router({ mergeParams: true });

reviewRouter.post("/", async (req, res) => {
  const lawyerId = req.params.id;
  const { review } = req.body.review;
  try {
    const userId = req.user.id;
    const newReview = await Review.query().insert({ review, userId, lawyerId });
    return res.status(201).json({ review: newReview });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: "Unable to add comment" });
  }
});

// reviewRouter.post("/", async (req, res) => {
//   console.log("HIT REVIEWROUTER!", req.body);
//   const lawyerId = await Lawyer.query().where("name", "=", req.body.name);
//   if (lawyerId[0]) {
//     const response = await Review.query().insert({
//       id: req.body.id,
//       lawyerId: parseInt(lawyerId[0].id),
//       userId: req.body.userId,
//       text: req.body.text,
//     });
//   } else {
//     //console.log(response);
//     res.send("review");
//   }
// });

export default reviewRouter;
