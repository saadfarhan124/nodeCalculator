var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

/* GET home page. */
//Route Get /
//Desc Index
router.get("/", function(req, res, next) {
  res.render("index");
});

//Route Get /calculatorBMI
//Desc Calculator
router.get("/calculateBMI", function(req, res, next) {
  res.render("BMI");
});

//Route Post /calculatorBMI
//Desc CALC BMI Result
router.post(
  "/calculateBMI",
  [
    check("height", "Height required")
      .not()
      .isEmpty(),
    check("weight", "Width required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { height, weight } = req.body;

    const bmi = (weight / Math.pow(height, 2)) * 703;

    res.render("BMI", {
      bmi: bmi.toFixed(2)
    });
  }
);

//Route Get /calculatorPPI
//Desc Calc PPI
router.get("/calculatorPPI", (req, res) => {
  res.render("PPI");
});

//Route Post /calculatorPPI
//Desc CALC PPI Result
router.post(
  "/calculatorPPI",
  [
    check("height", "Height required")
      .not()
      .isEmpty(),
    check("width", "Width required")
      .not()
      .isEmpty(),
    check("screensizeinches", "Diagnol screen size required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { height, width, screensizeinches } = req.body;
    const diagnolPixels = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const ppi = diagnolPixels / screensizeinches;

    res.render("PPI", {
      ppi: ppi.toFixed(2)
    });
  }
);

//Route Get /calculatorVolume
//Desc Calc Volume
router.get("/calculateVolume", (req, res) => {
  res.render("Volume");
});

//Route Post /calculatorVolume
//Desc CALC Volume Result
router.post(
  "/calculateVolume",
  [
    check("radius", "Radius required")
      .not()
      .isEmpty(),
    check("height", "Height required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
      }
      const { radius, height } = req.body;
      const volume = Math.PI * Math.pow(radius, 2) * height;
      res.render("Volume", {
        volume: volume.toFixed(2)
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

//Route Get /calculatePerimeter
//Desc Calc Volume
router.get("/calculatePerimeter", (req, res) => {
  res.render("Perimeter");
});

//Route Post /calculatorVolume
//Desc CALC Volume Result
router.post(
  "/calculatePerimeter",
  [
    check("length", "Radius required")
      .not()
      .isEmpty(),
    check("width", "Height required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
      }
      const { length, width } = req.body;
      const perimeter = (2 * (parseInt(length) + parseInt(width))).toFixed(2);
      // res.send(perimeter.toString());
      res.render("Perimeter", {
        perimeter: perimeter
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
