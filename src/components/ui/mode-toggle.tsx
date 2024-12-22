'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={() => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        // switch color scheme meta tag
        const colorScheme = document.querySelector('meta[name="color-scheme"]');
        if (colorScheme) {
          colorScheme.setAttribute('content', theme === 'light' ? 'dark' : 'light');
        }
        // also change themeColor
        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
          themeColor.setAttribute('content', theme === 'light' ? '#111111' : '#fff');
        }
      }}
      size="icon"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
