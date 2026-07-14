import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatStartsAt } from "@/lib/utils";
import type { EventDTO } from "@/shared/api/types";
import { Link } from "react-router-dom";

type CreatedEventsTableProps = {
  events: EventDTO[];
};

export const CreatedEventsTable = ({ events }: CreatedEventsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Начало</TableHead>
          <TableHead>Адрес</TableHead>
          <TableHead>Место</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <Link
                className="hover:text-muted-foreground"
                to={`/events/${event.id}`}
              >
                {event.title}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatStartsAt(event.startedAt)}
            </TableCell>
            <TableCell className="max-w-56 text-muted-foreground">
              {event.address}
            </TableCell>
            <TableCell className="tabular-nums">{event.capacity}</TableCell>
            <TableCell className="text-right">
              <Button variant="link" size="sm" className="h-auto p-0">
                <Link to={`/events/${event.id}/edit`}>Изменить</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
