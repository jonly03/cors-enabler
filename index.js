import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(express.json());
app.use(cors());

// nellysugu.com/bypass-cors/
// => inputs
// url to where to get data
// key to the api url
// headers
app.get("/bypass-cors", function (req, res) {
  const { apiKey, apiUrl } = req.body;

  console.log(`Api url: ${apiUrl}`);

  let header = {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${apiKey}`,
  };

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

app.listen(process.env.PORT || 3000);
