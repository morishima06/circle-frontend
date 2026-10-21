import { Badge } from "@/components/ui/Badge";

type BadgeConfig = {
  label: string;
  className: string;
};

type Props = {
  status: string;
  config: Record<string, BadgeConfig>;
};

export const StatusBadge = ({ status, config }: Props) => {
  const badge = config[status];

  if (!badge) return null;

  return <Badge className={badge.className}>{badge.label}</Badge>;
};
