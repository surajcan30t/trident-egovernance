import React, { useState, useEffect } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"

const ComboboxInput = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select or enter value...",
  emptyMessage = "No matching value found."
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
  emptyMessage?: string
}) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value || "")

  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value || "")
  }, [value])

  // Filter options based on input
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  )

  // Add current input to options if it's not empty and not already included
  const allOptions = 
    inputValue && !filteredOptions.includes(inputValue) 
      ? [...filteredOptions, inputValue]
      : filteredOptions

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">{value || "Select value..."}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder={placeholder}
            value={inputValue}
            onValueChange={(text) => {
              setInputValue(text)
              onChange(text)
            }}
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {allOptions.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => {
                  onChange(option)
                  setInputValue(option)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxInput