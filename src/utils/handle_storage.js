import { getAuth } from "firebase/auth"
// import cloudinary from '../cloudinary';

// export const uploadPdf = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: 'raw',
//       folder: 'pdfs' 
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error('Error uploading PDF:', error);
//     throw error;
//   }
// };

export const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const getAuthToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
      try {
          return await user.getIdToken();
      } catch (error) {
          console.error("Error getting token:", error);
          return null;
      }
  } else {
      return null;
  }
};


// import axios from 'axios';

// const queryChatGPTWithPdfContent = async (pdfText) => {
//   const apiKey = 'your_openai_api_key';  // Replace with your OpenAI API key

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-4', // Specify the model
//         messages: [{ role: 'user', content: pdfText }], // Pass the extracted PDF text as the prompt
//         max_tokens: 2000,  // Adjust token limit
//         temperature: 0.7   // Adjust for creativity
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     // Log and return the response from ChatGPT
//     const chatGPTResponse = response.data.choices[0].message.content;
//     console.log(chatGPTResponse);
//     return chatGPTResponse;
//   } catch (error) {
//     console.error('Error querying ChatGPT:', error);
//     return null;
//   }
// };

// // Example usage with extracted PDF text:
// const pdfText = "This is some sample text extracted from a PDF document...";
// queryChatGPTWithPdfContent(pdfText).then(response => {
//   console.log("ChatGPT Response:", response);
// });
