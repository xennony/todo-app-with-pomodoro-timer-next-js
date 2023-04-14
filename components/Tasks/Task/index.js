import { React, useState } from "react";

const Task = ({
  id,
  name,
  is_checked,
  toggleCheck,
  deleteTask,
  updateTask,
}) => {
  // добавляем состояние для режима редактирования и функцию для его изменения
  const [isEditing, setIsEditing] = useState(false);

  // добавляем состояние для нового значения инпута и функцию для его изменения
  const [newValue, setNewValue] = useState(name);

  // добавляем функцию для переключения режима редактирования
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // добавляем функцию для переключения режима редактирования
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // добавляем функцию для обработки изменения инпута
  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  // добавляем функцию для обработки нажатия на Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // вызываем функцию для обновления задачи в массиве data по id и новому значению
      updateTask(id, newValue);
      // выключаем режим редактирования
      setIsEditing(false);

    }
  };

  return (
    <div>
      <div className="flex justify-between hover:bg-[#e8e8e8] ease-in-out duration-150 p-4 rounded-xl">
        {/* добавляем условный рендеринг для параграфа с названием задачи */}
        {isEditing ? (
          <input
            value={newValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="font-medium min-w-[650px] bg-[#e8e8e8] outline-none"
            autoFocus
          />
        ) : (
          <p className="font-medium max-w-[600px]">{name}</p>
        )}

        <div className="flex items-center">
          <label className="flex cursor-pointer gap-2">
            <input
              checked={is_checked}
              onChange={() => toggleCheck(id)}
              type="checkbox"
              className="checkbox checked:bg-black checked:border-black"
            />
          </label>
          <div className="popover">
            <svg
              popover-trigger
              tabIndex="0"
              className="popover-trigger ml-[20px] outline-none"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <div
              className="popover-content popover-top-left items-center w-[140px] mr-[-5px]"
              tabIndex="0"
            >
              <div className="popover-arrow mr-[-10px]"></div>
              <button
                onClick={handleEditClick}
                className="btn px-2 w-[100px] bg-blue-500 text-white rounded-xl mb-[5px]"
              >
                Edit
              </button>

              {isEditing ? (
                <button
                  onClick={toggleEdit}
                  className="btn px-2 w-[100px] bg-red-500 text-white
                  rounded-xl"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => deleteTask(id)}
                  className="btn px-2 w-[100px] bg-red-500 text-white rounded-xl"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
