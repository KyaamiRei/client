import { cn } from "@/lib/utils";
import React from "react";

type ErrorRetryBlockProps = {
  message: string;
  classname?: string;
};

export const ErrorRetryBlock = ({
  message,
  classname,
}: ErrorRetryBlockProps) => {
  return (
    <div className={cn("flex flex-col gap-2", classname)}>
      <p className="text-sm text-destructive">{message}</p>
    </div>
  );
};
