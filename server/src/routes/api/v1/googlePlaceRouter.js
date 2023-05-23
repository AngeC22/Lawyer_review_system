import express from "express";
import got from "got";

const googlePlaceRouter = new express.Router();

const getGoogleInfo = async (googlePlaceId) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=name,formatted_address,reviews,rating,geometry/location,editorial_summary&key=AIzaSyDIra1juLYvG4k4dRXvlnyna2_Xxvh35-A`;
    const apiResponse = await got(url);
    const parsedBody = await JSON.parse(apiResponse.body);
    console.log(parsedBody.result.id);
    const responseReviews = parsedBody.result.reviews;
    // console.log("reponseReviews:", responseReviews);
    const returnedGoogleInfo = [];
    console.log("returnedGoogleInfo:", returnedGoogleInfo);
    responseReviews.forEach((result) => {
      return returnedGoogleInfo.push({
        text: result.text,
        name: result.author_name,
        rating: result.rating,
      });
    });
    return returnedGoogleInfo;
  } catch (err) {
    return { errors: err.message };
  }
};

googlePlaceRouter.get("/", async (req, res) => {
  const id = req.query.id;
  const info = await getGoogleInfo(id);
  console.log(id);
  try {
    console.log("HEY YO");
    console.log(getGoogleInfo(id));
    return res.status(200).json({ info });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

// googlePlaceRouter.get("/", async (req, res) => {
//   console.log("You did it");
//   const { id } = req.params;
//   try {
//     console.log("HEY YO");
//     //
//     return res.status(200).json({});
//   } catch (error) {
//     return res.status(500).json({ errors: error });
//   }
// });

googlePlaceRouter.get("/searchwithreviews", async (req, res) => {
  //search googlemaps lawyer?

  /*fetch lawyers in here */

  /*[
    {
      dformatte:
    }

  ]*/

  //loop throught array
  //for or map
  //on each address
  //search your database for reviews
  //push into array

  //search your db match by formatted_property_address
  const searchQuery = req.query.search;

  res.json({
    message: "hello",
  });
});

googlePlaceRouter.post("/searchwithreviews", async (req, res) => {
  /*
  create({
    formatted_property_address: "sdfsdfs",
    ratings: 5
    review "i like it"
  })
  */

  const searchQuery = req.query.search;

  res.json({
    message: "hello",
  });
});

export default googlePlaceRouter;
