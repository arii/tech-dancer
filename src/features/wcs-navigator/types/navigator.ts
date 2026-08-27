export type QuestionType = 'select' | 'multiselect' | 'boolean';

export interface FormQuestionOption {
  label: string;
  value: string | boolean | number;
}

export interface FormQuestion {
  id: string;
  title: string;
  type: QuestionType;
  context: string;
  required?: boolean;
  options?: FormQuestionOption[];
  defaultValue?: any;
}

export interface DiscoveryResponse {
  preset_id?: string;
  preset_name?: string;
  suggested_form_questions: FormQuestion[];
}

export interface PersonaChip {
  id: string;
  label: string;
  answers: Record<string, any>;
}
