import React from 'react';
import { Info, Shield, Book, HelpCircle, Database } from 'lucide-react';
import ChromaStatus from '../components/ChromaStatus';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h1 className="text-2xl font-bold">About MediScan AI</h1>
          <p className="text-blue-100 mt-1">
            Learn about our mission and technology
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" /> Our Mission
            </h2>
            <p className="text-slate-700 mb-4">
              MediScan AI was created with a clear mission: to harness the power of artificial intelligence to improve cancer detection and diagnosis, potentially saving lives through earlier intervention.
            </p>
            <p className="text-slate-700">
              By providing accessible AI analysis tools, we aim to assist medical professionals and provide patients with additional insights that complement traditional diagnostic methods. We believe that AI can be a powerful ally in healthcare, offering objective analysis that helps identify patterns and indicators that might otherwise be missed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" /> Our Technology
            </h2>
            <p className="text-slate-700 mb-4">
              MediScan AI leverages Google's powerful Gemini AI technology to analyze medical images for potential cancer indicators. Our system has been trained on thousands of anonymized medical images to recognize patterns associated with various types of cancer.
            </p>
            <p className="text-slate-700 mb-4">
              We've enhanced our AI capabilities with a vector database that stores and retrieves similar cancer cases, allowing for more accurate and contextual analysis.
            </p>
            <p className="text-slate-700">
              The analysis process includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-700">
              <li>Advanced image recognition to identify abnormal tissue structures</li>
              <li>Pattern matching against known cancer indicators</li>
              <li>Similarity search against a database of cancer cases</li>
              <li>Confidence scoring based on multiple detection factors</li>
              <li>Detailed reporting with visual highlights of areas of concern</li>
            </ul>

            <ChromaStatus />
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Book className="h-5 w-5 text-blue-600" /> Educational Purpose
            </h2>
            <p className="text-slate-700 mb-4">
              It's important to note that MediScan AI is primarily designed as an educational tool and should not replace professional medical diagnosis. While our AI system can provide valuable insights, it should be used as a supplementary resource alongside traditional medical evaluation by qualified healthcare professionals.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Medical Disclaimer:</strong> The results provided by MediScan AI are not a diagnosis. Always consult with qualified healthcare professionals for proper medical advice, diagnosis, and treatment. Never disregard professional medical advice or delay seeking it because of something you have read or seen on this platform.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-800 mb-1">How accurate is the AI analysis?</h3>
                <p className="text-slate-700">
                  Our AI model has demonstrated promising accuracy in research settings, but it is important to understand that no AI system is perfect. The accuracy varies depending on image quality, cancer type, and stage. This is why all results should be reviewed by medical professionals.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Is my data secure and private?</h3>
                <p className="text-slate-700">
                  Yes, we take data privacy and security very seriously. All images and personal information are encrypted and handled according to strict privacy protocols. We do not store or use your data for purposes beyond providing the analysis you request.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Can I use MediScan AI for self-diagnosis?</h3>
                <p className="text-slate-700">
                  MediScan AI is not intended for self-diagnosis. It is designed as a tool to provide additional insights that should be reviewed and interpreted by qualified healthcare professionals. Never use our platform as a substitute for proper medical care.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;