import { useEffect, useState, memo } from "react";
import Header from "../Components/header/Header";
import styles from "../styles/styles.module.css";
import PlannerView from "../Components/PlannerView/PlannerView";
import Modal from "../Components/Modal";
import { ListModel, Task } from "../Models/TaskInterfaces";
import { getTime, getDifference } from "../helper";
import Chart from "react-google-charts";

interface HomeState {
  tasklist: Array<ListModel>;
  showPlannerView: boolean;
  showPieChart: boolean;
  selectedTask?: Task | null;
}

const getPieChartData = (list: ListModel[]) => {
  let tasks = list.map((o: ListModel) => o.tasks).flat();
  return tasks?.map((task) => {
    return [task?.name, getDifference(task?.start, task?.end)];
  });
};

const ListRow = memo((props: any) => {
  const { obj, i, onEditClick } = props;
  return (
    <li key={i} className="mb-10">
      <div className="text-lg font-bold text-black mb-4">
        {obj.date?.toLocaleDateString()}
      </div>
      {obj.tasks?.map((task: Task, i: number) => (
        <div
          key={i}
          className={`truncate mb-2 rounded-lg bg-white w-full bg-row-green h-16 flex items-center px-3 justify-between shadow ${styles.ul}`}
        >
          <div className="text-white font-bold">{task.name}</div>
          <div className="text-white font-bold flex">
            {`${getTime(task.start)} to ${getTime(task.end)}`}{" "}
            <img
              className="ml-5 cursor-pointer"
              width="20px"
              height="20px"
              src="/images/edit-icon.svg"
              alt=""
              onClick={() => onEditClick && onEditClick(task)}
            />
          </div>
        </div>
      ))}
    </li>
  );
});

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
    showPlannerView: false,
    showPieChart: false,
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
    setstate({ ...state, tasklist: list, showPlannerView: false });
  };

  useEffect(() => {
    console.log(getPieChartData(state.tasklist));
  }, []);

  return (
    <div className="w-screen h-screen bg-green-50 flex flex-col items-center justify-start">
      <Header />
      <div className="w-full overflow-scroll flex-1 flex flex-col items-center justify-start p-10">
        <ul className="">
          {state?.tasklist.map((obj: ListModel, i: number) => (
            <ListRow
              obj={obj}
              key={i}
              onEditClick={(task: Task) =>
                setstate({
                  ...state,
                  selectedTask: task,
                  showPlannerView: true,
                })
              }
            />
          ))}
        </ul>
      </div>
      <div className="shadow bg-green-50 absolute right-16 bottom-10 flex items-center justify-center px-2 rounded-full">
        <img
          className="rounded-full cursor-pointer m-2"
          width="40px"
          height="40px"
          src="/images/pie-chart.png"
          onClick={() => setstate({ ...state, showPieChart: true })}
        />
        <img
          className="rounded-full cursor-pointer object-cover m-2"
          width="50px"
          height="50px"
          src="/images/add-icon.png"
          onClick={() => setstate({ ...state, showPlannerView: true })}
        />
        {/* <div className="text-center">Add a task</div> */}
      </div>
      {state?.showPlannerView ? (
        <Modal
          onClick={() =>
            setstate({ ...state, showPlannerView: false, selectedTask: null })
          }
        >
          <PlannerView
            className={`${styles.planneranim}`}
            data={state.selectedTask}
            onAdd={addTask}
          />
        </Modal>
      ) : null}
      {state?.showPieChart ? (
        <Modal onClick={() => setstate({ ...state, showPieChart: false })}>
          <div className={`${styles.planneranim} rounded-xl overflow-hidden`}>
            <Chart
              className="bg-gray-50"
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ...getPieChartData(state.tasklist),
              ]}
              // data={[
              //   ["Task", "Hours per Day"],
              //   ["Work", 11],
              //   ["Eat", 2],
              //   ["Commute", 2],
              //   ["Watch TV", 2],
              //   ["Sleep", 7],
              // ]}
              // data={[
              //   ["Task", "Hours per Day"],
              //   [
              //     ["aaa", 60],
              //     ["bbb", 0],
              //     ["cccc", 0],
              //     ["tt", 0],
              //     ["ccc", 0],
              //     ["ccc", 0],
              //     ["ccc", 0],
              //     ["ccc", 0],
              //   ],
              // ]}
              options={{
                title: "Task Breakdown in min(s)",
                backgroundColor: "#f9fafb",
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default home;
