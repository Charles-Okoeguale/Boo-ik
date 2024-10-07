import axios from 'axios';

export const analyzePdf = async (pdfUrl, idToken) => {
  return await axios.post('http://localhost:5000/api/process-pdf', {
    pdfUrl,
    idToken,
  });
};


export const uploadFile = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'vpwyqduo');

  const { data } = await axios.post('https://api.cloudinary.com/v1_1/dcm42p2eg/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(percentCompleted);
    },
  });

  return data.secure_url;
};
