import "react";
import PropTypes from "prop-types";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border border-slate-300 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-blue-600" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-60 mt-2">{content?.slice(0, 60)}</p>

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
  date: PropTypes.string.isRequired,
  content: PropTypes.string,
  tags: PropTypes.array,
  isPinned: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPinNote: PropTypes.func,
};

export default NoteCard;
