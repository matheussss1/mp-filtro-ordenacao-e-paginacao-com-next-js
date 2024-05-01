"use client";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useOrdersContext } from "@/context/Orders";

export default function Pagination() {
  const context = useOrdersContext();
  if (!context.orders?.meta) return null;

  const isOnFirstPage = context.orders.meta.current_page === 1;
  const isOnLastPage =
    context.orders.meta.current_page === context.orders.meta.last_page;

  function goToPage(page: number) {
    context.setPage(page);
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        {context.orders.meta.links.map((link, index, arr) => {
          const hasUrl = link.url !== null;
          const isFirstItem = !index;
          const isLastItem = index === arr.length - 1;

          if ((isFirstItem && isOnFirstPage) || (isLastItem && isOnLastPage)) {
            return null;
          }

          if (isFirstItem) {
            return (
              <PaginationItem key="first" onClick={() => goToPage(1)}>
                <PaginationPrevious />
              </PaginationItem>
            );
          }

          if (isLastItem) {
            return (
              <PaginationItem
                key="next"
                onClick={() => goToPage(context.filters.page + 1)}
              >
                <PaginationNext />
              </PaginationItem>
            );
          }

          if (hasUrl) {
            return (
              <PaginationItem
                key={link.label}
                className="hidden md:inline-flex"
                onClick={() => goToPage(Number(link.label))}
              >
                <PaginationLink isActive={link.active}>
                  {link.label}
                </PaginationLink>
              </PaginationItem>
            );
          }

          return (
            <PaginationItem className="hidden md:inline-flex" key={link.label}>
              <PaginationLink isActive={link.active}>
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </PaginationComponent>
  );
}
