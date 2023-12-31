const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const {Configuration,OpenApi, OpenAIApi} = require('openai');
const { config } = require('dotenv');


const Config = new Configuration ({
    apiKey: "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"
})

const openai = new OpenAIApi(config);


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async(req,res) => {
    const {prompt} = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature : 0,
        prompt: prompt,
    });

    res.send(completion.data.choices[0].text);
})

const port = 8080;

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});