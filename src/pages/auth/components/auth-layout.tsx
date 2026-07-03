import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 p-6 bg-background min-h-svh w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
