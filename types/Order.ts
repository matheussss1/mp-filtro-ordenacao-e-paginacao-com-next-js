export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: string;
  amount_in_cents: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = "pending" | "completed";

export interface OrdersFilters {
  page: number;
  search: string;
  sort: OrdersSortFilter;
  status: OrderStatus | null;
}

export type OrdersSortFilter = [string, "asc" | "desc" | null] | [];

export interface GetOrdersResponse {
  data: Array<Order>;
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
