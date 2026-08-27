export type QuestionType = 'select' | 'multiselect' | 'boolean';

export type QuestionAnswerValue = string | boolean | number | (string | boolean | number)[];

export interface FormQuestionOption {
  label: string;
  value: string | boolean | number;
  subtitle?: string;
  badge?: string;
}

export interface FormQuestion {
  id: string;
  title: string;
  type: QuestionType;
  context: string;
  required?: boolean;
  options?: FormQuestionOption[];
  defaultValue?: QuestionAnswerValue;
}

export interface DiscoveryResponse {
  preset_id?: string;
  preset_name?: string;
  suggested_form_questions: FormQuestion[];
}

export interface PersonaChip {
  id: string;
  label: string;
  answers: Record<string, QuestionAnswerValue>;
}
