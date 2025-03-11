"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useFilters<T>(params: Array<keyof T>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const valuesFromParams = params.reduce((prevVal, currVal) => {
    const paramValue = searchParams.get(currVal as string);
    return { ...prevVal, [currVal]: paramValue };
  }, {} as T);

  const filters = { ...valuesFromParams };

  const createQueryString = useCallback(
    (key: string[], value: any[]) => {
      const params = new URLSearchParams(searchParams);

      key.forEach((key, index) => {
        if (value[index] || value[index] === 0) params.set(key, value[index]);
        else params.delete(key);
      });

      const url = `${pathname}?${params.toString()}`;

      router.replace(url);
    },
    [pathname, router, searchParams]
  );

  return { filters, createQueryString };
}
