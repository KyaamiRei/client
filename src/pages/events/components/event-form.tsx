import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn, DATETIME_LOCAL_INPUT_FORMAT } from "@/lib/utils";
import type { CreateEventRequest } from "@/shared/api/types";
import { formatISO, isValid, parse } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type EventFormValues = CreateEventRequest;

type EventFormProps = {
  classname?: string;
  title: string;
  subtitle: string;
  backTo: string;
  backLabel: string;
  cancelTo: string;
  submitLabel: string;
  submittingLabel: string;
  inputValues?: EventFormValues;
  error?: string | null;
  loading: boolean;
  onSubmit: (values: EventFormValues) => Promise<void>;
};

export const EventForm = ({
  classname,
  title,
  subtitle,
  backTo,
  backLabel,
  cancelTo,
  submitLabel,
  submittingLabel,
  inputValues,
  error,
  loading,
  onSubmit,
}: EventFormProps) => {
  const navigate = useNavigate();
  const [capacity, setCapacity] = useState(inputValues?.capacity ?? 50);
  const [clientError, setClientError] = useState<string | null>(null);

  const topError = clientError ?? error;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const startedAtRaw = String(formData.get("startedAt") ?? "");

    const startedAtParsed = parse(
      startedAtRaw,
      DATETIME_LOCAL_INPUT_FORMAT,
      new Date(),
    );

    const startedAt = isValid(startedAtParsed)
      ? formatISO(startedAtParsed)
      : null;

    if (!startedAt) {
      setClientError("Укажите конретную дату");
      return;
    }

    await onSubmit({
      title,
      description,
      address,
      startedAt,
      capacity,
    });
  };

  return (
    <div className={cn("mx-auto w-full max-w-2xl space-y-6", classname)}>
      <div className="space-y-1">
        <Button variant="ghost" size="lg" asChild>
          <Link to={backTo}>
            <ArrowLeft className="size-4" />
            {backLabel}
          </Link>
        </Button>

        <h1 className="font-heading text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {topError && <p className="text-sm text-destructive">{topError}</p>}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Название</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  defaultValue={inputValues?.title}
                  placeholder="До 200 символос"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Описание</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={inputValues?.description}
                  placeholder="Описание события"
                  rows={5}
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="startedAt">Дата начала</FieldLabel>
                <Input
                  id="startedAt"
                  name="startedAt"
                  defaultValue={inputValues?.startedAt}
                  type="datetime-local"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="address">Адрес</FieldLabel>
                <Input
                  id="address"
                  name="address"
                  defaultValue={inputValues?.address}
                  placeholder="Улица, дом, город"
                  required
                  disabled={loading}
                />
              </Field>
              <Field>
                <div className="flex items-center justify-between gap-4">
                  <FieldLabel
                    htmlFor="capacity-slider"
                    className="inline-flex items-center gap-2"
                  >
                    Вместимость
                  </FieldLabel>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {capacity}
                  </span>
                </div>
                <Slider
                  id="capacity-slider"
                  value={[capacity]}
                  onValueChange={(value) => setCapacity(value[0] ?? 1)}
                  min={1}
                  max={100}
                  step={1}
                  disabled={loading}
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className=" justify-end gap-2 border-t">
            <Button
              variant="ghost"
              type="button"
              onClick={() => navigate(cancelTo)}
              disabled={loading}
            >
              {backLabel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? submittingLabel : submitLabel}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
