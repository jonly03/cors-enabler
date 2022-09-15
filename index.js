import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(express.json());
app.use(cors());

// https://cors-enabler-ns.herokuapp.com/bypass-cors?apiKey=7WdpoAlKL0j_ELY13HRYgMbruPV-CKw2Ez5dkzjzK7kq5HGUmqIm5PK7zTmhnWyIe8SjsrnuFq9QsI2iq5xOQI5J0V960IdOhdEzPaj3SejU8F8aH5sis43MR4kfY3Yx&apiUrl=https://api.yelp.com/v3/businesses/search?term=restaurants&location=New%20york%20city

// nellysugu.com/bypass-cors?apiKey=&apiUrl=
// => inputs
// url to where to get data
// key to the api url
// headers
// {
//     apiKey: "",
//     apiUrl: "",
//     howToUse: {
//         queryParam: true,
//         authHeader: false
//     }
// }
app.get("/bypass-cors", function (req, res) {
  let { apiKey, apiUrl, location } = req.query;
  // let { apiKey, apiUrl } = req.query;

  if (!apiKey || !apiUrl) {
    return res
      .status(400)
      .send({ error: "apiUrl and apiKey are both required" });
  }

  console.log(`Api url: ${apiUrl}`);

  let header = {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${apiKey}`,
  };

  if (location) {
    apiUrl += `&location=${location}`;
  }

  fetch(apiUrl, {
    method: "GET",

    headers: header,
  })
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Cooking with Crisco");
});
