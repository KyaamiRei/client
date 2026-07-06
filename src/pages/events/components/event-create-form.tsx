import { useEventsStore } from "@/stores/events-store";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EventForm } from "./event-form";

type EventCreateFormProps = {
  classname?: string;
};

export const EventCreateForm = ({ classname }: EventCreateFormProps) => {
  const navigate = useNavigate();
  const createEvent = useEventsStore((state) => state.createEvent);
  const mutationLoading = useEventsStore((state) => state.mutationLoading);
  const evetnsError = useEventsStore((state) => state.evetnsError);

  return (
    <EventForm
      classname={classname}
      title="Создание события"
      subtitle="Заполните форму ниже, чтобы создать новое событие"
      backTo="/events"
      backLabel="Вернуться к списку"
      cancelTo="/events"
      submitLabel="Создать событие"
      submittingLabel="Создаю..."
      onSubmit={async (values) => {
        const event = await createEvent(values);
        navigate(`/events/${event.id}`, { replace: true });
      }}
      loading={mutationLoading}
      error={evetnsError}
    />
  );
};
