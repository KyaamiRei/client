import { PageShell } from "@/components/page-shell";
import { useEventById } from "@/hooks/use-event-by-id";
import { cn, DATETIME_LOCAL_INPUT_FORMAT } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useEventsStore } from "@/stores/events-store";
import { format, isValid, parseISO } from "date-fns";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { EventForm } from "./event-form";

type EventEditFormProps = {
  className?: string;
};

export const EventEditForm = ({ className }: EventEditFormProps) => {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const updateEvent = useEventsStore((state) => state.updateEvent);
  const mutationLoading = useEventsStore((state) => state.mutationLoading);
  const eventError = useEventsStore((state) => state.evetnsError);

  const { event, loading, notFound, loadError } = useEventById(id, {
    prefetchJoinedEvents: true,
  });

  if (!id) {
    return <Navigate to="/events" replace />;
  }

  if (loading) {
    return (
      <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
        Загрузка...
      </div>
    );
  }

  if (notFound) {
    return (
      <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
        Событие не найдено
      </div>
    );
  }

  if (loadError || !event) {
    return (
      <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
        Ошибка загрузки события
      </div>
    );
  }

  if (!user || event?.ownerId !== user.id) {
    return (
      <div className={cn("mx-auto w-full max-w-2xl space-y-6", className)}>
        У вас нет прав на редактирование этого события
      </div>
    );
  }

  const startedAtParsed = parseISO(event.startedAt);
  const startedAtFormattedForInput = isValid(startedAtParsed)
    ? format(startedAtParsed, DATETIME_LOCAL_INPUT_FORMAT)
    : "";

  return (
    <EventForm
      key={event.id}
      classname={className}
      title="Редактировать событие"
      subtitle="Измените поля и сохраните"
      backLabel="Назад"
      backTo={`/events/${id}`}
      cancelTo={`/events/${id}`}
      submitLabel="Сохранить"
      submittingLabel="Сохранение..."
      inputValues={{
        title: event.title,
        description: event.description,
        address: event.address,
        capacity: event.capacity,
        startedAt: startedAtFormattedForInput,
      }}
      error={eventError}
      loading={mutationLoading}
      onSubmit={async (values) => {
        await updateEvent(event.id, values);
        navigate(`/events/${id}`, { replace: true });
      }}
    />
  );
};
