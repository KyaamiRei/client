import { PageShell } from "@/components/page-shell";
import { useAuthStore } from "@/stores/auth-store";
import { useEventsStore } from "@/stores/events-store";
import { useEffect } from "react";
import { MyEventsTitle } from "../components/my-events-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatedEventsTable } from "../components/created-events-table";
import { JoinedEventsTable } from "../components/joined-events-table";

export const MyPage = () => {
  const user = useAuthStore((state) => state.user);
  const events = useEventsStore((state) => state.events);
  const joinedEvents = useEventsStore((state) => state.joinedEvents);
  const myEventsFilter = useEventsStore((state) => state.myEventsFilter);
  const setMyEventsFilter = useEventsStore((state) => state.setMyEventsFilter);
  const loadEvents = useEventsStore((state) => state.loadEvents);
  const loadJoinedEvents = useEventsStore((state) => state.loadJoinedEvents);
  const eventsLoading = useEventsStore((state) => state.eventsLoading);
  const joinedLoading = useEventsStore((state) => state.joinedLoading);
  const eventsError = useEventsStore((state) => state.evetnsError);

  useEffect(() => {
    Promise.all([loadEvents(), loadJoinedEvents()]);
  }, [loadEvents, loadJoinedEvents]);

  const createdList = () => {
    if (!user) return [];
    return events
      .filter((event) => event.ownerId === user.id)
      .sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  };

  const createdCount = createdList().length;
  const joinedCount = joinedEvents.length;

  return (
    <PageShell title="Мои события">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
          <MyEventsTitle label="Создано" value={createdCount} />
          <MyEventsTitle label="Участвуют" value={joinedCount} />
        </div>

        {eventsError && (
          <div className="rounded-lg bg-destructive/10 p-4">
            <p className="text-destructive">
              Ошибка загрузки событий: {eventsError}
            </p>
          </div>
        )}

        <Tabs
          value={myEventsFilter}
          onValueChange={(v) => {
            if (v === "created" || v === "joined") {
              setMyEventsFilter(v);
            }
          }}
          className="gap-4"
        >
          <TabsList className="w-full max-w-md gap-2">
            <TabsTrigger value="created" className="flex-1">
              Созданные
            </TabsTrigger>
            <TabsTrigger value="joined" className="flex-1">
              Участвуют
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created" className="mt-0">
            {eventsLoading ? (
              "Загрузка"
            ) : createdList().length === 0 ? (
              "Нет событий"
            ) : (
              <CreatedEventsTable events={createdList()} />
            )}
          </TabsContent>
          <TabsContent value="joined" className="mt-0">
            {joinedLoading ? (
              "Загрузка"
            ) : joinedCount === 0 ? (
              "Нет событий"
            ) : (
              <JoinedEventsTable events={joinedEvents} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
};
