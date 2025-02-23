"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, value, onValueChange, min, max, step, ...props }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        value={value?.[0] ?? 0}
        onChange={(e) => onValueChange?.([+e.target.value])}
        min={min}
        max={max}
        step={step}
        className={cn(
          "w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer",
          "accent-primary",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
          "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0",
          className
        )}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
