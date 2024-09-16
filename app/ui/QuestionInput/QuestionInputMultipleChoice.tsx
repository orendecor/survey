"use client";

import { AnswerOption } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { QuestionInputProps } from "./QuestionInput.d";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionInputMultipleChoiceProps extends QuestionInputProps {
  updateOption?: (optionId: string, text: string) => void;
  addOption?: () => void;
  removeOption?: (optionId: string) => void;
  options?: AnswerOption[];
  isRadio?: boolean
}

const QuestionInputMultipleChoice: React.FC<
  QuestionInputMultipleChoiceProps
> = ({ updateOption, addOption, removeOption, options, isEditMode = true, isRadio = true }) => {
  if (isEditMode) {
    return (
      <div className="space-y-2 mt-4">
        {options?.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Input
              value={option.text}
              onChange={(e) => updateOption?.(option.id, e.target.value)}
              placeholder="Enter option text"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption?.(option.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={addOption} variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Option
        </Button>
      </div>
    );
  } else {
    return (
      <div className="space-y-2 mt-4">
        {isRadio ?
        options?.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox id={option.id} />
            <Label htmlFor={option.id}>{option.text}</Label>
          </div>
        )):
        (<RadioGroup>
          {
          options?.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.text} id={option.id} />
              <Label htmlFor={option.text}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>)
        }
      </div>
    );
  }
};

export default QuestionInputMultipleChoice;
