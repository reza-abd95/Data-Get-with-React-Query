"use client";
import { useParams } from "next/navigation";
import React from "react";
import styles from "../../page.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Divider } from "antd";
import Comments from "./Comments";

function PostId() {
  const { postId } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return res.data;
    },
    staleTime: 10 * (60 * 1000),
    cacheTime: 15 * (60 * 1000),
  });

  if (isLoading) {
    return <div className={styles.main}>در حال دریافت اطلاعات...</div>;
  }
  if (isError) {
    return <div className={styles.main}> {error.message}:ارور</div>;
  }

  return (
    <div className={styles.main}>
      <div
        style={{
          width: "50%",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#eee",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          <Divider orientation="left">{data.title}</Divider>
          <p>{data.body}</p>
        </div>
        <Divider />

        <Comments postId={postId} />
      </div>
    </div>
  );
}

export default PostId;
