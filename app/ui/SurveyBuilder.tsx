"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, EyeIcon, Share } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog"; // Import Dialog component
import { Survey, Question, QuestionType } from "../types";
import QuestionForm from "./QuestionForm";
import { BarsArrowDownIcon } from "@heroicons/react/24/solid";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SurveyBuilder({ surveyId }: { surveyId: string }) {
  const router = useRouter();
  const pathname = usePathname();
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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

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

  useEffect(() => {
    const updateUrlParam = () => {
      if (!isFirstMonted) {
        return false;
      }
      // Serialize survey data to JSON and encode it for URL usage
      const encodedSurvey = encodeURIComponent(JSON.stringify(survey));

      // Set the query parameter
      router.push(`${pathname}?survey=${encodedSurvey}`, { scroll: false });
    };

    updateUrlParam();
  }, [survey, pathname, router, isFirstMonted]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      type: QuestionType.TEXT,
    };
    setSurvey({
      ...survey,
      questions: [...survey.questions, newQuestion],
    });
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setSurvey({
      ...survey,
      questions: survey.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    });
  };

  const deleteQuestion = (id: string) => {
    setSurvey({
      ...survey,
      questions: survey.questions.filter((q) => q.id !== id),
    });
  };

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollToQuestion = (index: number) => {
    questionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(
      0,
      survey.questions.length
    );
  }, [survey.questions]);
  if (!isFirstMonted) {
    return "Loading...";
  }

  const shareLink = `${window.location.origin}${pathname.replace(
    /edit/,
    "take"
  )}?survey=${encodeURIComponent(JSON.stringify(survey))}`;

  // Function to navigate to the preview page
  const gotoPreview = () => {
    const previewLink = `${window.location.origin}${pathname.replace(
      /edit/,
      "view"
    )}?survey=${encodeURIComponent(JSON.stringify(survey))}`;
    router.push(previewLink);
  };

  // Function to handle dialog open
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <div className="flex">
          <Input
            className="text-2xl font-bold mb-4 border-0 border-b-2 border-transparent focus:border-b-2 transition-[margin-bottom] focus:border-black rounded-none focus:mb-10 focus:ring-0 focus-visible:ring-0 focus:shadow-none"
            placeholder="Untitled survey"
            value={survey.title}
            onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
          />
          <div className="flex ml-4 gap-3">
            <Button
              onClick={gotoPreview}
              variant="outline"
              className="flex items-center space-x-2 transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground"
            >
              <EyeIcon className="h-5 w-5" />
              <span>Preview</span>
            </Button>
            <Button
              onClick={openDialog}
              className="flex items-center space-x-2 transition-all duration-200 ease-in-out "
            >
              <Share className="h-5 w-5" />
              <span>Share Survey</span>
            </Button>
          </div>
        </div>
        <Textarea
          className="w-full"
          placeholder="Survey description"
          value={survey.description}
          onChange={(e) =>
            setSurvey({ ...survey, description: e.target.value })
          }
        />
      </header>

      <div className="flex">
        <main className="flex-grow mr-4 bg-muted p-10">
          {survey.questions.map((question, index) => (
            <div
              className=""
              key={question.id}
              ref={(el) => {
                if (el) questionRefs.current[index] = el;
              }}
            >
              <div className="bg-muted pb-4 ">
                <QuestionForm
                  question={question}
                  onQuestionChange={updateQuestion}
                  onDeleteQuestion={() => deleteQuestion(question.id)}
                />
              </div>
            </div>
          ))}
          <Button onClick={addQuestion} className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </main>

        <aside className="w-full lg:w-64 mt-4 lg:mt-0">
          <div className="bg-muted p-4 rounded sticky top-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <BarsArrowDownIcon width={18} height={18} />
              Jump to
            </h2>
            <ScrollArea>
              {survey.questions.map((question, index) => (
                <Button
                  key={question.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToQuestion(index)}
                  className="w-full justify-start text-left mb-1 px-2 py-1 h-auto truncate"
                >
                  <span className="mr-2">{index + 1}.</span>
                  <span className="truncate max-w-[80%]">
                    {question.text || `Question ${index + 1}`}
                  </span>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </aside>
      </div>

      {/* Dialog for sharing the link */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Share this Survey</DialogTitle>
          <DialogDescription>
            Copy the link below to share your survey:
          </DialogDescription>
          <input
            type="text"
            value={shareLink}
            readOnly
            className="w-full border p-2"
          />
          <Button onClick={closeDialog}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
