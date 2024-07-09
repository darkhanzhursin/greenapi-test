const express = require("express");
const path = require("path");
const whatsAppClient = require("@green-api/whatsapp-api-client");

const app = express();
const PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "/view")));

app.post("/api/settings", async (req, res) => {
  const { idInstance, apiTokenInstance } = req.body;
  const restAPI = whatsAppClient.restAPI({
    idInstance: idInstance,
    apiTokenInstance: apiTokenInstance,
  });
  try {
    const response = await restAPI.settings.getSettings();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while making GET request");
  }
});

app.post("/api/instance", async (req, res) => {
  const { idInstance, apiTokenInstance } = req.body;
  const restAPI = whatsAppClient.restAPI({
    idInstance: idInstance,
    apiTokenInstance: apiTokenInstance,
  });
  try {
    const response = await restAPI.instance.getStateInstance();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while making GET request");
  }
});

app.post("/api/msg", async (req, res) => {
  const { idInstance, apiTokenInstance, phone, message } = req.body;
  const restAPI = whatsAppClient.restAPI({
    idInstance: idInstance,
    apiTokenInstance: apiTokenInstance,
  });
  try {
    const response = await restAPI.message.sendMessage(
      `${phone}@c.us`,
      null,
      `${message}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while making POST request");
  }
});

app.post("/api/file", async (req, res) => {
  const { idInstance, apiTokenInstance, phone, fileUrl } = req.body;
  const restAPI = whatsAppClient.restAPI({
    idInstance: idInstance,
    apiTokenInstance: apiTokenInstance,
  });
  try {
    const response = await restAPI.file.sendFileByUrl(
      `${phone}@c.us`,
      null,
      `${fileUrl}`,
      "horse.png",
      "horse"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while making POST request");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
