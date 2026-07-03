type AuthFormErrorProps = {
  message: string | null | undefined;
};
export const AuthFormError = ({ message }: AuthFormErrorProps) => {
  if (!message) return null;
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
};
