"use client";

import { useState, useEffect } from "react";

import { Survey } from "../types";
import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionViewer from "./QuestionViewer";

export default function SurveyViewer({
  surveyId,
  isPreview = false,
}: {
  surveyId: string;
  isPreview?: boolean;
}) {
  const searchParams = useSearchParams();

  const emptySurvey: Survey = {
    id: surveyId,
    title: "",
    description: "",
    questions: [],
  };
  const [survey, setSurvey] = useState<Survey>(emptySurvey);
  //   const [survey, setSurvey] = useState<Survey>(mockSurvey);
  const [isFirstMonted, setIsFirstMonted] = useState<boolean>(false);

  useEffect(() => {
    const surveyParam = searchParams.get("survey");

    if (surveyParam) {
      try {
        const decodedSurvey = JSON.parse(decodeURIComponent(surveyParam));
        setSurvey(decodedSurvey);
      } catch (error) {
        console.error("Error parsing survey data from URL:", error);
      }
    }
    setIsFirstMonted(true);
  }, [searchParams]);

  if (!isFirstMonted) {
    return "Loading...";
  }
  return (
    
    <div className="container mx-auto p-4">
      {isPreview && (
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-primary hover:text-primary hover:bg-primary/10 transition-all duration-200 ease-in-out"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back to edit mode</span>
        </Button>
      )}
      <header className="mb-8">
        <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]">
          {survey.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {survey.description}
        </p>
      </header>

      <div className="flex">
        <main className="flex-grow mr-4 bg-muted p-10">
          {survey.questions.map((question) => (
            <div className="" key={question.id}>
              <div className="bg-muted pb-4 ">
                <QuestionViewer question={question} />
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
