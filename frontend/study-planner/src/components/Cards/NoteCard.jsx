import React from "react";
import PropTypes from "prop-types";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  content,
  tags,
  dueDate,
  isPinned,
  isCompleted,
  onEdit,
  onDelete,
  onPinNote,
  onToggleComplete,
}) => {
  console.log("Due Date:", dueDate); // Add this line to check the due date

  return (
    <div className="border border-slate-300 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isCompleted}
            onClick={onToggleComplete}
            className="mr-2 peer appearance h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer"
          />
          <h6
            className={`text-sm font-medium ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {title}
          </h6>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-blue-600" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>
      {content && (
        <p className="text-xs text-slate-600 mt-2">{content.slice(0, 60)}</p>
      )}
      {dueDate && (
        <p className="text-xs text-slate-500 mt-2">
          Due: {new Date(dueDate).toLocaleString()}
        </p>
      )}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  isPinned: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPinNote: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default NoteCard;
