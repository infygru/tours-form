import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectScrollable({ optios, setFormData, formData }: any) {
  return (
    <Select
      name="package"
      onValueChange={(e) => {
        setFormData({ ...formData, ["package"]: e });
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Package" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {optios.map((option: any) => (
            <SelectItem key={option.package} value={option.package}>
              {option.package}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
