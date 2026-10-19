"use client";

import { useSyncExternalStore } from "react";
import type { ProfileId } from "@/content/types";
import { PROFILE_KEY } from "./boot";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-profile", "data-gate"] });
  return () => mo.disconnect();
}

export function useProfile(): ProfileId | null {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.profile as ProfileId | undefined) ?? null,
    () => null,
  );
}

export function useGateOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.gate === "open",
    () => false,
  );
}

export function setProfile(id: ProfileId) {
  const d = document.documentElement;
  d.dataset.profile = id;
  delete d.dataset.gate;
  try {
    localStorage.setItem(PROFILE_KEY, id);
  } catch {
    /* storage can be unavailable in private modes; the choice still applies for this page */
  }
}

export function openGate() {
  document.documentElement.dataset.gate = "open";
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
