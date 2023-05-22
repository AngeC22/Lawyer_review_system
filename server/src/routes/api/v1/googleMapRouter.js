import express from "express";
const router = express.Router();
import axios from "axios";

import got from "got";

const googleMapRouter = new express.Router();

const getLawFirmData = async () => {
  try {
    const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const queryParams = {
      query: "law firm", // Modify this query parameter according to your requirements
      key: "AIzaSyDIra1juLYvG4k4dRXvlnyna2_Xxvh35-A", // Replace with your actual API key
    };
    const apiResponse = await got(url, { searchParams: queryParams });
    const parsedBody = JSON.parse(apiResponse.body);
    const lawFirms = parsedBody.results.map((result) => ({
      name: result.name,
      address: result.formatted_address,
      ratings: result.rating,
    }));
    return lawFirms;
  } catch (err) {
    return { errors: err.message };
  }
};

googleMapRouter.get("/lawfirms", async (req, res) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: "37.7749,-122.4194", // Example location (latitude, longitude)
          radius: "500",
          type: "lawyer",
          key: "YOUR_API_KEY", // Replace with your actual Google Maps API key
        },
      }
    );

    const lawFirms = response.data.results.map((result) => ({
      name: result.name,
      address: result.vicinity,
      placeId: result.place_id,
    }));

    res.json(lawFirms);
  } catch (error) {
    console.error("Error fetching law firms:", error);
    res.status(500).json({ error: "Failed to fetch law firms" });
  }
});

googleMapRouter.post("/lawfirms/:placeId/reviews", (req, res) => {
  const placeId = req.params.placeId;
  const { rating, comment } = req.body;

  // Here, you can store the review in your database or perform any desired action
  // For example, you can save the review in your database or associate it with the corresponding law firm based on the placeId

  res.status(200).json({ message: "Review submitted successfully" });
});

//get search with lawyers and get reviews

export default googleMapRouter;
