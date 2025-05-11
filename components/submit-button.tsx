"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  formAction,
  pendingText,
  children,
  className,
  ...props
}: {
  formAction?: (formData: FormData) => Promise<void>;
  pendingText: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      className={cn(className)}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      formAction={formAction}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
