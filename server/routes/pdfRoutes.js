const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/multer");

const protect =
  require("../middleware/authMiddleware");

const {

  uploadPdf,

  getPdfs,

  deletePdf,

  generateSummary,

} = require(
  "../controllers/pdfController"
);


// GET PDFs
router.get(
  "/",
  protect,
  getPdfs
);


// UPLOAD PDF
router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPdf
);


// DELETE PDF
router.delete(
  "/:id",
  protect,
  deletePdf
);


// AI SUMMARY
router.post(
  "/summary",
  protect,
  generateSummary
);


module.exports = router;