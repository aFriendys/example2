import { createBrowserRouter } from "react-router-dom";

import { Post, Posts } from "#views";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
]);
