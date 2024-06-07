"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo({ setFormData, formData }: any) {
  const [date, setDate] = React.useState<Date>();

  const addDays = (currentDate: any, days: any) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    return newDate;
  };

  const thirtyDaysLater = addDays(new Date(), 30);
  React.useEffect(() => {
    setFormData({ ...formData, ["date"]: date });
  }, [date]);

  return (
    <Popover>
      <label
        htmlFor={"date"}
        className="block font-semibold text-gray-700 mb-1"
      >
        Working Date
      </label>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left mb-8 font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          fromDate={thirtyDaysLater}
        />
      </PopoverContent>
    </Popover>
  );
}
