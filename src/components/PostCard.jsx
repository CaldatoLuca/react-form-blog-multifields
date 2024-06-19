import { useState } from "react";

const PostCard = ({ title, content, image, tags, published, category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`w-3/5 rounded-lg shadow-2xl bg-slate-700 grid grid-cols-6 ${
        published ? "" : "hidden"
      }`}
    >
      {/* Colonna destra */}
      <div className="col-span-5 p-4">
        {/* Titolo e contenuto */}
        <h3 className="text-lg font-semibold text-emerald-500 mb-2">{title}</h3>
        <p className="mb-4">
          {isExpanded ? content : `${content.substring(0, maxLength)}...`}
          {content.length > maxLength && (
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={handleToggle}
            >
              {isExpanded ? " View less" : " View more"}
            </span>
          )}
        </p>

        {/* Immagine */}
        {image || image === "" ? (
          <figure className="mb-2">
            <img src={image} alt="" className="w-full rounded-md" />
          </figure>
        ) : (
          ""
        )}

        {/* User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <figure className="w-8 h-8 rounded-full overflow-hidden">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </figure>
            <span className="text-slate-200">Username</span>
          </div>

          <div className=" text-emerald-400">{category}</div>
        </div>
      </div>

      {/* Colonna di destra */}
      <div className="col-span-1 py-4 rounded-lg shadow-2xl bg-slate-600 flex justify-center items-center text-center">
        {/* Tags */}
        <ul>
          {tags.map((t, i) => (
            <li key={`tag${i}`}>#{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostCard;
