"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

import { QuestionType, AnswerOption, Question } from "../types";
import { TrashIcon } from "@heroicons/react/24/solid";
import QuestionInputMultipleChoice from "./QuestionInput/QuestionInputMultipleChoice";
import QuestionInputRating from "./QuestionInput/QuestionInputRating";
import QuestionInputText from "./QuestionInput/QuestionInputText";
import QuestionInputDate from "./QuestionInput/QuestionInputDate";

interface QuestionFormProps {
  question: Question;
  onQuestionChange: (updatedQuestion: Question) => void;
  onDeleteQuestion: () => void; // Add delete prop
}

export default function QuestionForm({
  question,
  onQuestionChange,
  onDeleteQuestion, // Destructure delete prop
}: QuestionFormProps) {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  useEffect(() => {
    if (
      localQuestion.type === QuestionType.MULTIPLE_CHOICE ||
      localQuestion.type === QuestionType.CHECKBOXES &&
      (!localQuestion.options || localQuestion.options.length === 0)
    ) {
      const defaultOptions: AnswerOption[] = Array(4)
        .fill(null)
        .map((_, index) => ({
          id: `${Date.now().toString()}-option-${index + 1}`,
          text: `Option ${index + 1}`,
        }));
      updateQuestion({ options: defaultOptions });
    }
  }, [localQuestion.type]);

  const updateQuestion = (updates: Partial<Question>) => {
    const updatedQuestion = { ...localQuestion, ...updates };
    setLocalQuestion(updatedQuestion);
    onQuestionChange(updatedQuestion);
  };

  const addOption = () => {
    const newOption: AnswerOption = {
      id: Date.now().toString(),
      text: `Option ${(localQuestion.options?.length || 0) + 1}`,
    };
    updateQuestion({ options: [...(localQuestion.options || []), newOption] });
  };

  const updateOption = (optionId: string, text: string) => {
    const updatedOptions = localQuestion.options?.map((option) =>
      option.id === optionId ? { ...option, text } : option
    );
    updateQuestion({ options: updatedOptions });
  };

  const removeOption = (optionId: string) => {
    const updatedOptions = localQuestion.options?.filter(
      (option) => option.id !== optionId
    );
    updateQuestion({ options: updatedOptions });
  };

  const formatQuestionType = (type: string) => {
    return type
      .replace(/-/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  function renderQuestionInputByType(
    type: QuestionType
  ): import("react").ReactNode {
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE:
        case QuestionType.CHECKBOXES:
        // Render multiple choice input
        return <QuestionInputMultipleChoice options={localQuestion.options} updateOption={updateOption} addOption={addOption} removeOption={removeOption} />;
      
      case QuestionType.DATE:
        // Render multiple choice input
        return <QuestionInputDate />;
      case QuestionType.RATING:
        // Render multiple choice input
        return <QuestionInputRating />;
      case QuestionType.TEXT:
        // Render multiple choice input
        return <QuestionInputText />;
      default:
        return <QuestionInputText />
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              className="text-lg font-semibold mb-6"
              value={localQuestion.text}
              onChange={(e) => updateQuestion({ text: e.target.value })}
              placeholder="Enter question text"
            />

            {renderQuestionInputByType(localQuestion.type)}
          </div>
          <div className="w-full md:w-48">
            <Select
              value={localQuestion.type}
              onValueChange={(value: QuestionType) =>
                updateQuestion({ type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(QuestionType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatQuestionType(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={onDeleteQuestion} size="sm">
            {" "}
            <TrashIcon width={18} height={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
