'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { motion, useAnimation } from 'framer-motion';

import { cn } from '@/lib/utils';

// Create a context for the active tab
interface TabContextType {
  activeTab: string | null;
  setActiveTab: (value: string) => void;
}

const TabContext = React.createContext<TabContextType | undefined>(undefined);

// Custom hook to use the tab context
export const useTabContext = () => {
  const context = React.useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabContextProvider');
  }
  return context;
};

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ defaultValue, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState<string | null>(defaultValue || null);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <TabsPrimitive.Root
        ref={ref}
        defaultValue={defaultValue}
        onValueChange={setActiveTab}
        {...props}
      />
    </TabContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex items-center justify-center bg-muted text-muted-foreground relative border-b border-gray-200',
        className
      )}
      {...props}
    >
      {props.children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { activeTab } = useTabContext();

  const isActive = activeTab === props.value;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      className={cn(
        'inline-flex h-10  relative items-center justify-center bg-red whitespace-nowrap px-3 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ',
        isActive ? 'text-black' : 'text-gray-400',
        className
      )}
      {...props}
    >
      {props.children}
      {isActive && (
        <motion.span
          layoutId="tab-bar"
          className="absolute bottom-0 w-full h-[1px] bg-black"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
