// api/ugc-generator.js

export default async function handler(req, res) {
  // 1️⃣ Allow both POST and GET
  if (req.method === "POST") {
    try {
      const { status, latestVideoLink } = req.body;

      console.log("✅ Received from n8n:", latestVideoLink);

      // In-memory storage (resets when function restarts)
      global.latestVideo = latestVideoLink;

      return res.status(200).json({
        success: true,
        message: "Video link received successfully.",
        latestVideoLink,
      });
    } catch (err) {
      console.error("❌ Error:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // 2️⃣ Handle GET request (frontend can use this)
  if (req.method === "GET") {
    if (global.latestVideo) {
      return res.status(200).json({
        success: true,
        latestVideoLink: global.latestVideo,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No video generated yet.",
      });
    }
  }

  // 3️⃣ Fallback for unsupported methods
  return res
    .status(405)
    .json({ success: false, message: "Method not allowed" });
}
