import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatStartsAt } from "@/lib/utils";
import type { EventDTO } from "@/shared/api/types";
import { Link } from "react-router-dom";

type EventDetailsProps = {
  event: EventDTO;
  isOwner: boolean;
  isJoined: boolean;
  mutationLoading: boolean;
  eventsError: string | null;
  onJoin: () => void;
  onLeave: () => void;
};

export const EventDetails = ({
  event,
  isOwner,
  isJoined,
  mutationLoading,
  eventsError,
  onJoin,
  onLeave,
}: EventDetailsProps) => {
  return (
    <>
      {eventsError && (
        <div className="text-sm text-destructive mb-4">{eventsError}</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-snug">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="text-muted-foreground">Когда</p>
            <p>{formatStartsAt(event.startedAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Адрес</p>
            <p>{event.address}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Вместимость</p>
            <p>До {event.capacity} участников</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t">
          {isOwner ? (
            <>
              <p className="mr-auto text-sm text-muted-foreground">
                Вы являетесь организатором
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/events/${event.id}/edit`}>Редактировать</Link>
              </Button>
            </>
          ) : isJoined ? (
            <Button
              variant="outline"
              onClick={() => onLeave()}
              disabled={mutationLoading}
            >
              Покинуть мероприятие
            </Button>
          ) : (
            <Button size="sm" onClick={() => onJoin()} disabled={mutationLoading}>
              Присоединиться
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};