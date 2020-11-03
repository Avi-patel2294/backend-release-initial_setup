const express = require("express");
const router = express.Router();

const multer = require("multer");
const uuidv5 = require("uuid/v5");
const MY_NAMESPACE = "16056f33-dfed-4011-a73f-1d8af313eb66";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let fileType;

    if (file.mimetype === "image/png") {
      fileType = ".png";
    } else {
      fileType = ".jpg";
    }
    cb(
      null,
      new Date().getTime() + uuidv5(file.originalname, MY_NAMESPACE) + fileType
    );
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/test", (req, res) =>
  res.json({
    msg: "ads test Works"
  })
);

router.post("/upload", upload.single("image_files"), (req, res, next) => {
  res.send(req.file);
});

//Export the module
module.exports = router;
