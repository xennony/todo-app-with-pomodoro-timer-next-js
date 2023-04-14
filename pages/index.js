import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { React, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Components
import Pomidoro from "/components/Pomidoro";
import Tasks from "/components/Tasks";

console.log("process.env.SUPABASE_URL: " + process.env.SUPABASE_URL);
// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default function Home() {
  const [dataMain, setData] = useState([]);

  /* const [data, setData] = useState([
    { id: 1, name: "Решить математические примеры", is_checked: false },
    { id: 2, name: "Поучаствовать в онлайн-киноклубе", is_checked: false },
    { id: 3, name: "Запастись свежей выпечкой", is_checked: false },
    { id: 4, name: "Написать сочинение по литературе", is_checked: false },
    { id: 5, name: "Просмотреть новый сериал на Netflix", is_checked: false },
    { id: 7, name: "Сходить в булочную за багетом", is_checked: false },
  ]); */


  /*useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("data"));
    if (items) {
      setData(items);
    }
  }, []);*/

  useEffect(() => {
    // Fetch data from the Supabase table
    const fetchData = async () => {
      const { data: tasks, error } = await supabase
        .from("data")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.log("Error fetching tasks:", error.message);
      } else {
        setData(tasks);
      }
    };

    fetchData();
  }, []);

  const [taskName, setTaskName] = useState(""); // Текст задачи

  const [activeTab, setActiveTab] = useState("Focus");

  const addTask = async (taskName) => {
    // Insert a new task into the Supabase table
    const { data: newTask, error } = await supabase
      .from("data")
      .insert({ name: taskName, is_checked: false })
      .single();
  
    if (error) {
      console.log("Error adding task:", error.message);
    } else {
      // Check if newTask has the correct properties
      console.log("New task:", newTask);
  
      // Check if the name property is not empty or undefinedЦ
      if (newTask && newTask.name) {
        setData((prev) => [...prev, newTask]); // Update dataMain with new task
      } else {
        console.log("New task name is empty or undefined");
      }
    }
  
    setTaskName("");
  };


  /*const addTask = (taskName) => {
    // Находим максимальный id в массиве data
    const maxId = Math.max(...data.map((task) => task.id));
    // Создаем новую задачу в виде объекта с полями id, name и is_checked
    const newTask = {
      id: maxId + 1,
      name: taskName,
      is_checked: false,
    };
    // Добавляем новую задачу в массив data
    console.log("Before adding new task:", data);
    setData((prev) => [...prev, newTask]);
    console.log("After adding new task:", data);
    // Сохраняем обновленное значение data в localStorage
    localStorage.setItem("data", JSON.stringify([...data, newTask]));

    setTaskName("");
  };*/

  // Функция для изменения значения is_checked по id задачи

  const toggleCheck = async (id) => {
    // Update the is_checked field of the task with the given id
    const { error } = await supabase
      .from("data")
      .update({ is_checked: !dataMain.find((task) => task.id === id).is_checked })
      .eq("id", id);
  
    if (error) {
      console.log("Error updating task:", error.message);
    } else {
      setData((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, is_checked: !task.is_checked } : task
        )
      );
    }
  };
  
  
  /*const toggleCheck = (id) => {
    // Создаем новый массив data с обновленными значениями is_checked
    const newData = data.map((task) => {
      if (task.id === id) {
        // Меняем значение is_checked на противоположное для задачи с нужным id
        return { ...task, is_checked: !task.is_checked };
      } else {
        // Оставляем значение is_checked без изменений для остальных задач
        return task;
      }
    });
    // Обновляем состояние data новым массивом
    setData(newData);
  };*/

  // Функция для удаления задачи по id
  const deleteTask = async (id) => {
    // Delete the task with the given id from the Supabase table
    const { error } = await supabase.from("data").delete().eq("id", id);
  
    if (error) {
      console.log("Error deleting task:", error.message);
    } else {
      setData((prev) => prev.filter((task) => task.id !== id));
    }
  };
  /*const deleteTask = (id) => {
    // Создаем новый массив data без задачи с нужным id
    const newData = data.filter((task) => task.id !== id);
    // Обновляем состояние data новым массивом
    setData(newData);
  };*/

  return (
    <>
      <Head>
        <title>To Do app with Pomidoro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[800px] px-4 mx-auto">
        <div className="flex justify-center mt-[50px]">
          <div className="tabs gap-1">
            <div
              className={`text-[16px] tab tab-pill ${
                activeTab === "Focus" ? "tab-active font-medium" : ""
              }`}
              onClick={() => setActiveTab("Focus")}
            >
              Focus
            </div>
            <div
              className={`text-[16px] tab tab-pill ${
                activeTab === "Break" ? "tab-active font-medium" : ""
              }`}
              onClick={() => setActiveTab("Break")}
            >
              Break
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-[40px] mb-[30px]">
          <Image src="/assets/home.png" width={200} height={200} alt="home" />
        </div>

        <Pomidoro activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex sticky top-0 bg-[#fcfcfc] pt-[20px] z-10">
          <input
            className="input input-block mb-[20px] "
            placeholder="Enter a new task"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" ? addTask(taskName.trim()) : ""
            }
          />
          <button
            onClick={() => addTask(taskName.trim())}
            className="btn px-3 ml-[10px] bg-black text-white rounded-3xl"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <Tasks
          data={dataMain}
          setData={setData}
          toggleCheck={toggleCheck}
          deleteTask={deleteTask}

        />
      </main>
      <div className="fixed bottom-0 left-0 border-[1px] backdrop-blur-sm bg-[#fcfcfc] w-full py-4 px-8 flex justify-between">
        <p className="opacity-30">by xennony</p>
        <a
          target="_blank"
          href="https://github.com/xennony/todo-app-with-pomodoro-timer-next-js"
        >
          <Image
            src="assets/github-mark.svg"
            width={25}
            height={25}
            className="opacity-30"
            alt="Home"
          />
        </a>
      </div>
    </>
  );
}
