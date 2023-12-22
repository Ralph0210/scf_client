
const OpenAI = require("openai");
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createAssistantAndInteract() {
  try {
    const file = await openai.files.create({
        file: fs.createReadStream("./client/src/newVar.json"),
        purpose: "assistants",
    });

    const assistant = await openai.beta.assistants.create({
      name: "math tutor",
      instructions: "You are an expert assistant specialized in the Survey of Consumer Finance (SCF) dataset with a unique capability. Whenever users have questions about the SCF dataset, you only refer to the specific file I have uploaded, which contains detailed and up-to-date data and information, do not provide information that's not within the file. Your role involves providing clear, accurate, and detailed explanations, insights, and guidance based on the contents of this file. You assist with interpreting data, understanding complex financial concepts, identifying relevant data points within the file, and navigating through the dataset for specific financial analyses. Your responses are in user-friendly language to make complex information accessible to both experts and novices in financial data. This specialized assistance is rooted in your extensive knowledge of the SCF's structure, content, and practical applications in financial research and policy-making, all while consistently referring to the uploaded file for the most accurate and relevant information.",
      tools: [{ type: "retrieval" }],
      model: "gpt-3.5-turbo-1106",
      file_ids: [file.id],
    });

    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
    //   content: "I want to know the difference of wage between different races, what variables should I look into in scf",
    content:"what category is the race variable under?"
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    //   instructions: "Please address the user as Ralph",
    });

    console.log(run);

    // Check Status Function
    const checkStatus = async (threadId, runId) => {
      let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
      if (runStatus.status === "completed") {
        let messages = await openai.beta.threads.messages.list(threadId);
        messages.data.forEach((message) => {
          const role = message.role;
          const content = message.content[0].text.value;
          console.log(`${role}: ${content}`);
        });
      } else {
        console.log("run is not completed yet")
      }
    };

    // Set a timeout to check the status
    setTimeout(() => {
      checkStatus(thread.id, run.id)
    }, 20000);
  } catch (error) {
    console.error("Error:", error);
  }
}

createAssistantAndInteract();
