"use client";

import api from "@/lib/axios";
import React from "react";

export default function useFetch<T>(
  url: string,
  options: {
    initialValue?: any;
    onSuccess: (data: T) => void;
    params?: Record<string, unknown>;
  }
) {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const params = options?.params;
  const onSuccess = options.onSuccess;

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await api.get<T>(url, { params: params });
        onSuccess(data);
        setError(null);
      } catch (e: any) {
        console.error(e);
        setError(
          e?.message || e?.response?.data?.message || "Erro ao carregar dados"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, params, onSuccess]);

  return { isLoading: loading, error };
}
