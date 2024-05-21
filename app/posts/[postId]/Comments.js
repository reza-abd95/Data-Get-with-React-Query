"use client";
import styles from "../../page.module.css";

import axios from "axios";
import { Divider } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modale from "./Modal";

function Comments({ postId }) {
  const [email, setEmail] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className={styles.main}>در حال دریافت اطلاعات...</div>;
  }
  if (isError) {
    return <div className={styles.main}> {error.message}:ارور</div>;
  }

  return (
    <div style={{ margin: "30px auto", padding: "5px" }}>
      {data.map((com) => {
        return (
          <div key={com.id}>
            <span
              onClick={() => {
                setEmail(com.email);
                setIsModalOpen(true);
              }}
              style={{
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              User {com.id}
            </span>
            <p style={{ marginTop: "10px" }}>{com.body}</p>
            <p>{com.email}</p>

            <Divider />
          </div>
        );
      })}
      {isModalOpen && (
        <Modale
          email={email}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default Comments;
