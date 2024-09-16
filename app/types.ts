// Enum for question types
export enum QuestionType {
    TEXT = 'text',
    MULTIPLE_CHOICE = 'multiple-choice',
    RATING = 'rating',
    CHECKBOXES = 'checkboxes',
    DATE = 'date',
}

// Interface for an answer option
export interface AnswerOption {
    id: string;
    text: string;
}

// Interface for a question
export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: AnswerOption[]; // For multiple choice questions
}

// Interface for a survey
export interface Survey {
    id: string;
    title?: string;
    description?: string;
    questions: Question[];
}

// Interface for a survey response (optional, if you need to handle responses)
export interface SurveyResponse {
    surveyId: string;
    responses: {
        questionId: string;
        answerId?: string; // Used for multiple choice questions
        textAnswer?: string; // Used for text questions
    }[];
}
