import React from 'react'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function SchoolYear() {
  return (
    <div>
       <Select name="level" required>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select your current level/year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Year 1 / Freshman</SelectItem>
                    <SelectItem value="2">Year 2 / Sophomore</SelectItem>
                    <SelectItem value="3">Year 3 / Junior</SelectItem>
                    <SelectItem value="4">Year 4 / Senior</SelectItem>
                    <SelectItem value="5">Year 5</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
    </div>
  )
}
