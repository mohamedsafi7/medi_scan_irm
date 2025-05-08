import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, FileText, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                AI-Powered Cancer Detection Analysis
              </h1>
              <p className="text-xl text-blue-100">
                Upload medical images for instant AI analysis and get detailed insights to help with early detection and diagnosis.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="white" 
                  size="lg"
                  onClick={() => navigate('/analysis')}
                  className="flex items-center justify-center gap-2"
                >
                  Start Analysis <ArrowRight size={18} />
                </Button>
                <Button 
                  variant="outline-white" 
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="flex items-center justify-center"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg" 
                alt="Medical professional using AI technology" 
                className="rounded-lg shadow-xl max-w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">How It Works</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Our AI-powered platform makes cancer detection analysis simple and accessible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Upload Image</h3>
              <p className="text-slate-600">
                Upload medical images in common formats (JPEG, PNG) for analysis by our advanced AI system.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">AI Analysis</h3>
              <p className="text-slate-600">
                Our Gemini AI technology analyzes the images to identify potential cancer indicators with high accuracy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Detailed Results</h3>
              <p className="text-slate-600">
                Receive comprehensive, user-friendly reports explaining the analysis and potential next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Ready to get started?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Start using our AI-powered cancer detection tool today. Early detection saves lives.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/analysis')}
            className="flex items-center gap-2 mx-auto"
          >
            Begin Analysis <ArrowRight size={18} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;