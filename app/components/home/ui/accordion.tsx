import React from 'react';

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & { type?: 'single' | 'multiple'; collapsible?: boolean };
type ItemProps = React.HTMLAttributes<HTMLDivElement> & { value?: string };

export const Accordion: React.FC<AccordionProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const AccordionItem: React.FC<ItemProps> = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const AccordionTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

export const AccordionContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);
