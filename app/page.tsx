"use client";
import Form from "@components/Form";
import Header from "@components/Header/Header";
import PostFeed from "@components/Post/PostFeed";

export default function Home() {
  return (
    <main>
      <div>
        <Header showBackArrow lable="Home"></Header>
        <Form placeholder="What's Happening?" />
        <PostFeed />
      </div>
    </main>
  );
}
