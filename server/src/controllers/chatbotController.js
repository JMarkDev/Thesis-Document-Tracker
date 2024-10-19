const dialogflow = require("dialogflow");
const config = require("../configs/devKeys");
const uuid = require("uuid");
const documentModel = require("../models/documentModel");
const documentHistoryModel = require("../models/documentHistoryModel");
const documentRecipientModel = require("../models/documentRecipientModel");

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

const trackLatestDocumentHistory = async (req, res) => {
  const tracking_number = req.body.queryResult.parameters.tracking_number;

  console.log("Received tracking number:", tracking_number); // Debugging line

  try {
    const document = await documentModel.findOne({
      where: { tracking_number },
      include: [
        {
          model: documentHistoryModel,
          required: true,
        },
        {
          model: documentRecipientModel,
          required: true,
        },
      ],
    });

    if (!document) {
      return res.json({
        fulfillmentText:
          "Sorry, I couldn't find the document with that tracking number.",
      });
    }

    // Format the dynamic response for the latest document history
    const latestHistory =
      document.document_histories[document.document_histories.length - 1];

    if (!latestHistory) {
      return res.json({
        fulfillmentText:
          "There is no document history available for this document.",
      });
    }

    const { action, recipient_office, recipient_user, createdAt } =
      latestHistory;

    // Format the timestamp
    const formattedTime = new Date(createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });

    let message = "";

    if (action === "received") {
      message = `The document "${document.document_name}" has been successfully received by ${recipient_user} at "${recipient_office}" on ${formattedTime}.`;
    } else if (action === "forwarded") {
      // Find the index of the current recipient office
      const currentRecipientIndex = document.document_recipients.findIndex(
        (recipient) => recipient.office_name === recipient_office
      );

      // Get the next office in the recipients array
      const nextRecipient =
        document.document_recipients[currentRecipientIndex + 1];

      // Format the message accordingly
      if (nextRecipient) {
        message = `The document "${document.document_name}" has been successfully forwarded to "${nextRecipient.office_name}" by ${recipient_user} on ${formattedTime}.`;
      } else {
        message = `The document "${document.document_name}" has been successfully forwarded to "${recipient_office}" by ${recipient_user} on ${formattedTime}.`;
      }
    } else if (action === "uploaded") {
      // Handle the uploaded action
      message = `The document "${document.document_name}" has been successfully uploaded by ${recipient_user} on ${formattedTime}.`;
    } else {
      message = "No recent actions on the document.";
    }

    return res.status(200).json({ fulfillmentText: message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      fulfillmentText: "An error occurred while tracking the document.",
    });
  }
};

module.exports = {
  chatbotQuery,
  trackLatestDocumentHistory,
};
