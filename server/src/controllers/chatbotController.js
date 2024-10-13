const dialogflow = require("dialogflow");
const config = require("../configs/devKeys");
const uuid = require("uuid");

const project_id = config.project_id;

const credentials = {
  client_email: config.client_email,
  private_key: config.private_key,
};

const sessionClient = new dialogflow.SessionsClient({
  project_id,
  credentials,
});

const chatbotQuery = async (req, res) => {
  const { user_query } = req.body;
  const sessionId = uuid.v4();

  const sessionPath = sessionClient.sessionPath(project_id, "user_session");

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: user_query,
        languageCode: "en-US",
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    res.json({ data: responses[0].queryResult.fulfillmentText, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  chatbotQuery,
};
