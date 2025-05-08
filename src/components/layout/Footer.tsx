import React from 'react';
import { Activity, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 text-blue-700 mb-3">
              <Activity size={24} />
              <span className="text-lg font-bold">MediScan AI</span>
            </div>
            <p className="text-slate-600 text-sm">
              Advanced AI-powered cancer detection to assist medical professionals and patients.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-slate-800 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.cancer.org/" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  Cancer.org
                </a>
              </li>
              <li>
                <a href="https://www.cancer.gov/" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  National Cancer Institute
                </a>
              </li>
              <li>
                <a href="https://www.who.int/cancer/" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  WHO Cancer Research
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-slate-800 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-blue-600 text-sm transition-colors">
                  Data Usage Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-6 pt-6 text-center">
          <p className="text-slate-600 text-sm flex justify-center items-center gap-1">
            © {currentYear} MediScan AI. Made with <Heart size={14} className="text-red-500" /> for better healthcare.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Disclaimer: This tool is intended for educational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;