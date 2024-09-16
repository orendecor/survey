import SurveyViewer from '@/app/ui/SurveyViewer'
import React from 'react'

const TakeSurvey = ({ params }: { params: { id: string } }) => { 
  return (
    <SurveyViewer surveyId={params.id} />
  ); 
};

export default TakeSurvey