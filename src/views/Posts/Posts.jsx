import styles from "./Posts.module.css";

import { Spin } from "antd";
import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetPostsQuery, addPage, addPosts, setTotalPages } from "#redux";
import { Post, Section } from "#components";
import { PAGE_SIZE } from "#utils";
import { useScrollPosition } from "#hooks";

export function Posts() {
  const dispatch = useDispatch(),
    intersectionElement = useRef(null),
    postsWrapper = useRef(null),
    page = useSelector((state) => state.appSlice.page),
    posts = useSelector((state) => state.appSlice.posts),
    totalPages = useSelector((state) => state.appSlice.totalPages),
    dataIsOver = useSelector((state) => state.appSlice.dataIsOver),
    isNavigated = useSelector((state) => state.appSlice.isNavigated),
    [scrollPosition = 0, onScrollHandler] = useScrollPosition("Posts"),
    { data } = useGetPostsQuery(page, { skip: dataIsOver || isNavigated });

  const onIntersection = useCallback(
    (entries) => {
      if (entries[0].isIntersecting) {
        if (posts.length) dispatch(addPage());
      }
    },
    [posts, dispatch]
  );

  useEffect(() => {
    postsWrapper.current.scrollTop = scrollPosition;
  }, []);

  useEffect(() => {
    if (!data) return;
    if (!totalPages) dispatch(setTotalPages(data.total / PAGE_SIZE));
    dispatch(addPosts(!isNavigated && data.posts));
  }, [data]);

  useEffect(() => {
    if (dataIsOver) return;
    const { current } = intersectionElement;
    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0.5,
    });
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [onIntersection, dataIsOver]);


  
  return (
    <Section>
      <h1>Posts</h1>
      <div
        className={styles.wrapper}
        ref={postsWrapper}
        onScroll={onScrollHandler}
      >
        <ul className={styles.posts}>
          {posts?.map((props) => {
            const { id } = props;
            return (
              <Post
                key={id}
                {...props}
                link={`post/${id}`}
                ellipsis={{ rows: 1 }}
              />
            );
          })}
          {!dataIsOver && (
            <li className={styles.spinner} ref={intersectionElement}> 
              <Spin size="large" />
            </li>
          )}
        </ul>
      </div>
    </Section>
  );
}
