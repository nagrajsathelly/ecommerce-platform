"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/lib/store";
import StorePersistence from "@/providers/StorePersistence";

export default function StoreProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <StorePersistence />
      {children}
    </Provider>
  );
}