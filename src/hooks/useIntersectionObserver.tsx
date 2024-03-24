import { useCallback, useRef, DependencyList } from "react";

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const ref = useRef(null);

  const useCallback(()=>{},[])

  return ref;
}
