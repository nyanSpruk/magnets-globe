"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { countries } from "@/public/countries";
interface CountryFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

export function CountryForm({ onSubmit }: CountryFormProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "code",
      countries.find((c) => c.name === selectedCountry)?.code ?? ""
    );
    formData.append("name", selectedCountry);
    formData.append("imageUrl", imageUrl);
    onSubmit(formData);
    // Reset form
    setSelectedCountry("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Country Code:
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedCountry
                ? countries.find((country) => country.name === selectedCountry)
                    ?.name
                : "Select country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.code}
                      value={country.name}
                      onSelect={(currentValue) => {
                        setSelectedCountry(
                          currentValue === selectedCountry ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCountry === country.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL (optional):
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!selectedCountry}
      >
        Add Country
      </button>
    </form>
  );
}
