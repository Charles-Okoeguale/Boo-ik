# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




Here’s a simplified version of the steps:

1. **Set Up React Project**  
   Create your React project using `Create React App`:
   ```bash
   npx create-react-app pdf-chat-app
   cd pdf-chat-app
   ```

2. **Install Required Libraries**  
   Install libraries for PDF viewing and API communication:
   ```bash
   npm install @react-pdf-viewer/core @react-pdf-viewer/default-layout axios
   ```

3. **Create the PDF Viewer Component**  
   Create a `PdfViewer` component to display PDFs and handle text selection:
   ```jsx
   import React from 'react';
   import { Worker, Viewer } from '@react-pdf-viewer/core';
   import '@react-pdf-viewer/core/lib/styles/index.css';
   import { pdfjs } from 'react-pdf';

   pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

   const PdfViewer = ({ fileUrl, onTextSelect }) => {
     const handleTextSelection = (selection) => {
       const selectedText = selection.toString();
       if (selectedText) {
         onTextSelect(selectedText);
       }
     };

     return (
       <div style={{ height: '80vh', width: '100%' }}>
         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
           <Viewer
             fileUrl={fileUrl}
             onSelectionChange={handleTextSelection}
           />
         </Worker>
       </div>
     );
   };

   export default PdfViewer;
   ```

4. **Create the Chat Interface**  
   Create a `ChatInterface` component to communicate with ChatGPT:
   ```jsx
   import React, { useState } from 'react';
   import axios from 'axios';

   const ChatInterface = ({ selectedText }) => {
     const [input, setInput] = useState('');
     const [response, setResponse] = useState('');

     const handleSend = async () => {
       try {
         const result = await axios.post('https://api.openai.com/v1/completions', {
           model: 'text-davinci-003',
           prompt: `Highlighted text from PDF: "${selectedText}". User says: "${input}".`,
           max_tokens: 150
         }, {
           headers: {
             'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
             'Content-Type': 'application/json'
           }
         });

         setResponse(result.data.choices[0].text.trim());
       } catch (error) {
         console.error('Error communicating with ChatGPT:', error);
       }
     };

     return (
       <div>
         <textarea
           value={input}
           onChange={(e) => setInput(e.target.value)}
           placeholder="Enter your prompt..."
           style={{ width: '100%', height: '100px' }}
         />
         <button onClick={handleSend}>Send</button>
         <div style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px', height: '200px', overflowY: 'auto' }}>
           {response}
         </div>
       </div>
     );
   };

   export default ChatInterface;
   ```

5. **Combine Components in Main App**  
   Combine the `PdfViewer` and `ChatInterface` in your main `App` component:
   ```jsx
   import React, { useState } from 'react';
   import PdfViewer from './PdfViewer';
   import ChatInterface from './ChatInterface';

   const App = () => {
     const [selectedText, setSelectedText] = useState('');

     const handleTextSelect = (text) => {
       setSelectedText(text);
     };

     return (
       <div style={{ padding: '20px' }}>
         <h1>PDF Interaction with ChatGPT</h1>
         <PdfViewer fileUrl="path/to/your/pdf.pdf" onTextSelect={handleTextSelect} />
         {selectedText && <ChatInterface selectedText={selectedText} />}
       </div>
     );
   };

   export default App;
   ```

6. **Run the Application**  
   Run the app using:
   ```bash
   npm start
   ```

This setup integrates PDF viewing, text selection, and interaction with ChatGPT.







Maintaining Conversation History:

To simulate a persistent conversation, you need to manage the conversation history on your client side.
Each time you send a new message, you include past messages and responses as part of the new API call. This way, ChatGPT can maintain context across messages.