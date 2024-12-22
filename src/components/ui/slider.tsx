'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  min?: number;
  max?: number;
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, min, max, value, onValueChange, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    min={min}
    max={max}
    value={value}
    onValueChange={onValueChange}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[29px]  w-full grow overflow-hidden rounded-full bg-surfaceSecondary border border-secondaryBorder">
      <SliderPrimitive.Range className="absolute h-full slider-gradient border-[3px] border-white rounded-l-2xl" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block cursor-grab bg-white border border-secondaryBorder h-9 w-9 rounded-full  bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
