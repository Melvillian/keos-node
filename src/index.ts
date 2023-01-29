const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

const abstracts = require('./abstracts.json');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async () => {
  try {
    const textToSummarize = getTextToSummarize();
    await createSummarization(textToSummarize);
  } catch (error: any) {
    handleError(error);
  }
};

const getTextToSummarize = (): string => {
  // TODO make it work for multiple abstracts
  const text = abstracts[0].text;

  return text;
};

const createSummarization = async (textToSummarize: string) => {
  const summarizePrefix = 'Summarize this for a second-grade student:\n\n';

  // create a completion and get response from
  // completion.data.choices[0].text
  const prompt = `${summarizePrefix}${textToSummarize}`;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
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
