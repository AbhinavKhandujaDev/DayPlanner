import { useState, useEffect, memo, FC } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import styles from "./PlannerView.module.css";
import { Task } from "../../Models/TaskInterfaces";

const TitleInputView: FC<any> = memo((props) => {
  return (
    <div className="flex items-end mb-3 flex-col">
      <div className="flex items-center">
        <div className="mr-3 w-24">{props.title}</div>
        {props.children}
      </div>
    </div>
  );
});

let task: Task = {};

interface PlannerProps {
  className: string;
  onAdd: (obj: Task) => void;
}

const PlannerView: FC<PlannerProps> = (props) => {
  const [state, setstate] = useState<any>({
    task,
    error: "",
  });
  useEffect(() => {
    setTaskState({ date: new Date() });
  }, []);

  const setTaskState = (vals: any) => {
    setstate({ ...state, task: { ...state.task, ...vals } });
  };

  const isAllValid = () => {
    if (!state.task?.name || state.task?.name === "") {
      return { status: false, message: "Please enter a plan name" };
    } else if (!state.task?.date) {
      return { status: false, message: "Please select a date" };
    } else if (!state.task?.start) {
      return { status: false, message: "Please enter start time" };
    } else if (state.task?.start > state.task?.end) {
      return {
        status: false,
        message: "Start time cannot be more than end time",
      };
    } else if (!state.task?.end) {
      return { status: false, message: "Please enter end time" };
    } else if (state.task?.end < state.task?.start) {
      return {
        status: false,
        message: "End time cannot be less than start time",
      };
    } else if (state.task?.start === state.task?.end) {
      return {
        status: false,
        message: "End time and start time cannot be equal",
      };
    } else {
      return { status: true };
    }
  };

  return (
    <div
      className={`PlannerView relative flex items-start justify-center ${styles.plannerview} ${props.className}`}
    >
      <div className="rounded-xl w-full h-full absolute bg-gray-50 top-0"></div>
      <div className="z-10 flex items-center flex-col">
        <div className="text-3xl my-5">Add a plan</div>
        <TitleInputView title="Task Name: ">
          <input
            className={`py-2 px-3 ${styles.input}`}
            placeholder="Enter title"
            onChange={(e) => setTaskState({ name: e.target.value })}
          />
        </TitleInputView>

        <TitleInputView title="Date: ">
          <Flatpickr
            options={{ minDate: state?.task?.date }}
            value={state?.task?.date}
            className={`py-2 px-3 ${styles.input}`}
            placeholder="yyyy-mm-dd"
            onChange={(e: any) => setTaskState({ date: e[0] })}
          />
        </TitleInputView>
        <TitleInputView title="Start: ">
          <Flatpickr
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              // defaultDate: state?.task?.date,
              minDate: state?.task?.date,
            }}
            className={`py-2 px-3 ${styles.input}`}
            placeholder="Select Date"
            onChange={(e: any) => setTaskState({ start: e[0] })}
          />
        </TitleInputView>
        <TitleInputView title="End: ">
          <Flatpickr
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              // defaultDate: state?.task?.date,
              minDate: state?.task?.date,
            }}
            className={`py-2 px-3 ${styles.input}`}
            placeholder="Select Date"
            onChange={(e: any) => setTaskState({ end: e[0] })}
          />
        </TitleInputView>
        <div className="my-3 w-full flex items-center justify-center flex-col">
          <div className="h-5 text-red-600 font-medium mb-3">{state.error}</div>
          <div
            className="w-3/4 text-center bg-green-600 text-white px-8 py-2 text-lg font-medium rounded-full cursor-pointer"
            onClick={() => {
              let status = isAllValid();
              status.status ? props.onAdd(state.task) : {};
              setstate({ ...state, error: status.message });
            }}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PlannerView, (prev: PlannerProps, next: PlannerProps) => {
  return false;
});
