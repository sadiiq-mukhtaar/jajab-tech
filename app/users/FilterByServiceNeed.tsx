"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const FilterByServiceNeed = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const servicesNeed = [
    { label: "None", value: "None" },
    { label: "Web App", value: "Web App" },
    { label: "Mobile App", value: "Mobile App" },
  ];
  return (
    <Select.Root
      onValueChange={(serviceNeed) => {
        const params = new URLSearchParams(searchParams);
        params.set("serviceNeed", serviceNeed);
        router.push("?" + params.toString());
      }}
    >
      <Select.Trigger placeholder="Filter by service need ..." />
      <Select.Content>
        {servicesNeed.map((serviceNeed) => (
          <Select.Item value={serviceNeed.value} key={serviceNeed.value}>
            {serviceNeed.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterByServiceNeed;
