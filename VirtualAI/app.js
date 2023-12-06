const express = require('express');
const http = require('http');
const path = require('path');
const { LlamaCpp } = require("langchain/llms/llama_cpp");

const port = 3005;

const app = express();

// Serve static files from the "css" directory
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the "js" directory
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'basic.html'));
});
 



const mistralPath = "./models/mistral-7b-instruct-v0.1.Q4_0.gguf";  
const model = new LlamaCpp({ modelPath: mistralPath });  
  
app.post('/chat', async (req, res) => {  
    const { message } = req.body;  
  
    conversationHistory.push({ role: 'user', content: message });  
  
    const response = await model.invoke(message);  
  
    conversationHistory.push({ role: 'assistant', content: response });  
  
    res.json({ response, conversationHistory });  
});
  


const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port localhost:${port}`));
