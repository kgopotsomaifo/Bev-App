const Club = require("../models/club");

// add a new club/outlet
async function newClub(req, res) {
  try {
    const newClub = new Club(req.body);
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating club", details: error.message });
  }
}

// List all jobs ordered by status and date submitted*(all jobs that have not been archived)*
async function clubList(req, res) {
  try {
    const jobs = await Club.find({ archived: { $ne: true } }).sort({
      status: 1,
      dateSubmitted: -1,
    });
    res.status(200).json(jobs);
    // console.log("list here");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update information about a single club
async function updateClub(req, res) {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(club);
  } catch (err) {
    res.status(404).json({ error: "Club not found" });
  }
}

// Route for batch updating clubs
async function batchUpdate(req, res) {
  {
    const { clubIds, status } = req.body;

    try {
      // Update the selected jobs with the new status
      await Club.updateMany({ _id: { $in: clubIds } }, { status });

      res.json({ message: "Batch update successful" });
    } catch (error) {
      console.error("Batch update error:", error);
      res.status(500).json({ message: "Batch update failed" });
    }
  }
}

// Archive a specific club
async function archiveClub(req, res) {
  {
    let clubId = req.params.id;
    try {
      // Find the job by ID and update archived to true
      const club = await Club.findByIdAndUpdate(clubId, { archived: true });
      res.status(200).json({ message: "Club archived successfully" });
    } catch (err) {
      res.status(404).json({ error: "Club not found" });
    }
  }
}

// Filter jobs by status
async function filterClub(req, res) {
  {
    const { status } = req.params;
    try {
      const clubs = await Club.find({
        status: { $eq: status },
      });
      res.status(200).json(clubs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = {
  newClub,
  clubList,
  updateClub,
  batchUpdate,
  archiveClub,
  filterClub,
};
