import { useCallback, useRef, DependencyList } from "react";

//this hook will be used to generate a reference for the IntersectionObserver
//the reference should be applied to the last element of the list
//as soon as the reference is seen by the observer, the specified callback will be fired

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T) => {
      if (deps.every(Boolean)) {
        //disconnect the previous observer
        observer.current?.disconnect();
        //create new observer, select the first entry (our only dom element in this case) and executes callback if it is intersecting
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        });
        if (node) {
          observer.current.observe(node);
        }
      }
    },
    [callback, deps]
  );

  return ref;
}
