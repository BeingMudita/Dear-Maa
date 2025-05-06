
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  root?: null | Element;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

interface UseInViewReturn<T extends Element> {
  ref: RefObject<T>;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useInView<T extends Element = HTMLDivElement>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = false,
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<T>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    // If we already observed this element, and we're set to trigger once, don't re-observe
    if (triggerOnce && inView) return;
    
    // Disconnect previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create new observer
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setEntry(entry);
        
        if (entry.isIntersecting && triggerOnce && observer.current) {
          observer.current.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    // Observe the target element
    const { current: currentRef } = ref;
    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [root, rootMargin, threshold, triggerOnce, ref.current]);

  return { ref, inView, entry };
}
