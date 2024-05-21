"use client";
import React from "react";
import styles from "../page.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { List } from "antd";
import Link from "next/link";

function Posts() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>در حال دریافت اطلاعات...</div>;
  }
  if (isError) {
    return <div> {error.message}:ارور</div>;
  }

  return (
    <>
      <div style={{ width: "50%", margin: "20px auto" }}>
        <List
          bordered
          dataSource={data}
          renderItem={(post) => (
            <List.Item>
              <Link href={`/posts/${post.id}`} style={{ color: "black" }}>
                {post.title}
              </Link>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default Posts;
