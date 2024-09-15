import React, { useState, useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions, version as pdfjsVersion } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css'; 

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdf, setPdf] = useState(null);
  const canvasRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState()
  

  useEffect(() => {
    const savedPdfUrl = localStorage.getItem('pdfUrl');
    if (savedPdfUrl) {
      setPdfUrl(savedPdfUrl);
    } 
  }, []);


  useEffect(() => {
    const loadPdf = async () => {
        if (pdfUrl) { 
            const loadingTask = getDocument(pdfUrl);
            const loadedPdf = await loadingTask.promise;
            setPdf(loadedPdf);
            setNumPages(loadedPdf.numPages);
            renderPage(loadedPdf, currentPage);
        } else {
            console.error('Invalid PDF URL:', pdfUrl);
        }
    };

    loadPdf();
}, [pdfUrl]);

  const renderPage = async (pdf, pageNumber) => {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 }); 

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    page.render(renderContext);
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
      renderPage(pdf, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      renderPage(pdf, currentPage - 1);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <canvas ref={canvasRef}></canvas>
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage <= 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage} disabled={currentPage >= numPages}>
            Next Page
          </button>
        </div>
      </div>
      <div style={{ width: '300px', marginLeft: '20px' }}>
        {/* Chat interface goes here */}
        <h2>Chat Interface</h2>
        {/* Add your chat component or HTML here */}
      </div>
    </div>
  );
};

export default PDFViewer;
