const express = require("express");

const router = express.Router();

const db = require("../data/dbConfig");

router.use(express.json());

router.get("/sales", (req, res) => {
  db("sales as s")
    .join("cars as c", "s.car_ID", "c.id")
    .select("c.vin", "c.make", "c.model", "s.data", "s.price")
    .then(carInfo => res.status(200).json(carInfo))
    .catch(err =>
      res.status(500).json({ errorMessage: "Error fetching cars" })
    );
});

router.get("/", (req, res) => {
  db("cars")
    .then(cars => res.status(200).json(cars))
    .catch(err =>
      res.status(500).json({ errorMessage: "Error fetching cars" })
    );
});

router.get("/:id", validateCarID, (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({ errorMessage: "Error fetching car" }));
});

router.post("/", validateCar, (req, res) => {
  const { vin, make, model, mileage } = req.body;
  var { transmission, status } = req.body;

  if (!transmission) {
    transmission = "Unknown";
  }
  if (!status) {
    status = "Unknown";
  }

  db("cars")
    .insert({
      vin: vin,
      make: make,
      model: model,
      transmission: transmission,
      status: status,
      mileage: mileage
    })
    .then(car => res.status(201).json(car))
    .catch(err => res.status(500).json({ error: "Error adding this car" }));
});

router.put("/:id", validateCarID, (req, res) => {
  const { id } = req.params;
  const { vin, make, model, mileage } = req.body;
  var { transmission, status } = req.body;

  if (!transmission) {
    transmission = "Unknown";
  }
  if (!status) {
    status = "Unknown";
  }
  db("cars")
    .where({ id })
    .update({
      vin: vin,
      make: make,
      model: model,
      transmission: transmission,
      status: status,
      mileage: mileage
    })
    .then(car => res.status(201).json(car))
    .catch(err => res.status(500).json({ error: "Error updating this car" }));
});

router.delete("/:id", validateCarID, (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .del()
    .then(car => {
      if (car > 0) {
        res.status(200).json({ message: "Car deleted" });
      } else {
        res.status(400).json({ errorMessage: "Car could not be deleted" });
      }
    })
    .catch(err => res.status(500).json({ errorMessage: "Error deleting car" }));
});

function validateCar(req, res, next) {
  const { vin, make, model, mileage } = req.body;

  if (!vin || !make || !model || !mileage) {
    res
      .status(400)
      .json({ error: "Missing car data. VIN, Make, Model, Mileage." });
  } else {
    next();
  }
}

function validateCarID(req, res, next) {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .then(car => {
      if (car) {
        carID = id;
        next();
      } else {
        res.status(400).json({ errorMessage: "Invalid car id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error validating car id." });
    });
}

module.exports = router;
