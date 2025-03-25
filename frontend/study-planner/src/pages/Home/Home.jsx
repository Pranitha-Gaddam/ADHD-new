// filepath: c:\Users\thien\Downloads\ADHD-0324\ADHD-main\frontend\study-planner\src\pages\Home\Home.jsx
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
import GreetingCard from "../../components/GreetingCard/GreetingCard"; // Import the GreetingCard component
import Habits from "../../components/Habits/Habits"; // Import the Habits component
import Nav from "../../components/Navbar/Nav";
import "react-toastify/dist/ReactToastify.css";
import AddEditHabits from "../../components/Habits/AddEditHabits";
import Tooltip from "../../components/Tooltip/Tooltip"; // Import the Tooltip component

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openAddEditHabitModal, setOpenAddEditHabitModal] = useState({
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
  const [allHabits, setAllHabits] = useState([]);

  const [isSearch, setIsSearch] = useState(false);
  const [notifiedTasks, setNotifiedTasks] = useState([]);
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

  const checkDueDates = () => {
    const now = new Date();
    const notificationThreshold = 15 * 60 * 1000; // 15 minutes before due date

    console.log("Checking due dates at:", format(now, "yyyy-MM-dd HH:mm"));
    console.log("Total tasks:", allTasks.length);

    allTasks.forEach((task) => {
      console.log(`Task: ${task.title}, ID: ${task._id}`);
      console.log("Due Date Raw:", task.dueDate);

      if (task.dueDate && !task.isCompleted && !notifiedTasks.includes(task._id)) {
        const dueDate = parseISO(task.dueDate); // Parse ISO string as UTC
        const timeDifference = dueDate - now;

        console.log(
          `Due: ${format(dueDate, "yyyy-MM-dd HH:mm")}, Time Diff: ${(
            timeDifference / 1000
          ).toFixed(0)} seconds`
        );

        if (timeDifference >= 0 && timeDifference <= notificationThreshold) {
          showToastMessage(
            `Task "${task.title}" is due in 15 minutes! Due: ${format(
              dueDate,
              "yyyy-MM-dd HH:mm"
            )}`,
            "warning"
          );
          setNotifiedTasks((prev) => [...prev, task._id]);
        } else {
          console.log("Task not within 15-minute threshold");
        }
      } else {
        console.log("Task skipped: No due date, completed, or already notified");
      }
    });
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
        checkDueDates();
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

  // get all habits
  const getAllHabits = async () => {
    try {
      const response = await axiosInstance.get("/get-all-habits");
      if (response.data && response.data.habits) {
        setAllHabits(response.data.habits);
      }
    } catch {
      console.log("An expected error occurred. Please try again.");
    }
  };

  const handleclearSearch = () => {
    setIsSearch(false);
    getAllTasks();
  };

  // Handle edit habit
  const handleEditHabit = (habitDetails) => {
    setOpenAddEditHabitModal({
      isShown: true,
      data: habitDetails,
      type: "edit",
    });
  };

  // Delete habit
  const deleteHabit = async (data) => {
    const habitId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-habit/" + habitId);
      if (response.data && !response.data.error) {
        getAllHabits();
        showToastMessage("Habit Deleted Successfully!", "delete");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An expected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    getAllTasks();
    getUserInfo();
    getAllHabits();

    const intervalId = setInterval(() => {
      getAllTasks;
    }, 60 * 1000); // Check due dates every minute.

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const incompleteTasks = allTasks.filter((task) => !task.isCompleted);
  const completedTasks = allTasks.filter((task) => task.isCompleted);

  return (
    <div className="min-h-screen flex flex-col z-40">
      <div className="h-35">
        <Navbar
          userInfo={userInfo}
          onSearchTask={onSearchTask}
          handleclearSearch={handleclearSearch}
          showSearchBar={true}
        />
      </div>

      <div className="flex-1 flex flex-row">
        {/* <Nav /> */}
        <div className="w-20 ml-4">
          <Nav />
        </div>

        <div className="flex-1">
          {userInfo && <GreetingCard username={userInfo.fullName} />}{" "}
          {/* Display the GreetingCard */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">My Tasks</h2>
              <div className="relative group">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    setOpenAddEditModal({
                      isShown: true,
                      type: "add",
                      data: null,
                    });
                  }}
                >
                  <MdAdd className="text-white text-[20px]" />
                </button>
                <Tooltip text="Add Task" />
              </div>
            </div>
            {incompleteTasks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {incompleteTasks.map((item) => (
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
                    : `Create your first task—whether it’s big or small, every step counts!`
                }
              />
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-xl">
            <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
            {completedTasks.length > 0 ? (
              <div className="flex flex-col gap-4">
                {completedTasks.map((item) => (
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
            <div className="flex gap-4 mt-2 overflow-x-auto">
              <button
                onClick={() => {
                  setOpenAddEditHabitModal({
                    isShown: true,
                    type: "add",
                    data: null,
                  });
                }}
                className="flex flex-col items-center p-4 bg-white rounded-lg relative group"
              >
                <div className="w-16 h-16 flex items-center justify-center text-lg font-bold border-4 border-gray-700 rounded-full hover:bg-gray-300">
                  <MdAdd className="text-[32px] text-gray-700" />
                </div>
                <span className="text-sm mt-1">Add Habit</span>
              </button>
              {allHabits.map((item) => (
                <Habits
                  key={item._id}
                  name={item.name}
                  repeat={item.repeat}
                  progress={item.progress}
                  goal={item.goal}
                  color={item.color}
                  notify={item.notify}
                  onEditHabit={() => handleEditHabit(item)}
                  onDeleteHabit={() => deleteHabit(item)}
                  onToggleHabit={() => {}}
                />
              ))}
            </div>
          </div>
          <Modal
            isOpen={openAddEditHabitModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
            contentLabel=""
            className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-16 p-5 overflow-scroll"
          >
            <AddEditHabits
              type={openAddEditHabitModal.type}
              habitData={openAddEditHabitModal.data}
              onClose={() => {
                setOpenAddEditHabitModal({
                  isShown: false,
                  type: "add",
                  data: null,
                });
              }}
              getAllHabits={getAllHabits}
              showToastMessage={showToastMessage}
            />
          </Modal>
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
    </div>
  );
};

export default Home;
