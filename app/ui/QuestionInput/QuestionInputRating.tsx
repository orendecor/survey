"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { QuestionInputProps } from "./QuestionInput";

const QuestionInputRating: React.FC<QuestionInputProps> = ({ isEditMode }) => { 
  const [value, setValue] = useState([3]);
  return (
    <div className="w-full max-w-xs space-y-4">
      <Slider
        defaultValue={[3]}
        max={5}
        min={1}
        step={1}
        onValueChange={setValue}
        disabled={isEditMode}
      />
      <div className="flex justify-between px-1">
        {[1, 2, 3, 4, 5].map((number) => (
          <span
            key={number}
            className={`text-sm ${
              number === value[0] ? 'text-primary font-bold' : 'text-muted-foreground'
            }`}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuestionInputRating;
