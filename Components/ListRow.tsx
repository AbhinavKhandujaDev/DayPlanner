import { memo } from "react";
import { Task } from "../Models/TaskInterfaces";
import styles from "../styles/styles.module.css";
import { getTime } from "../helper";

const ListRow = (props: any) => {
  const { obj, i, onEditClick, onDeleteClick } = props;
  return (
    <li key={i} className={`${styles.listanim} mb-10`}>
      <div className="text-lg font-bold text-black mb-4">
        {obj.date?.toLocaleDateString()}
      </div>
      {obj.tasks?.map((task: Task, i: number) => (
        <div
          key={i}
          className={`mb-2 rounded-lg bg-white w-full bg-row-green h-16 flex items-center px-3 justify-between shadow ${styles.ul}`}
        >
          <div className="truncate text-white font-bold">{task.name}</div>
          <div className="text-white font-bold flex flex-shrink-0">
            {`${getTime(task.start)} to ${getTime(task.end)}`}{" "}
            <img
              className="ml-5 cursor-pointer"
              width="20px"
              height="20px"
              src="/images/edit-icon.svg"
              alt=""
              onClick={() => onEditClick && onEditClick(task, i)}
            />
            <img
              className="ml-2 cursor-pointer"
              width="20px"
              height="20px"
              src="/images/delete-icon.png"
              alt=""
              onClick={() => onDeleteClick && onDeleteClick(i)}
            />
          </div>
        </div>
      ))}
    </li>
  );
};

export default memo(ListRow);
