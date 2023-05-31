import React, {useEffect, useState} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

export default function Pdf() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [opacity, setOpacity] = useState<0 | 1>(0);
  useEffect(() => {
    setOpacity(1);
  }, []);

  function onDocumentLoadSuccess({numPages}: {numPages: number}) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div
      className="absolute top-48 left-1/2 max-h-[80vh] w-[70vw] -translate-x-1/2 sm:top-32  md:w-auto"
      style={{
        WebkitOverflowScrolling: 'auto',
        aspectRatio: '1/1.414',
        opacity,
        transition: 'opacity 2s ease-in-out',
      }}>
      <Document
        file={'./sample.pdf'}
        onLoadSuccess={onDocumentLoadSuccess}
        className={'aspect-[1/1.414] max-h-[80vh] overflow-scroll'}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}
