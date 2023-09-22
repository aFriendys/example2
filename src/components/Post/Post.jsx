import styles from "./Post.module.css";

import { Link } from "react-router-dom";

import { Typography } from "antd";
const { Paragraph } = Typography;

export function Post({ title, id, body, link, ellipsis }) {
  const linkPath = link ?? -1,
    linkText = link ? "Просмотр" : "Вернуться";

  return (
    <li className={styles.post}>
      <span className={styles.index}>{`#${id}`}</span>
      <h2>{title}</h2>
      <Paragraph ellipsis={ellipsis}>{body}</Paragraph>
      <div>
        <Link to={linkPath}>{linkText}</Link>
      </div>
    </li>
  );
}
