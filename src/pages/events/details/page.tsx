import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { useEventById } from "@/hooks/use-event-by-id";
import { useAuthStore } from "@/stores/auth-store";
import { useEventsStore } from "@/stores/events-store";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { EventDetails } from "../components/event-details";

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((state) => state.user);
  const joinedEvents = useEventsStore((state) => state.joinedEvents);
  const joinEvent = useEventsStore((state) => state.joinEvent);
  const leaveEvent = useEventsStore((state) => state.leaveEvent);
  const removeEvent = useEventsStore((state) => state.removeEvent);
  const navigate = useNavigate();
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
      <PageShell title="Событие">
        <div>Загрузка...</div>
      </PageShell>
    );
  }

  if (notFound) {
    return (
      <PageShell title="Событие не найдено">
        <div>{loadError || "Событие не найдено"}</div>
      </PageShell>
    );
  }

  if (loadError || !event) {
    return (
      <PageShell title="Ошибка">
        <div>{loadError || "Ошибка загрузки события"}</div>
      </PageShell>
    );
  }

  const isOwner = user?.id === event.ownerId;
  const isJoined = joinedEvents.some((e) => e.event.id === event.id);
  const eventId = event.id;

  const handleJoin = async () => {
    await joinEvent(eventId);
  };

  const handleLeave = async () => {
    await leaveEvent(eventId);
  };

  const handleRemove = async () => {
    await removeEvent(eventId);
    navigate("/events", { replace: true });
  };

  return (
    <PageShell title={event.title}>
      <div className="m-auto flex w-full max-w-2xl flex-col gap-4 ">
        <Button variant={"ghost"} size="sm" className="w-fit" asChild>
          <Link to="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Link>
        </Button>

        <EventDetails
          event={event}
          isOwner={isOwner}
          isJoined={isJoined}
          mutationLoading={mutationLoading}
          eventsError={eventError}
          onJoin={() => handleJoin()}
          onLeave={() => handleLeave()}
          onRemove={() => handleRemove()}
        />
      </div>
    </PageShell>
  );
};
