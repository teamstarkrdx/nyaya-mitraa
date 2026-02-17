export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface LegalTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface VerificationResult {
  status: 'idle' | 'analyzing' | 'genuine' | 'suspicious' | 'error';
  confidence?: number;
  reasoning?: string;
  recommendation?: string;
}
