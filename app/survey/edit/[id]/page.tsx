import SurveyBuilder from "@/app/ui/SurveyBuilder";

const EditSurvey = ({ params }: { params: { id: string } }) => { // Access params directly
  return <SurveyBuilder surveyId={params.id} />; // Pass id to SurveyBuilder
};

export default EditSurvey;
