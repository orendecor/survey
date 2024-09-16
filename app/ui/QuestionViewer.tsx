"use client";

import { Card, CardContent } from "@/components/ui/card";

import { QuestionType, Question } from "../types";

import QuestionInputRating from "./QuestionInput/QuestionInputRating";
import QuestionInputText from "./QuestionInput/QuestionInputText";
import QuestionInputDate from "./QuestionInput/QuestionInputDate";
import QuestionInputMultipleChoice from "./QuestionInput/QuestionInputMultipleChoice";

interface QuestionViewerProps {
  question: Question;
}

export default function QuestionViewer({ question }: QuestionViewerProps) {
  function renderQuestionInputByType(
    type: QuestionType
  ): import("react").ReactNode {
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <QuestionInputMultipleChoice
            options={question.options}
            isEditMode={false}
            isRadio={false}
          />
        );
      case QuestionType.CHECKBOXES:
        return (
          <QuestionInputMultipleChoice
            options={question.options}
            isEditMode={false}
            isRadio={true}
          />
        );

      case QuestionType.DATE:
        return <QuestionInputDate isEditMode={false} />;
      case QuestionType.RATING:
        return <QuestionInputRating isEditMode={false} />;
      case QuestionType.TEXT:
        return <QuestionInputText isEditMode={false} />;
      default:
        return <QuestionInputText isEditMode={false} />;
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <h3 className="text-base leading-7 text-slate-600 mb-5">
              {question.text}
            </h3>

            {renderQuestionInputByType(question.type)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
