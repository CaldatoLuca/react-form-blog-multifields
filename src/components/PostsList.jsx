import { useState } from "react";
import PostCard from "./PostCard";
import { RxCross2 } from "react-icons/rx";

const PostList = ({ selectedTag, onXClick, onClearClick, posts }) => {
  const filteredPosts =
    selectedTag.length === 0
      ? posts
      : posts.filter((post) =>
          selectedTag.every((tag) => post.tags.includes(tag))
        );
  return (
    <div className="col-span-8 flex flex-col items-center gap-10">
      <div className="flex flex-wrap gap-5">
        {selectedTag.map((s, i) => (
          <div
            key={`tag-${i}`}
            className="bg-slate-500 bg-opacity-50 px-2 rounded-md  flex gap-2 items-center"
          >
            {s}
            <button className="text-emerald-400" onClick={() => onXClick(s)}>
              <RxCross2 />
            </button>
          </div>
        ))}
        {selectedTag.length > 0 && (
          <button
            className="bg-red-500 bg-opacity-50 px-2 rounded-md  text-slate-400 flex gap-2 items-center"
            onClick={() => onClearClick()}
          >
            Clear
          </button>
        )}
      </div>
      {filteredPosts.length === 0
        ? "No Posts Found"
        : filteredPosts.map((p) => (
            <PostCard
              title={p.title}
              image={p.image}
              content={p.content}
              tags={p.tags}
              published={p.published}
              category={p.category}
              key={p.id}
            ></PostCard>
          ))}
    </div>
  );
};

export default PostList;
