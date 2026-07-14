type MyEventsTitleProps = {
  label: string;
  value: number;
};

export const MyEventsTitle = ({ label, value }: MyEventsTitleProps) => {
  return (
    <div className="rounded-lg border bg-muted/30 px-4 py-2">
      <p className="text-xs text-muted-foreground"> {label}</p>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
};
