import { notFound } from "@tanstack/react-router";

export function throwIfMissing(error: unknown): never {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("No encontrado") || message.includes("404")) {
    throw notFound();
  }
  throw error;
}
