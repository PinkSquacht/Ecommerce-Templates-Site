import { useContext } from "react";
import { StorefrontContext } from "./StorefrontContext";

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used within a StorefrontProvider");
  }

  return context;
}