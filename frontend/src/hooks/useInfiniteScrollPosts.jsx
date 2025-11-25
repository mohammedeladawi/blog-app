import { getPaginatedPosts } from "services/postService";
import useFetch from "./useFetch";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useInfiniteScrollPosts = (initialOffset = 0, limit = 8) => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(initialOffset);

  // helps to refetch data if the initialOffset didn't change yet.
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const observerRef = useRef(null);
  const isFetchLocked = useRef(false);

  const { loading, error, data } = useFetch(
    () => getPaginatedPosts(offset, limit),
    [offset, refetchTrigger]
  );

  const hasMore = useMemo(() => {
    if (!data?.totalCount) return false;
    return posts.length < data.totalCount && data.totalCount > offset + limit;
  }, [data, posts, offset, limit]);

  useEffect(() => {
    if (!data) return;

    if (Array.isArray(data.posts) && data.posts.length > 0) {
      setPosts((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newPosts = data.posts.filter((p) => !ids.has(p.id));
        return [...prev, ...newPosts];
      });
    }

    isFetchLocked.current = false;
  }, [data]);

  useEffect(() => {
    if (loading) return;

    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) return;
        if (!hasMore || isFetchLocked.current || loading) return;

        isFetchLocked.current = true;
        setOffset((prev) => prev + limit);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "200px 0px",
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, limit, loading]);

  const refetch = useCallback(() => {
    setPosts([]);
    setOffset(initialOffset);
    setRefetchTrigger((s) => !s);
  }, []);

  return {
    posts,
    loading,
    error,
    observerRef,
    refetch,
  };
};

export default useInfiniteScrollPosts;
