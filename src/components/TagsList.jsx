import { useState } from "react";
import { posts } from "../../posts";

const TagsList = ({ onTagClick }) => {
  const tags = posts.reduce((acc, curr) => {
    curr.tags.forEach((t) => {
      if (!acc.includes(t)) {
        acc.push(t);
      }
    });

    return acc;
  }, []);

  const [inputTag, setInputTag] = useState("");
  const handleInputChange = (event) => {
    setInputTag(event.target.value);
  };

  return (
    <div className="col-span-2 ">
      <div className="fixed">
        <h2 className="text-emerald-500 font-semibold text-lg mb-2 ms-1">
          Tags
        </h2>

        <input
          type="text"
          placeholder="Search tag"
          className="mb-2 rounded-md bg-slate-500 bg-opacity-50 p-1 cursor-pointer focus:outline-none focus:border-transparent "
          onChange={handleInputChange}
        />

        <ul>
          {tags
            .filter((tag) => tag.includes(inputTag))
            .map((t, i) => (
              <li
                key={`tagItem${i}`}
                onClick={() => onTagClick(t)}
                className={`hover:bg-slate-500 hover:bg-opacity-50 hover:font-semibold transition px-1 rounded-md cursor-pointer`}
              >
                #{t.length > 25 ? `${t.substring(0, 20)}...` : t}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TagsList;
