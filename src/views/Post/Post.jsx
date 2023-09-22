import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useGetPostQuery, setIsNavigated } from "#redux";
import { Post as PostComponent, Section } from "#components";

export function Post() {
  const dispatch = useDispatch(),
    { id } = useParams(),
    { data, isLoading } = useGetPostQuery(id);

  useEffect(() => {
    dispatch(setIsNavigated(true));
  }, []);

  return (
    <Section>
      {isLoading ? <Spin size="large" /> : <PostComponent {...data} />}
    </Section>
  );
}
