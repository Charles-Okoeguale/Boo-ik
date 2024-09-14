import React, { useState, useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions, version as pdfjsVersion } from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css'; 
import { useLocation } from 'react-router-dom';

// Set the worker source
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdf, setPdf] = useState(null);
  const canvasRef = useRef(null);
  const location = useLocation();
  const { pdfUrl } = location.state

  // Load PDF document
  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = getDocument(pdfUrl);
      const loadedPdf = await loadingTask.promise;
      setPdf(loadedPdf);
      setNumPages(loadedPdf.numPages);

      // Render first page
      renderPage(loadedPdf, currentPage);
    };

    loadPdf();
  }, [pdfUrl]);

  // Function to render a page on the canvas
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

  // Navigate between pages
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
    <div>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage <= 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage >= numPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
