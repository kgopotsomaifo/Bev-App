const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");

// endpoint to create new job
router.post("/clubs", clubController.newClub);
// endpoint to list jobs via status and date submitted
router.get("/clubs", clubController.clubList);
// endpoint to Update information about a single job
router.put("/clubs/single/:id", clubController.updateClub);
// endpoint for batch update
router.put("/clubs/batch-update", clubController.batchUpdate);
// endpoint to archive a job
router.put("/clubs/archive/:id", clubController.archiveClub);
// endpoint to filter clubs
router.get("/clubs/status/:status", clubController.filterClub);

module.exports = router;
