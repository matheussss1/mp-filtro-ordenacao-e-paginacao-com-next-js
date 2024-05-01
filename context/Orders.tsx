"use client";

import useDebounced from "@/hook/useDebounced";
import useFetch from "@/hook/useFetch";
import {
  GetOrdersResponse,
  OrdersFilters,
  OrdersSortFilter,
  OrderStatus,
} from "@/types/Order";
import React from "react";

type OrdersContextData = {
  orders: GetOrdersResponse | null;
  isLoadingOrders: boolean;
  filters: OrdersFilters;
  setPage: (page: number) => void;
  sortField: (field: string) => void;
  setSearch: (search: string) => void;
  setStatus: (status: OrderStatus) => void;
};

export const OrdersContext = React.createContext<OrdersContextData>(
  {} as OrdersContextData
);

export function useOrdersContext() {
  return React.useContext(OrdersContext);
}

export function OrdersProvider(props: React.PropsWithChildren) {
  const [contextValue, setContextValue] = React.useState<OrdersContextData>({
    orders: null,
    isLoadingOrders: false,
    filters: {
      page: 1,
      sort: [],
      search: "",
      status: null,
    },
    setSearch,
    setStatus,
    sortField,
    setPage,
  });
  const searchValue = useDebounced(contextValue.filters.search, 2000);

  React.useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const onSuccess = React.useCallback(setOrders, []);
  const params = React.useMemo(() => {
    const [sortKey, direction] = contextValue.filters.sort;
    const sort =
      sortKey && direction
        ? `${direction === "desc" ? "-" : ""}${sortKey}`
        : undefined;

    return {
      sort,
      page: contextValue.filters.page,
      search: searchValue || undefined,
      status: contextValue.filters.status || undefined,
    };
  }, [
    searchValue,
    contextValue.filters.page,
    contextValue.filters.sort,
    contextValue.filters.status,
  ]);
  const orders = useFetch<GetOrdersResponse>("/orders", {
    params,
    onSuccess,
  });

  function setSearch(search: string) {
    setContextValue((state) => ({
      ...state,
      filters: {
        ...state.filters,
        search,
      },
    }));
  }

  function setStatus(status: OrderStatus) {
    setContextValue((state) => ({
      ...state,
      filters: {
        ...state.filters,
        status,
        page: 1,
      },
    }));
  }

  function setOrders(orderResponse: GetOrdersResponse) {
    setContextValue((state) => ({
      ...state,
      orders: orderResponse,
    }));
  }

  function sortField(field: string) {
    return setContextValue((state) => {
      const orderOptions = ["asc", "desc", null] as ["asc", "desc", null];
      const sort: OrdersSortFilter = [field, orderOptions.at(0)!];
      const [_field, _direction = null] = state.filters.sort;

      if (field === _field) {
        const currentIndex = orderOptions.indexOf(_direction!);
        const nextIndex = (currentIndex + 1) % orderOptions.length;
        sort[1] = orderOptions[nextIndex];
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          sort,
          page: 1,
        },
      };
    });
  }

  function setPage(page: number) {
    setContextValue((state) => ({
      ...state,
      filters: {
        ...state.filters,
        page,
      },
    }));
  }

  return (
    <OrdersContext.Provider
      value={{ ...contextValue, isLoadingOrders: orders.isLoading }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
}
