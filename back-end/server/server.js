const express = require("express");
const cors = require("cors");
const { retrieveSystemInfo } = require("../systemInfo/basicInfo");

const app = express();
const port = 4001;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from back-end");
});

app.get("/api/get-system-info", async (req, res) => {
  try {
    const systemInfo = await retrieveSystemInfo(); // Get system info
    if (systemInfo) {
      res.json(systemInfo); // Send system info as JSON response
    } else {
      res.status(404).json({ error: "System information not found" });
    }
  } catch (error) {
    console.error("Error fetching system info:", error);
    res.status(500).json({ error: "Failed to retrieve system information" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
