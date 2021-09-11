import { useState, useEffect } from "react";
import Header from "../Components/header/Header";
import styles from "../styles/styles.module.css";
import PlannerView from "../Components/PlannerView/PlannerView";

import { ListModel, Task } from "../Models/TaskInterfaces";

let df = new Intl.DateTimeFormat("US", {
  hour: "2-digit",
  minute: "2-digit",
});

const getTime = (date?: Date) => {
  if (!date) return "";
  return df.format(date);
};

interface HomeState {
  tasklist: Array<ListModel>;
  showModal: boolean;
}
const home = () => {
  const [state, setstate] = useState<HomeState>({
    tasklist: [
      {
        date: new Date("2021-09-11T07:37:02.624Z"),
        tasks: [
          {
            date: new Date("2021-09-11T07:37:02.624Z"),
            name: "aaa",
            start: new Date("2021-09-11T07:37:02.000Z"),
            end: new Date("2021-09-11T08:37:02.000Z"),
          },
          {
            date: new Date("2021-09-11T07:38:47.622Z"),
            name: "bbb",
            start: new Date("2021-09-11T07:38:47.000Z"),
            end: new Date("2021-09-11T07:38:47.000Z"),
          },
          {
            date: new Date("2021-09-11T07:38:57.242Z"),
            name: "cccc",
            start: new Date("2021-09-11T07:38:57.000Z"),
            end: new Date("2021-09-11T07:38:57.000Z"),
          },
          {
            date: new Date("2021-09-11T07:39:22.759Z"),
            name: "tt",
            start: new Date("2021-09-11T07:39:22.000Z"),
            end: new Date("2021-09-11T07:39:22.000Z"),
          },
        ],
      },
      {
        date: new Date("2021-09-11T18:30:00.000Z"),
        tasks: [
          {
            date: new Date("2021-09-11T18:30:00.000Z"),
            name: "ccc",
            start: new Date("2021-09-11T18:30:00.000Z"),
            end: new Date("2021-09-11T18:30:00.000Z"),
          },
          {
            date: new Date("2021-09-11T18:30:00.000Z"),
            name: "ccc",
            start: new Date("2021-09-11T18:30:00.000Z"),
            end: new Date("2021-09-11T18:30:00.000Z"),
          },
          {
            date: new Date("2021-09-11T18:30:00.000Z"),
            name: "ccc",
            start: new Date("2021-09-11T18:30:00.000Z"),
            end: new Date("2021-09-11T18:30:00.000Z"),
          },
          {
            date: new Date("2021-09-11T18:30:00.000Z"),
            name: "ccc",
            start: new Date("2021-09-11T18:30:00.000Z"),
            end: new Date("2021-09-11T18:30:00.000Z"),
          },
        ],
      },
    ],
    showModal: false,
  });

  const addTask = (obj: Task) => {
    let list = state.tasklist;
    let index = state.tasklist.findIndex(
      (o: ListModel) =>
        o.date?.toLocaleDateString() === obj?.date?.toLocaleDateString()
    );
    if (index !== -1) {
      list[index].tasks?.push(obj);
    } else {
      let model: ListModel = {
        date: obj.date,
        tasks: [obj],
      };
      list.push(model);
    }
    setstate({ ...state, tasklist: list, showModal: false });
  };

  return (
    <div className="w-screen h-screen bg-green-50 flex flex-col items-center justify-center">
      <Header />
      <div className="w-full overflow-scroll flex-1 flex flex-col items-center justify-center">
        <ul className="overflow-scroll h-full">
          {state?.tasklist.map((obj: ListModel, i: number) => (
            <li key={i} className="mb-10">
              <div className="text-lg font-bold text-black mb-4">
                {obj.date?.toLocaleDateString()}
              </div>
              {obj.tasks?.map((task: Task, i: number) => (
                <div
                  key={i}
                  className={`mb-2 rounded-lg bg-white w-full bg-row-green h-16 flex items-center px-3 justify-between ${styles.shadow} ${styles.ul}`}
                >
                  <div className="text-white font-bold">{task.name}</div>
                  <div className="text-white font-bold">{`${getTime(
                    task.start
                  )} to ${getTime(task.end)}`}</div>
                </div>
              ))}
            </li>
          ))}
        </ul>
        <div
          className="cursor-pointer absolute right-10 bottom-10 flex flex-col items-center justify-center"
          onClick={() => setstate({ ...state, showModal: !state.showModal })}
        >
          <img width="50px" height="50px" src="/images/add-icon.png" />
          {/* <div className="text-center">Add a task</div> */}
        </div>
      </div>
      {state?.showModal ? (
        <PlannerView className="absolute top-32" onAdd={addTask} />
      ) : null}
    </div>
  );
};

export default home;
