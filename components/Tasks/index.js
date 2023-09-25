import { React, useState, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Task from "./Task";
import Pagination from "../Pagination";

const Tasks = ({ data, setData, toggleCheck, deleteTask, totalCount }) => {
  console.log("Tasks component rendered with data:", data);

  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  const [selectedTab, setSelectedTab] = useState("All");
  const [parent] = useAutoAnimate();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 15;
  
  const filteredTasks = data.filter(
    (task) => selectedTab === "All" || task && task.is_checked === true
  );
  
  const tasksToShow = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  console.log("tasksToShow:", tasksToShow);

  const updateTask = (id, newValue) => {
    const index = data.findIndex((task) => task.id === id);
    const newData = [...data];
    newData[index].name = newValue;
    console.log("data:", data);
    console.log("newData:", newData);
    setData(newData);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handlePageChange = (data) => {
    setCurrentPage(data);
  };

  const hasDoneTasks = filteredTasks.some((task) => task && task.is_checked === true);

  let tasksToRender;
  if (selectedTab === "Done" && !hasDoneTasks) {
    tasksToRender = (
      <p className="text-center mt-[20px] opacity-50">No done tasks</p>
    );
  } else {
  
    tasksToRender = tasksToShow.map((task) => (
      <Task
        key={task?.id}
        id={task?.id}
        name={task?.name}
        is_checked={task?.is_checked}
        toggleCheck={toggleCheck}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    )).reverse();
  }

  return (
    <div className="pb-[20px]">
      {data.length ? (
        <h3 className="text-[24px] font-bold mb-[20px]">Tasks</h3>
      ) : (
        ""
      )}
      <div className="tabs gap-1 mb-[20px]">
        <div
          className={`text-[16px] tab tab-pill ${
            selectedTab === "All" ? "tab-active font-medium" : ""
          }`}
          onClick={() => handleTabChange("All")}
        >
          All
        </div>
        <div
          className={`text-[16px] tab tab-pill ${
            selectedTab === "Done" ? "tab-active font-medium" : ""
          }`}
          onClick={() => handleTabChange("Done")}
        >
          Done
        </div>
      </div>

      <div ref={parent}>
        {data.length ? (
          tasksToRender
        ) : (
          <p className="text-center mt-[20px] opacity-50">No tasks</p>
        )}
      </div>
      {console.log(filteredTasks.length)}
      {filteredTasks.length >= 15 ? (
        <Pagination
          totalCount={filteredTasks.length} 
          pageSize={pageSize} 
          onPageChange={handlePageChange}         
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Tasks;
