import React from "react";

export default function When(
  props: React.PropsWithChildren<{
    is: boolean;
  }>
) {
  if (!props.is) return null;
  return props.children;
}
