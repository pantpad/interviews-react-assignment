import { useCallback, useRef, DependencyList } from "react";

//this hook will be used to generate a reference for the IntersectionObserver
//the reference should be applied to the last element of the list
//as soon as the reference is seen by the observer, the specified callback will be fired

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(() => {}, []);

  return ref;
}
