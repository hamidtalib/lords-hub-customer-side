"use client";

import * as React from "react";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export function Tabs({ value, onValueChange, children, className = "" }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = React.useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => onValueChange(value)}
      className={className}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const { value: activeValue } = React.useContext(TabsContext);
  
  if (activeValue !== value) {
    return null;
  }

  return <div className={className}>{children}</div>;
}
