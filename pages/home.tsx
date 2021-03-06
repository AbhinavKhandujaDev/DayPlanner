import { useEffect, useState, memo } from "react";
import Header from "../Components/header/Header";
import styles from "../styles/styles.module.css";
import PlannerView from "../Components/PlannerView/PlannerView";
import Modal from "../Components/Modal";
import ListRow from "../Components/ListRow";
import { ListModel, Task } from "../Models/TaskInterfaces";
import { getDifference } from "../helper";
import Chart from "react-google-charts";

const updateStorage = async (tasks: ListModel[]) => {
  let arr = JSON.stringify(tasks);
  localStorage.setItem("tasks", arr);
};

interface HomeState {
  loading: boolean;
  tasklist: Array<ListModel>;
  showPlannerView: boolean;
  showPieChart: boolean;
  selectedTask?: any | null;
}

const home = () => {
  const [state, setstate] = useState<HomeState>({
    tasklist: [],
    showPlannerView: false,
    showPieChart: false,
    loading: true,
  });

  useEffect(() => {
    (async () => {
      let savedTasks = localStorage.getItem("tasks") || [];
      if (savedTasks.length === 0) {
        setstate({ ...state, loading: false });
        return;
      }
      let arr = JSON.parse(`${savedTasks}`) || [];
      let newArr = arr.map((item: any) => {
        item.date = new Date(item.date);
        let tasks = item.tasks?.map((obj: any) => {
          obj.date = new Date(obj.date);
          obj.start = new Date(obj.start);
          obj.end = new Date(obj.end);
          return obj;
        });
        item.tasks = tasks;
        return item;
      });
      setstate({ ...state, tasklist: newArr, loading: false });
    })();
  }, []);

  useEffect(() => {
    if (state.loading) return;
    updateStorage(state.tasklist);
  }, [state.tasklist]);

  const getPieChartData = (list: ListModel[]) => {
    let tasks = list.map((o: ListModel) => o.tasks).flat();
    return tasks?.map((task) => {
      return [task?.name, getDifference(task?.start, task?.end)];
    });
  };

  const addTask = (obj: Task) => {
    let list = [...state.tasklist];
    let index = list.findIndex(
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

  const updateTask = (obj: Task, section: number, item: number) => {
    let list = [...state.tasklist];
    let oldTask = list[section].tasks![item];
    if (oldTask.date === obj.date) {
      list[section].tasks![item] = obj;
      setstate({ ...state, tasklist: list, showPlannerView: false });
    } else {
      list[section].tasks?.splice(item, 1);
      if (list[section].tasks?.length === 0) {
        list.splice(section, 1);
      }
      addTask(obj);
    }
  };
  return (
    <div className="w-screen h-screen bg-green-50 flex flex-col items-center justify-start">
      <Header />
      <div className="w-full overflow-scroll flex-1 flex flex-col items-center justify-start p-10">
        {state?.tasklist.length === 0 ? (
          <div className="text-5xl mt-32 text-gray-500">No tasks yet</div>
        ) : (
          <ul className={styles.ul}>
            {state?.tasklist?.map((obj: ListModel, i: number) => (
              <ListRow
                obj={obj}
                key={i}
                onEditClick={(task: Task, indx: number) =>
                  setstate({
                    ...state,
                    selectedTask: { ...task, section: i, item: indx },
                    showPlannerView: true,
                  })
                }
                onDeleteClick={(itemIndex: number) => {
                  let list = [...state.tasklist];
                  list[i].tasks?.splice(itemIndex, 1);
                  if (list[i].tasks?.length === 0) {
                    list.splice(i, 1);
                  }
                  setstate({ ...state, tasklist: list });
                }}
              />
            ))}
          </ul>
        )}
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
            onUpdate={updateTask}
          />
        </Modal>
      ) : null}
      {state?.showPieChart ? (
        <Modal onClick={() => setstate({ ...state, showPieChart: false })}>
          <div
            className={`${styles.planneranim} ${styles.chartview} rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center pt-10`}
          >
            <Chart
              className="bg-gray-50"
              chartType="PieChart"
              rootProps={{ "data-testid": "1" }}
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Minutes per Day"],
                ...getPieChartData(state.tasklist),
              ]}
              options={{
                title: "Task Breakdown in min(s)",
                backgroundColor: "#f9fafb",
                height: 400,
                chartArea: { left: 30, height: "85%", width: "85%" },
              }}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default memo(home);
