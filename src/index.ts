const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function main() {
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: 'Hello world',
    });

    console.log(completion.data.choices);
    console.log(completion.data.choices[0].text);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

main();
