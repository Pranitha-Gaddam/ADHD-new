import React, { useEffect, useState } from "react";
import CalendarApp from "../../components/Calendar/Calendar";
import Nav from "../../components/Navbar/Nav";
import NoteCard from "../../components/Cards/NoteCard";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import AddEditTasks from "../Home/AddEditTasks";
import Toast from "../../components/ToastMessage/Toast";

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleEdit = (task) => {
    setOpenAddEditModal({ isShown: true, data: task, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "" });
  };

  const deleteTask = async (task) => {
    try {
      const response = await axiosInstance.delete(`/delete-task/${task._id}`);
      if (response.data && !response.data.error) {
        showToastMessage("Task Deleted Successfully", "delete");
        getAllTasks();
      }
    } catch {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const updateIsCompleted = async (task) => {
    try {
      const response = await axiosInstance.put(
        `/update-task-completed/${task._id}`,
        {
          isCompleted: !task.isCompleted,
        }
      );
      if (response.data && response.data.task) {
        showToastMessage("Task Updated Successfully");
        getAllTasks();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateIsPinned = async (task) => {
    try {
      const response = await axiosInstance.put(
        `/update-task-pinned/${task._id}`,
        {
          isPinned: !task.isPinned,
        }
      );
      if (response.data && response.data.task) {
        showToastMessage("Task Updated Successfully");
        getAllTasks();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/get-all-tasks");
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="flex h-screen pt-15">
      {/* Navbar on the left */}
      <div className="w-20">
        <Nav />
      </div>

      {/* Calendar in the center */}
      <div className="flex-1">
        <CalendarApp tasks={tasks} />
      </div>

      {/* Right panel with Add Task above Task Lists */}
      <div className="w-1/6 flex flex-col p-4">
        {/* Add Task Section */}
        <div className="pb-10">
          <div className="flex items-center justify-between">
            <h1>Add Task</h1>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setOpenAddEditModal({ isShown: true, type: "add", data: null });
              }}
            >
              <MdAdd className="text-white text-[24px]" />
            </button>
          </div>
        </div>

        {/* Incomplete Tasks Section */}
        <div className="pb-10">
          <h1>Task List</h1>
          {incompleteTasks.length > 0 ? (
            <ul>
              {incompleteTasks.map((task) => (
                <NoteCard
                  key={task._id}
                  title={task.title}
                  content={task.content}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  reminderTime={task.reminderTime}
                  isPinned={task.isPinned}
                  isCompleted={task.isCompleted}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => deleteTask(task)}
                  onPinNote={() => updateIsPinned(task)}
                  onToggleComplete={() => updateIsCompleted(task)}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">Task list is empty</p>
          )}
        </div>

        {/* Completed Tasks Section */}
        <div className="pb-10">
          <h1>Completed Tasks</h1>
          {completedTasks.length > 0 ? (
            <ul>
              {completedTasks.map((task) => (
                <NoteCard
                  key={task._id}
                  title={task.title}
                  content={task.content}
                  tags={task.tags}
                  dueDate={task.dueDate}
                  reminderTime={task.reminderTime}
                  isPinned={task.isPinned}
                  isCompleted={task.isCompleted}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => deleteTask(task)}
                  onToggleComplete={() => updateIsCompleted(task)}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">Completed task list is empty</p>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 1000,
          },
          content: {
            zIndex: 1001,
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-16 p-5 overflow-scroll"
      >
        <AddEditTasks
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTasks={getAllTasks}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* Toast */}
      <div className="fixed top-4 right-4 z-50">
        <Toast
          isShown={showToastMsg.isShown}
          message={showToastMsg.message}
          type={showToastMsg.type}
          onClose={handleCloseToast}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
