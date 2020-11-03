const express = require("express");
const router = express.Router();

// const L = require("esri-leaflet-geocoder");

router.get("/test", (req, res) =>
  res.json({
    msg: "ads test Works"
  })
);

//Export the module
module.exports = router;
