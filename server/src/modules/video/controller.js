const multer  = require('multer') 
const setupRoutes = (app) => {
  app.get("/", async (req, res) => {
    return res.status(200).send({ message: "Success" });
  });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/videos");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

  const fileFilter = (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
   
    if (file.mimetype === "video/mp4" || file.mimetype === "video/x-matroska") {
    // To accept the file pass `true`, like so:
      console.log("File type supported", file);
      cb(null, true);
    } else {
      console.log("File type not supported", file);
      // You can always pass an error if something goes wrong:
      cb(new multer.MulterError("File type not supported"), false);
    }
  };

  const upload = multer({
    dest: "uploads/videos",
    fileFilter: fileFilter,
    limits: { fileSize: 50000000 },
    storage: storage,
  }).single("video");

  const uploadProcessor = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ status: "error", message: err });
        return;
      } else {
        console.log("file", res.file);
        next();
      }
    });
  };
  app.post("/upload", uploadProcessor, async (req, res) => {
    try {
        console.log("Post upload", JSON.stringify(req.body))
        return res.status(200).json({message:'uploaded'})
    } catch (error) {
        console.log(error)
      
    }
  });
};

module.exports = { setupRoutes };
