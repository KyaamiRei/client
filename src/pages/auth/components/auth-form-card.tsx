import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type AuthFormCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export const AuthFormCard = ({
  title,
  description,
  children,
}: AuthFormCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
