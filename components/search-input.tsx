"use client";

import { Input } from "@/components/ui/input";
import { useOrdersContext } from "@/context/Orders";
import { Search } from "lucide-react";
export default function SearchInput() {
  const context = useOrdersContext();
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        onChange={(event) => {
          context.setSearch(event.target.value);
        }}
        value={context.filters.search}
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
