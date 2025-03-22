"use client";
import { Select } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const FilterByStatus = () => {
  const searchParams = useSearchParams();
  const rouer = useRouter();
  const Statuses = [
    { label: "None", value: "None" },
    { label: "Open", value: "OPEN" },
    { label: "In-progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "None"}
      onValueChange={(status) => {
        if (status === "None") status = "";
        const params = new URLSearchParams(searchParams);
        params.set("status", status);
        rouer.push("?" + params.toString());
      }}
    >
      <Select.Trigger placeholder="Filter by status ..." />
      <Select.Content>
        {Statuses.map((status) => (
          <Select.Item value={status.value} key={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterByStatus;
