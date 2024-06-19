import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const baseData = {
  id: null,
  title: "",
  image: "https://placehold.co/600x400",
  content: "",
  tags: [],
  published: null,
  category: "",
};

const categories = ["Technology", "Health", "Science", "Education", "Business"];

const Form = ({ newPost }) => {
  const [formData, setFormData] = useState(baseData);
  const [newTag, setNewTag] = useState("");
  const [formErrors, setFormErrors] = useState({
    id: "",
    title: "",
    image: "",
    content: "",
    tags: "",
    published: "",
    category: "",
  });
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.title.trim() === "") {
      errors.title = "Title is required";
      valid = false;
    }

    if (formData.content.trim() === "") {
      errors.content = "Content is required";
      valid = false;
    }

    if (formData.category.trim() === "") {
      errors.category = "Category is required";
      valid = false;
    }

    if (formData.tags.length === 0) {
      errors.tags = "At least one tag is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const addTag = (e) => {
    e.preventDefault();
    if (
      formData.tags.length < 5 &&
      newTag.trim() !== "" &&
      !formData.tags.includes(newTag.trim())
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const deleteTag = (indexToDelete) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((_, i) => i !== indexToDelete),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      newPost(formData);
      setSuccess(true);
      setFormData(baseData);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <div className="col-span-2">
      {success && (
        <div className="absolute bottom-5 right-5 p-5 rounded-md bg-emerald-500 animate-fadeOut">
          Post created successfully
        </div>
      )}

      <div className="fixed">
        <h2 className="text-emerald-500 font-semibold text-lg mb-2 ">
          Create Post
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <label className="flex flex-col">
            <span className="text-emerald-400">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormData}
              className={`mb-2 rounded-md bg-slate-500 bg-opacity-50 p-1 cursor-pointer focus:outline-none focus:border-transparent ${
                formErrors.title ? "border border-red-500" : ""
              }`}
            />
            {formErrors.title && (
              <span className="text-red-400 text-sm">{formErrors.title}</span>
            )}
          </label>

          {/* Content */}
          <label className="flex flex-col">
            <span className="text-emerald-400">Content</span>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleFormData}
              className={`mb-2 rounded-md bg-slate-500 bg-opacity-50 p-1 cursor-pointer focus:outline-none focus:border-transparent ${
                formErrors.content ? "border border-red-500" : ""
              }`}
            />
            {formErrors.content && (
              <span className="text-red-400 text-sm">{formErrors.content}</span>
            )}
          </label>

          {/* Category */}
          <label className="flex flex-col">
            <span className="text-emerald-400">Category</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleFormData}
              className={`mb-2 rounded-md bg-slate-500 bg-opacity-50 p-1 cursor-pointer focus:outline-none focus:border-transparent ${
                formErrors.category ? "border border-red-500" : ""
              }`}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formErrors.category && (
              <span className="text-red-400 text-sm">
                {formErrors.category}
              </span>
            )}
          </label>

          {/* Tags */}
          <label className="flex flex-col">
            <span className="text-emerald-400">Tags</span>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={newTag}
                onChange={handleNewTag}
                className="rounded-md bg-slate-500 bg-opacity-50 p-1 cursor-pointer focus:outline-none focus:border-transparent mr-2"
              />
              <button
                onClick={addTag}
                className="hover:bg-opacity-80 transition cursor-pointer bg-emerald-500 rounded-md px-3 py-1"
              >
                Add Tag
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {formData.tags.map((t, i) => (
                <li
                  key={`tag-${i}`}
                  className="bg-emerald-500 text-white rounded-md px-2 py-1 flex items-center justify-between"
                >
                  <span>#{t}</span>
                  <button onClick={() => deleteTag(i)} className="text-red-700">
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
            {formErrors.tags && (
              <span className="text-red-400 text-sm">{formErrors.tags}</span>
            )}
          </label>

          {/* Published */}
          <label className="flex flex-col">
            <span className="text-emerald-400">Publish ?</span>
            <div className="flex items-center mb-2">
              <label className="mr-2">
                <input
                  type="radio"
                  name="published"
                  value="true"
                  checked={formData.published === true}
                  onChange={handleFormData}
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="published"
                  value="false"
                  checked={formData.published === false}
                  onChange={handleFormData}
                  className="mr-1"
                />
                No
              </label>
            </div>
          </label>

          <button className="hover:bg-opacity-80 transition cursor-pointer bg-emerald-500 rounded-md px-3 py-1 mt-3">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
