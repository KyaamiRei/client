import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatStartsAt } from "@/lib/utils";
import type { JoinedEventItem } from "@/shared/api/types";
import { Link } from "react-router-dom";

type JoinedEventsTableProps = {
  events: JoinedEventItem[];
};

export const JoinedEventsTable = ({ events }: JoinedEventsTableProps) => {
  const sorted = events
    .slice()
    .sort((a, b) => a.event.startedAt.localeCompare(b.event.startedAt));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Начало</TableHead>
          <TableHead>Присоединился</TableHead>
          <TableHead>Адрес</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((event) => (
          <TableRow key={event.event.id}>
            <TableCell className="font-medium">
              <Link
                className="hover:text-muted-foreground "
                to={`/events/${event.event.id}`}
              >
                {event.event.title}
              </Link>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatStartsAt(event.event.startedAt)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatStartsAt(event.joinedAt)}
            </TableCell>
            <TableCell className="max-w-56 text-muted-foreground">
              {event.event.address}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="link" size="sm" className="h-auto p-0">
                <Link to={`/events/${event.event.id}/edit`}>Изменить</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
