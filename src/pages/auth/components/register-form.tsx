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

export const RegisterForm = () => {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const authError = useAuthStore((s) => s.authError);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);

  const [clientError, setClientError] = useState<string | null>(null);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClientError(null);
    const form = e.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    ).trim();

    if (password !== confirmPassword) {
      setClientError("Пароли не совпадают");
      return;
    }

    if (password.length < 8) {
      setClientError("Пороль не должен быть короче 8 символов");
      return;
    }

    if (name.length < 3) {
      setClientError("Имя не должен быть короче 3 символов");
      return;
    }

    try {
      await register({ email, password, name });
      navigate("/events", { replace: true });
    } catch (error) {}
  };

  const topError = authError ?? clientError;
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <AuthFormCard
        title="Register"
        description="Create an account to get started"
      >
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <AuthFormError message={topError} />
            <Field>
              <FieldLabel htmlFor="register-name">Имя пользователя</FieldLabel>
              <Input
                id="register-name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="username"
                required
                minLength={3}
                maxLength={100}
                disabled={isAuthLoading}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="register-email">Email</FieldLabel>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
                required
                disabled={isAuthLoading}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="register-password">Пароль</FieldLabel>
              <Input
                id="register-password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="new-password"
                required
                disabled={isAuthLoading}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="register-confirm-password">
                Подтверждение пароля
              </FieldLabel>
              <Input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="********"
                autoComplete="new-password"
                required
                disabled={isAuthLoading}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={isAuthLoading} className="w-full">
                {isAuthLoading ? "Загрузка..." : "Зарегистрироваться"}
              </Button>
              <FieldDescription className="text-sm text-muted-foreground text-center">
                Уже есть аккаунт?{" "}
                <Link
                  to="/login"
                  className=" underline-offset-4 hover:underline"
                  onClick={() => {
                    useAuthStore.getState().clearError();
                    setClientError(null);
                  }}
                >
                  Войти
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthFormCard>
    </div>
  );
};
