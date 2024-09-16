"use client"
import { Input } from "@/components/ui/input"
import { QuestionInputProps } from "./QuestionInput.d" 

const QuestionInputText: React.FC<QuestionInputProps> = ({ isEditMode = true }) => { 
  return (
    <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input disabled={isEditMode} placeholder="Answer goes here" />
          </div>
        </div>
  )
}

export default QuestionInputText