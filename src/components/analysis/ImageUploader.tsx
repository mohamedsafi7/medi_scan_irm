import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];

    // Check file type
    if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
      setError('Only JPEG, PNG, and WebP images are supported');
      return;
    }

    // Check file size (5 MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    onImageSelected(file);
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : error
              ? 'border-red-300 bg-red-50'
              : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input {...getInputProps()} />

        {error ? (
          <div className="text-red-500 flex flex-col items-center">
            <AlertCircle size={48} className="mb-2" />
            <p className="font-medium">{error}</p>
            <p className="text-sm mt-2">Please try a different file</p>
          </div>
        ) : isDragActive ? (
          <div className="text-blue-600 flex flex-col items-center">
            <Upload size={48} className="mb-2" />
            <p className="font-medium">Drop the image here</p>
          </div>
        ) : (
          <div className="text-slate-600 flex flex-col items-center">
            <FileImage size={48} className="mb-2" />
            <p className="font-medium">Drag and drop an image here, or click to select</p>
            <p className="text-sm mt-2">Supported formats: JPEG, PNG, WebP (Max: 5MB)</p>
          </div>
        )}
      </div>

      <div className="text-sm text-slate-600">
        <p className="font-medium mb-1">Recommended image types:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>MRI scans</strong> (preferred for this analysis)</li>
          <li>Mammograms</li>
          <li>CT scans</li>
          <li>Histopathology images</li>
          <li>X-rays</li>
        </ul>
        <p className="mt-2 text-blue-600 font-medium">
          Note: This analysis is optimized for breast MRI images
        </p>
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800 font-medium">Important:</p>
          <p className="text-yellow-700">
            The system will validate that your image is a proper medical MRI.
            Non-medical images (like photos of people, objects, etc.) will be rejected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;