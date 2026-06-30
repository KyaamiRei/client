import { ensureAuthBootstrap } from "@/app/auth-bootstrap";
import { useAuthStore } from "@/stores/auth-store";
import { use } from "react";

export function useAuthBootstrap() {
  use(ensureAuthBootstrap());

  return useAuthStore((state) => state.user);
}
