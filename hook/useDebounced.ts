import React from "react";

export default function useDebounced<T>(value: T, milisecondsDelay = 500) {
  const [v, setV] = React.useState<T>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setV(value);
    }, milisecondsDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, milisecondsDelay]);

  return v;
}
