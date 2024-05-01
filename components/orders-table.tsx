"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrdersContext } from "@/context/Orders";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";

export default function OrdersTable() {
  const context = useOrdersContext();
  const [sortedField, direction] = context.filters.sort;

  function getSortDirection(field: string) {
    if (sortedField !== field) return null;
    return direction;
  }

  function sortBy(field: string) {
    context.sortField(field);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            onClick={() => sortBy("order_date")}
            className="table-cell cursor-pointer justify-end items-center gap-1"
          >
            <div className="flex items-center gap-1">
              Data
              {!getSortDirection("order_date") ? (
                <ChevronsUpDown className="w-4" />
              ) : getSortDirection("order_date") === "asc" ? (
                <ChevronDown className="w-4" />
              ) : (
                <ChevronUp className="w-4" />
              )}
            </div>
          </TableHead>
          <TableHead
            onClick={() => sortBy("amount_in_cents")}
            className="text-right cursor-pointer flex justify-end items-center gap-1"
          >
            Valor
            {!getSortDirection("amount_in_cents") ? (
              <ChevronsUpDown className="w-4" />
            ) : getSortDirection("amount_in_cents") === "asc" ? (
              <ChevronDown className="w-4" />
            ) : (
              <ChevronUp className="w-4" />
            )}
          </TableHead>
        </TableRow>
      </TableHeader>
      <OrdersTableBody />
    </Table>
  );
}

function OrdersTableBody() {
  const context = useOrdersContext();

  if (!context.orders?.data?.length) return null;

  return (
    <TableBody>
      {context.orders.data.map((order) => {
        const orderDate = new Date(order.order_date).toLocaleDateString(
          "pt-BR"
        );
        const amountInBRL = (order.amount_in_cents / 100).toLocaleString(
          "pt-BR",
          {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
            currency: "BRL",
          }
        );
        return (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {order.status === "pending" ? "Pendente" : "Concluído"}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{orderDate}</TableCell>
            <TableCell className="text-right">R$ {amountInBRL}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
