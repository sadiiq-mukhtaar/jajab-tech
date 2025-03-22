import { Badge } from "@radix-ui/themes";
import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div>
      {status === "OPEN" && <Badge color="red">{status}</Badge>}
      {status === "CLOSED" && <Badge color="green">{status}</Badge>}
      {status === "IN_PROGRESS" && <Badge color="violet">{status}</Badge>}
    </div>
  );
};

export default StatusBadge;
