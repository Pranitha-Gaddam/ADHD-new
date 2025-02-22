import React, { useState } from "react";
import PropTypes from "prop-types";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditTasks = ({
  noteData,
  type,
  getAllTasks,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // Add Task
  const addNewTask = async () => {
    try {
      const response = await axiosInstance.post("/add-task", {
        title: title,
        content: content,
        tags: tags,
      });

      if (response.data && response.data.task) {
        showToastMessage("Task added successfully");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Task
  const editTask = async () => {
    try {
      const response = await axiosInstance.put(`/edit-task/${noteData._id}`, {
        title: title,
        content: content,
        tags: tags,
      });

      if (response.data && response.data.task) {
        showToastMessage("Task Updated Successfully");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddTask = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter content");
      return;
    }
    setError("");

    if (type === "edit") {
      editTask();
    } else {
      addNewTask();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-300"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to Gym at 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-media mt-5 p-3"
        onClick={handleAddTask}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

AddEditTasks.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string,
  getAllTasks: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired,
};

export default AddEditTasks;
