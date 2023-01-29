const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

const abstracts = require('./abstracts.json');

// OpenAI requests + responses are limited to 500 tokens.
// I think I can increase this to 2048, but I'm not sure.
const MAX_TOKENS = 500;

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const main = async () => {
  try {
    const textToSummarize = getTextToSummarize();
    const summarization = await createSummarization(textToSummarize);
    console.log(summarization);
  } catch (error: any) {
    handleError(error);
  }
};

const getTextToSummarize = (): string => {
  // TODO make it work for multiple abstracts
  const text = abstracts[0].text;

  return text;
};

const createSummarization = async (textToSummarize: string): string => {
  const summarizePrefix = 'Summarize this for a second-grade student:\n\n';

  // create a completion and get response from
  // completion.data.choices[0].text
  const prompt = `${summarizePrefix}${textToSummarize}`;
  const model = 'text-davinci-003';
  console.log(`asking for completion using model (${model}) for text:\n\n${prompt}\n\n`);

  const completion = await openai.createCompletion({
    model,
    prompt,
    MAX_TOKENS,
  });

  return completion.data.choices[0].text;
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
