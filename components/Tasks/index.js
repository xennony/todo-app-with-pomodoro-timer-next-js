import { React, useState } from "react";

// Componets
import Task from "./Task";

const Tasks = ({ data, setData, toggleCheck, deleteTask }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  // добавляем функцию для обновления задачи в массиве data по id и новому значению
  const updateTask = (id, newValue) => {
    // находим индекс задачи в массиве по id
    const index = data.findIndex((task) => task.id === id);
    // копируем массив data
    const newData = [...data];
    // обновляем название задачи в копии массива по индексу и новому значению
    newData[index].name = newValue;
    // устанавливаем новое состояние для data из копии массива
    setData(newData);
  };

  // добавляем функцию для изменения выбранной вкладки
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // выносим объявление переменной filteredTasks за пределы JSX-выражения
  const filteredTasks = data.filter(
    (task) => selectedTab === "All" || task.is_checked === true
  );

  // выносим объявление переменной hasDoneTasks за пределы JSX-выражения
  const hasDoneTasks = filteredTasks.some((task) => task.is_checked === true);

  // выносим условный оператор if за пределы JSX-выражения и присваиваем результат переменной tasksToRender
  let tasksToRender;
  if (selectedTab === "Done" && !hasDoneTasks) {
    tasksToRender = (
      <p className="text-center mt-[20px] opacity-50">No done tasks</p>
    );
  } else {
    tasksToRender = filteredTasks
      .map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            is_checked={task.is_checked}
            toggleCheck={toggleCheck}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        );
      })
      .reverse();
  }

  return (
    <div className="pb-[80px]">
      {data.length ? (
        <h3 className="text-[24px] font-bold mb-[20px]">Tasks</h3>
      ) : (
        ""
      )}
      <div class="tabs gap-1 mb-[20px]">
        {/* добавляем обработчик клика и классы для активной вкладки */}
        <div
          class={`text-[16px] tab tab-pill ${
            selectedTab === "All" ? "tab-active font-medium" : ""
          }`}
          onClick={() => handleTabChange("All")}
        >
          All
        </div>
        <div
          class={`text-[16px] tab tab-pill ${
            selectedTab === "Done" ? "tab-active font-medium" : ""
          }`}
          onClick={() => handleTabChange("Done")}
        >
          Done
        </div>
      </div>

      <div>
        {data.length ? (
          // рендерим переменную tasksToRender
          tasksToRender
        ) : (
          <p className="text-center mt-[20px] opacity-50">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
