import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { PatientInfo } from '../../types/types';

interface PatientInfoFormProps {
  patientInfo: PatientInfo;
  onSubmit: (data: PatientInfo) => void;
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ patientInfo, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientInfo>({
    defaultValues: patientInfo
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none transition-colors ${
              errors.name ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="John Doe"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">
            Age
          </label>
          <input
            id="age"
            type="number"
            className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none transition-colors ${
              errors.age ? 'border-red-500' : 'border-slate-300'
            }`}
            placeholder="42"
            {...register('age', { 
              required: 'Age is required',
              min: { value: 0, message: 'Age must be positive' },
              max: { value: 120, message: 'Age cannot exceed 120' }
            })}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">
          Gender
        </label>
        <select
          id="gender"
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none transition-colors ${
            errors.gender ? 'border-red-500' : 'border-slate-300'
          }`}
          {...register('gender', { required: 'Gender is required' })}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      {/* Medical History */}
      <div>
        <label htmlFor="medicalHistory" className="block text-sm font-medium text-slate-700 mb-1">
          Relevant Medical History (Optional)
        </label>
        <textarea
          id="medicalHistory"
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none transition-colors"
          placeholder="Previous diagnoses, family history of cancer, etc."
          {...register('medicalHistory')}
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          variant="primary"
          className="flex items-center gap-2"
        >
          Continue <ArrowRight size={18} />
        </Button>
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-slate-500 italic mt-4">
        Your information is secure and will only be used for analysis purposes. We do not store or share your personal data.
      </div>
    </form>
  );
};

export default PatientInfoForm;