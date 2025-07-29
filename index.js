// index.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/send", async (req, res) => {
  const { zarib } = req.body;

  try {
    const result = await fetch("https://hmp.rf.gd/save_zarib.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `zarib=${encodeURIComponent(zarib)}`,
    });

    const text = await result.text();
    res.status(200).send("✅ ارسال شد به سرور: " + text);
  } catch (e) {
    res.status(500).send("⛔ خطا در پراکسی: " + e.message);
  }
});

app.listen(3000, () => console.log("🔁 پراکسی فعال شد"));