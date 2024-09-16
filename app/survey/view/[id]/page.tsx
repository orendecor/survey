import SurveyViewer from '@/app/ui/SurveyViewer'
import React from 'react'

const ViewSurvey = ({ params }: { params: { id: string } }) => { 
  return (
    <SurveyViewer surveyId={params.id} isPreview={true} />
  ); 
};

export default ViewSurvey