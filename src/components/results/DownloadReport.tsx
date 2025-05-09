import React, { useRef } from 'react';
import { Download, FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { AnalysisResult } from '../../types/types';
import AnalysisChart from './AnalysisChart';
import RiskGaugeChart from './RiskGaugeChart';
import TumorMetricsChart from './TumorMetricsChart';
import TemporalAnalysisChart from './TemporalAnalysisChart';
import KeyMetricsComparisonChart from './KeyMetricsComparisonChart';
import CaseComparisonChart from './CaseComparisonChart';

interface DownloadReportProps {
  results: AnalysisResult;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ results }) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      // Show loading toast
      const loadingToast = toast.loading('Generating enhanced report with diagrams...');

      const reportElement = reportRef.current;

      // Make sure the element is visible for capturing
      const originalDisplay = reportElement.style.display;
      reportElement.style.display = 'block';

      // Capture the report as an image with higher quality settings
      const canvas = await html2canvas(reportElement, {
        scale: 3, // Higher scale for better quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        imageTimeout: 15000, // Longer timeout for complex charts
        onclone: (clonedDoc) => {
          // Ensure all charts are properly rendered in the clone
          const clonedElement = clonedDoc.body.querySelector('[ref="reportRef"]');
          if (clonedElement) {
            clonedElement.style.width = '1200px'; // Fixed width for better rendering
            clonedElement.style.margin = '0 auto';
          }
        }
      });

      // Create PDF with better quality settings
      const imgData = canvas.toDataURL('image/png', 1.0); // Max quality
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Calculate dimensions to fit the image properly on the PDF
      const pdfWidth = 210; // A4 width in mm (210mm)
      const pdfHeight = 297; // A4 height in mm (297mm)
      const imgWidth = pdfWidth - 20; // Add 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If the image is taller than the page, split it across multiple pages
      if (imgHeight > pdfHeight - 20) { // 10mm margin top and bottom
        // Calculate how many pages we need
        const pageCount = Math.ceil(imgHeight / (pdfHeight - 20));

        // For each page
        for (let i = 0; i < pageCount; i++) {
          // Add a new page if we're not on the first page
          if (i > 0) {
            pdf.addPage();
          }

          // Calculate the portion of the image to show on this page
          const sourceY = (canvas.height / pageCount) * i;
          const sourceHeight = canvas.height / pageCount;

          // Add the image portion to the PDF
          pdf.addImage(
            imgData,
            'PNG',
            10, // 10mm margin from left
            10, // 10mm margin from top
            imgWidth,
            imgHeight / pageCount,
            `page-${i}`, // Unique reference for each page
            'FAST',
            0,
            sourceY / canvas.height * imgHeight,
            0,
            sourceHeight / canvas.height * imgHeight
          );
        }
      } else {
        // Image fits on one page
        pdf.addImage(
          imgData,
          'PNG',
          10, // 10mm margin from left
          10, // 10mm margin from top
          imgWidth,
          imgHeight
        );
      }

      // Add metadata to the PDF
      pdf.setProperties({
        title: `MediScan AI Report for ${results.patientInfo.name}`,
        subject: 'Cancer Detection Analysis',
        author: 'MediScan AI',
        keywords: 'cancer, detection, analysis, AI, medical',
        creator: 'MediScan AI Application'
      });

      // Save the PDF with a descriptive filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
      const filename = `MediScan_Report_${results.patientInfo.name.replace(/\s+/g, '_')}_${timestamp}.pdf`;
      pdf.save(filename);

      // Restore original display style
      reportElement.style.display = originalDisplay;

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Enhanced report with diagrams downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FileDown size={18} />
        Download Enhanced Report with Diagrams
      </button>

      {/* Hidden report template that will be captured for PDF */}
      <div
        ref={reportRef}
        className="report-template"
        style={{ display: 'none', padding: '20px', maxWidth: '800px', margin: '0 auto' }}
      >
        <div className="report-header" style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', color: '#1e40af', marginBottom: '5px' }}>MediScan AI Analysis Report</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="patient-info" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#334155' }}>Patient Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Name</p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{results.patientInfo.name}</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Age</p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{results.patientInfo.age}</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Gender</p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{results.patientInfo.gender}</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>Medical History</p>
              <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{results.patientInfo.medicalHistory || 'None provided'}</p>
            </div>
          </div>
        </div>

        <div className="analysis-result" style={{ marginBottom: '20px', padding: '15px', backgroundColor: results.prediction === 'Positive' ? '#fee2e2' : '#dcfce7', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#334155' }}>Analysis Result</h2>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: results.prediction === 'Positive' ? '#dc2626' : '#16a34a' }}>
            {results.prediction} (Confidence: {Math.round(results.confidenceScore * 100)}%)
          </p>
        </div>

        {/* Key Comparison Charts Section */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Key Metrics Comparison
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <KeyMetricsComparisonChart results={results} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <CaseComparisonChart results={results} />
          </div>
        </div>

        {/* Additional Visualizations */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
            Additional Visualizations
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <RiskGaugeChart results={results} />
            </div>
            <div>
              <TumorMetricsChart results={results} />
            </div>
          </div>

          <div>
            <TemporalAnalysisChart results={results} />
          </div>
        </div>

        <div className="detailed-analysis" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#334155' }}>Detailed Analysis</h2>
          <p style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{results.detailedAnalysis}</p>
        </div>

        <div className="footer" style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '15px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
          <p>This report was generated by MediScan AI for educational purposes only.</p>
          <p>It should not be used as a substitute for professional medical advice.</p>
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
