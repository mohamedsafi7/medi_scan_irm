export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  medicalHistory: string;
}

export interface ImageAnnotation {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface SimilarCase {
  id: string;
  diagnosis: string;
  data: string;
  similarity?: number;
}

export interface AnalysisResult {
  patientInfo: PatientInfo;
  prediction: 'Positive' | 'Negative';
  confidenceScore: number;
  detailedAnalysis: string;
  recommendations: string[];
  imageAnnotations?: ImageAnnotation[];
  similarCases?: SimilarCase[];
}