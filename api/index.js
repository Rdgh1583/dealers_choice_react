const router = require("express").Router();
const {
  models: { Suitcase, Content },
} = require("../db.js");

router.get("/contents", async (req, res, next) => {
  try {
    res.send(await Content.findAll());
  } catch (ex) {
    next(ex);
  }
});

router.get("/contents/:id", async (req, res, next) => {
  try {
    res.send(
      await Content.findByPk(req.params.id, {
        include: Suitcase,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
