const express = require("express");
const multer = require("multer");
const Car = require("../models/Car");
const auth = require("../middleware/auth");
const router = express.Router();

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Create Car
router.post("/", auth, upload.array("images", 10), async (req, res) => {
  const { title, description, tags } = req.body;
  const images = req.files.map(file => file.path);

  try {
    const car = await Car.create({
      title,
      description,
      tags: tags.split(","),
      images,
      userId: req.user.id,
    });
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: "Error creating car", error: err.message });
  }
});

// List Cars
router.get("/", auth, async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.id });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars", error: err.message });
  }
});

// Get Car Details
router.get("/:id", auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id)
      return res.status(404).json({ message: "Car not found" });

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: "Error fetching car", error: err.message });
  }
});

// Update Car
router.put("/:id", auth, async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id)
      return res.status(404).json({ message: "Car not found" });

    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags ? tags.split(",") : car.tags;

    await car.save();
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: "Error updating car", error: err.message });
  }
});

// Delete Car
router.delete("/:id", auth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.userId.toString() !== req.user.id)
      return res.status(404).json({ message: "Car not found" });

    await car.remove();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting car", error: err.message });
  }
});

module.exports = router;
