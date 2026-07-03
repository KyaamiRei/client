import { useAuthStore } from "@/stores/auth-store";
import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { AuthFormCard, AuthFormError } from "./";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const authError = useAuthStore((s) => s.authError);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);

  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError(null);
    const form = e.currentTarget;

    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (password.length < 8) {
      setClientError("Пороль не должен быть короче 8 символов");
      return;
    }

    try {
      await login({ email, password });
      navigate("/events", { replace: true });
    } catch (error) {}
  };

  const topError = authError ?? clientError;
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <AuthFormCard title="Логин" description="Login an account to get started">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <AuthFormError message={topError} />
            <Field>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
                required
                disabled={isAuthLoading}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="login-password">Пароль</FieldLabel>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                disabled={isAuthLoading}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isAuthLoading} className="w-full">
                {isAuthLoading ? "Загрузка..." : "Войти"}
              </Button>
              <FieldDescription className="text-sm text-muted-foreground text-center">
                У вас нет аккаунта?{" "}
                <Link
                  to="/register"
                  className=" underline-offset-4 hover:underline"
                  onClick={() => {
                    useAuthStore.getState().clearError();
                    setClientError(null);
                  }}
                >
                  Зарегистрироваться
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthFormCard>
    </div>
  );
};
