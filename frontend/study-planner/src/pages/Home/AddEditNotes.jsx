import "react";
import PropTypes from "prop-types";
import TagInput from "../../components/Input/TagInput";
import { useState } from "react";
import { MdClose } from "react-icons/md";
const AddEditNotes = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {};

  // Edit Note
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }
    if (!content) {
      setError("Please enter a content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
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
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};
AddEditNotes.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default AddEditNotes;
