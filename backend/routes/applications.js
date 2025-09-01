import express from "express";
import Application from "../models/Application.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

// GET all applications
// Returns a list of all job applications, sorted by creation date (newest first)
router.get("/", async (req, res) => {
  // Define GET endpoint for fetching applications
  try {
    // Start try block to handle errors
    const apps = await Application.find().sort({ createdAt: -1 }); // Query and sort applications by newest
    res.json(apps); // Send applications as JSON response
  } catch (err) {
    // Catch any errors
    console.error("Failed to fetch applications:", err); // Log error to console
    res.status(500).json({ error: "Failed to fetch applications" }); // Send error response
  }
});

// POST a new application
// Creates a new job application with the data provided in the request body
router.post("/", async (req, res) => {
  // Define POST endpoint for creating application
  try {
    // Start try block to handle errors
    const newApp = new Application(req.body); // Create new Application instance from request body
    const savedApp = await newApp.save(); // Save new application to database
    res.status(201).json(savedApp); // Send saved application as JSON response with 201 status
  } catch (err) {
    // Catch any errors
    console.error("Failed to create application:", err); // Log error to console
    res.status(500).json({ error: "Failed to create application" }); // Send error response
  }
});

// Update application by ID
router.put("/:id", validateObjectId, async (req, res) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedApp) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json(updatedApp);
  } catch (err) {
    res.status(500).json({ error: "Failed to update application" });
  }
});

// Delete application by ID
router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ message: "Application deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;
