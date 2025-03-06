import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditTasks from "./AddEditTasks";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddTaskImg from "../../assets/images/add_task.svg";
import NoDataImg from "../../assets/images/no_task.svg";
import Sidebar from "../../components/Sidebar/Sidebar";
import GreetingCard from "../../components/GreetingCard/GreetingCard"; // Import the GreetingCard component
import Habits from "../../components/Habits/Habits"; // Import the Habits component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const [allTasks, setAllTasks] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "" });
  };

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all tasks
  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/get-all-tasks");

      if (response.data && response.data.tasks) {
        setAllTasks(response.data.tasks);
      }
    } catch {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  // Delete task
  const deleteTask = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-task/${data._id}`);

      if (response.data && !response.data.error) {
        showToastMessage("Task Deleted Successfully", "delete");
        getAllTasks();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Search for tasks
  const onSearchTask = async (query) => {
    try {
      const response = await axiosInstance.get("/search-tasks", {
        params: { query },
      });

      if (response.data && response.data.tasks) {
        setIsSearch(true);
        setAllTasks(response.data.tasks);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateIsPinned = async (noteData) => {
    const taskId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/update-task-pinned/${taskId}`,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.task) {
        showToastMessage("Task Updated Successfully");
        getAllTasks();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateIsCompleted = async (noteData) => {
    const taskId = noteData._id;
    try {
      const response = await axiosInstance.put(
        `/update-task-completed/${taskId}`,
        {
          isCompleted: !noteData.isCompleted,
        }
      );

      if (response.data && response.data.task) {
        showToastMessage("Task Updated Successfully");
        getAllTasks();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleclearSearch = () => {
    setIsSearch(false);
    getAllTasks();
  };

  useEffect(() => {
    getAllTasks();
    getUserInfo();
    return () => {};
  }, []);

  const incompleteTasks = allTasks.filter((task) => !task.isCompleted);
  const completedTasks = allTasks.filter((task) => task.isCompleted);

  const [habits, setHabits] = useState([
    { name: "Sketch", progress: 1, goal: 4 },
    { name: "Pray", progress: 2, goal: 4 },
    { name: "Exercise", progress: 1, goal: 1 },
    { name: "Journal", progress: 1, goal: 1 },
  ]);

  const toggleHabit = (index) => {
    const newHabits = [...habits];
    if (newHabits[index].progress < newHabits[index].goal) {
      newHabits[index].progress += 1;
    }
    setHabits(newHabits);
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchTask={onSearchTask}
        handleclearSearch={handleclearSearch}
        showSearchBar={true}
      />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 container mx-auto">
          {userInfo && <GreetingCard username={userInfo.fullName} />}{" "}
          {/* Display the GreetingCard */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-xl">
            <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
            {incompleteTasks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {incompleteTasks.map((item, index) => (
                  <NoteCard
                    key={item._id}
                    title={item.title}
                    content={item.content}
                    tags={item.tags}
                    dueDate={item.dueDate} // Ensure dueDate is passed here
                    reminderTime={item.reminderTime} // Pass reminderTime here
                    isPinned={item.isPinned}
                    isCompleted={item.isCompleted}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => deleteTask(item)}
                    onPinNote={() => updateIsPinned(item)}
                    onToggleComplete={() => updateIsCompleted(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={isSearch ? NoDataImg : AddTaskImg}
                message={
                  isSearch
                    ? `Oops! No tasks found matching your search.`
                    : `Let’s get things rolling! Click ‘Add’ to create your first task—whether it’s big or small, every step counts!`
                }
              />
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
            {completedTasks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {completedTasks.map((item, index) => (
                  <NoteCard
                    key={item._id}
                    title={item.title}
                    content={item.content}
                    tags={item.tags}
                    dueDate={item.dueDate} // Ensure dueDate is passed here
                    reminderTime={item.reminderTime} // Pass reminderTime here
                    isPinned={item.isPinned}
                    isCompleted={item.isCompleted}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => deleteTask(item)}
                    // onPinNote={() => updateIsPinned(item)}
                    onToggleComplete={() => updateIsCompleted(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={isSearch ? NoDataImg : AddTaskImg}
                message={
                  isSearch
                    ? `No completed tasks found.`
                    : `Complete a task to see it here!`
                }
              />
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Your Habits</h2>
            <Habits habits={habits} toggleHabit={toggleHabit} />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="relative group">
          <button
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-10 bottom-10"
            onClick={() => {
              setOpenAddEditModal({ isShown: true, type: "add", data: null });
            }}
          >
            <div className="relative">
              <MdAdd className="text-white text-[32px]" />
              <span className="absolute right-full mr-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white text-sm rounded py-1 px-2">
                New Task
              </span>
            </div>
          </button>
        </div>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
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

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
