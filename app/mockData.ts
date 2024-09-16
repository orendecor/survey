import { Survey, QuestionType } from './types';

// Mock AnswerOptions for a multiple-choice question
const mockAnswerOptions = [
  { id: 'option-1', text: 'Yes' },
  { id: 'option-2', text: 'No' },
  { id: 'option-3', text: 'Maybe' },
];

// Mock Questions
const mockQuestions = [
  {
    id: 'question-1',
    text: 'What is your favorite color?',
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: 'option-1', text: 'Red' },
      { id: 'option-2', text: 'Blue' },
      { id: 'option-3', text: 'Green' },
      { id: 'option-4', text: 'Yellow' },
    ],
  },
  {
    id: 'question-2',
    text: 'Describe your ideal vacation.',
    type: QuestionType.TEXT,
  },
  {
    id: 'question-3',
    text: 'Do you like working remotely?',
    type: QuestionType.MULTIPLE_CHOICE,
    options: mockAnswerOptions,
  },
];

// Mock Survey Data
export const mockSurvey: Survey = {
  id: 'survey-1',
  title: 'Customer Feedback Survey',
  description: 'We would love to hear your thoughts on our product and services!',
  questions: mockQuestions,
};

// Mock SurveyResponse
export const mockSurveyResponse = {
  surveyId: 'survey-1',
  responses: [
    { questionId: 'question-1', answerId: 'option-2' }, // Answered "Blue"
    { questionId: 'question-2', textAnswer: 'A sunny beach with clear water' },
    { questionId: 'question-3', answerId: 'option-1' }, // Answered "Yes"
  ],
};