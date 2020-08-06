import { useCallback, useEffect, useRef, useState } from "react";
import { useLatest } from "./useLatest";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  if (delay === 0) return value;
  return debouncedValue;
}

/**
 *
 * @param delay shouldn't change
 */
export function useDebouncedAction(delay: number = 2000) {
  const fnRef = useRef<null | (() => void)>(null);
  const timeoutRef = useRef<any>(null);
  const schedule = useCallback(function schedule(fn: () => void) {
    clearTimeout(timeoutRef.current);
    fnRef.current = fn;
    timeoutRef.current = setTimeout(() => {
      fnRef.current = null;
      fn();
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * execute latest fn, if available
   */
  function flush() {
    clearTimeout(timeoutRef.current);
    fnRef.current?.();
    fnRef.current = null;
  }
  function reschedule(rescheduleDelay: number = 5000) {
    const fn = fnRef.current;
    if (!fn) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fnRef.current = null;
      fn();
    }, rescheduleDelay);
  }
  function clear() {
    clearTimeout(timeoutRef.current);
    fnRef.current = null;
  }
  return { schedule, flush, reschedule, clear };
}

export function useDebouncedSync(
  key: string,
  syncFn: () => void,
  delay: number = 5000
) {
  const { schedule, clear } = useDebouncedAction(delay);
  useEffect(() => {
    schedule(syncFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { cancelSync: clear };
}
