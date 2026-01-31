'use client';

import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { searchLocations, POPULAR_SEARCHES } from '@/lib/constants/locations';
import { cn } from '@/lib/utils/cn';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string, city?: string, neighborhood?: string) => void;
  placeholder?: string;
  className?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Enter city or neighborhood",
  className,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = debouncedValue
    ? searchLocations(debouncedValue).slice(0, 8)
    : [];

  const showPopular = isOpen && !debouncedValue;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (display: string, city?: string, neighborhood?: string) => {
    setInputValue(display);
    onChange(display, city, neighborhood);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (!newValue) {
      onChange('');
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-4 py-4 text-lg",
            "bg-white dark:bg-stone-800",
            "border-2 border-stone-200 dark:border-stone-700",
            "rounded-xl",
            "text-stone-900 dark:text-stone-100",
            "placeholder:text-stone-400 dark:placeholder:text-stone-500",
            "focus:outline-none focus:border-primary-500 dark:focus:border-primary-400",
            "transition-colors duration-200"
          )}
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue('');
              onChange('');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {(suggestions.length > 0 || showPopular) && (
        <div className={cn(
          "absolute z-50 w-full mt-2",
          "bg-white dark:bg-stone-800",
          "border border-stone-200 dark:border-stone-700",
          "rounded-xl shadow-lg",
          "max-h-80 overflow-y-auto"
        )}>
          {showPopular && (
            <>
              <div className="px-4 py-2 text-sm font-medium text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-700">
                Popular Searches
              </div>
              {POPULAR_SEARCHES.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(search.label, search.city, search.neighborhood)}
                  className={cn(
                    "w-full px-4 py-3 text-left",
                    "flex items-center gap-3",
                    "text-stone-700 dark:text-stone-300",
                    "hover:bg-stone-50 dark:hover:bg-stone-700",
                    "transition-colors"
                  )}
                >
                  <svg className="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{search.label}</span>
                </button>
              ))}
            </>
          )}

          {suggestions.length > 0 && (
            <>
              {!showPopular && (
                <div className="px-4 py-2 text-sm font-medium text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-700">
                  Locations
                </div>
              )}
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(suggestion.display, suggestion.city, suggestion.neighborhood)}
                  className={cn(
                    "w-full px-4 py-3 text-left",
                    "flex items-center gap-3",
                    "text-stone-700 dark:text-stone-300",
                    "hover:bg-stone-50 dark:hover:bg-stone-700",
                    "transition-colors"
                  )}
                >
                  <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>
                    {suggestion.neighborhood ? (
                      <>
                        <span className="font-medium">{suggestion.neighborhood}</span>
                        <span className="text-stone-400">, {suggestion.city}</span>
                      </>
                    ) : (
                      <span className="font-medium">{suggestion.city}</span>
                    )}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
