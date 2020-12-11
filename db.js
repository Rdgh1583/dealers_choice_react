const Sequelize = require("sequelize");
const { STRING, TEXT, ENUM } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgresql://localhost/packing",
  { logging: false }
);

const Suitcase = db.define("suitcase", {
  name: { type: STRING },
  description: { type: TEXT },
});

const Content = db.define("content", {
  name: { type: STRING },
  // priority: { type: ENUM("low", "medium", "high") },
});

Content.belongsTo(Suitcase);
Suitcase.hasMany(Content);

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [tote, backapack, luggage] = await Promise.all([
    Suitcase.create({ name: "tote", description: "small" }),
    Suitcase.create({ name: "backpack", description: "medium" }),
    Suitcase.create({ name: "luggage", description: "large" }),
  ]);

  const [toothpaste, toothbrush, deodorant] = await Promise.all([
    Content.create({ name: "toothpaste" }),
    Content.create({ name: "toothbrush" }),
    Content.create({ name: "deodorant" }),
  ]);

  toothpaste.suitcaseId = tote.id;
  toothbrush.suitcaseId = tote.id;
  await Promise.all([toothpaste.save(), toothbrush.save()]);
};

const init = async () => {
  try {
    await db.authenticate();
    await syncAndSeed();
  } catch (err) {
    console.log(err);
  }
};

init();

module.exports = { syncAndSeed, models: { Suitcase, Content }, db };
