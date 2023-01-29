const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async () => {
  try {
    await createSummarization();
  } catch (error: any) {
    handleError(error);
  }
};

const createSummarization = async () => {
  const summarizePrefix = 'Summarize this for a second-grade student:\n\n';

  let textToSummarize = `TODO`;

  // create a completion and get response from
  // completion.data.choices[0].text
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${summarizePrefix}${textToSummarize}`,
  });

  console.log(completion.data.choices[0].text);
};

const handleError = (error: any) => {
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.data);
  } else {
    console.log(error.message);
  }
};

main();
