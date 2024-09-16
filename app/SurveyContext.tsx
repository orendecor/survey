import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Question } from './types';

export type SurveyState = {
  questions: Question[];
};

type SurveyAction =
  | { type: 'UPDATE_ANSWER'; questionId: string; answer: string }
  | { type: 'SUBMIT_SURVEY' }
  | { type: 'SET_SURVEY'; survey: SurveyState };

type SurveyContextType = {
  state: SurveyState;
  dispatch: React.Dispatch<SurveyAction>;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

const surveyReducer = (state: SurveyState, action: SurveyAction): SurveyState => {
  switch (action.type) {
    case 'UPDATE_ANSWER':
      return {
        ...state,
        questions: state.questions.map(q =>
          q.id === action.questionId ? { ...q, answer: action.answer } : q
        ),
      };
    case 'SUBMIT_SURVEY':
      console.log('Survey submitted:', state);
      return state;
    case 'SET_SURVEY':
      return action.survey;
    default:
      return state;
  }
};

export const SurveyProvider: React.FC<{ children: ReactNode; initialState: SurveyState }> = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  return (
    <SurveyContext.Provider value={{ state, dispatch }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};