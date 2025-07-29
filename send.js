import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط POST پشتیبانی می‌شود." });
  }

  const { zarib } = req.body;

  if (!zarib) {
    return res.status(400).json({ message: "ضریب ارسال نشده!" });
  }

  try {
    const response = await fetch("https://hmp.rf.gd/save_zarib.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `zarib=${encodeURIComponent(zarib)}`,
    });

    const resultText = await response.text();
    res.status(200).json({ message: "✅ ارسال شد به سرور", response: resultText });
  } catch (err) {
    res.status(500).json({ message: "⛔ خطا در پراکسی", error: err.message });
  }
}