import { useState, memo, FC } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import styles from "./PlannerView.module.css";
import { Task } from "../../Models/TaskInterfaces";
import { getTime, getDifference } from "../../helper";

const TitleInputView: FC<any> = memo((props) => {
  return (
    <div className="flex items-end mb-3 flex-col">
      <div className="flex items-center">
        <div className="mr-3 w-24 text-right">{props.title}</div>
        {props.children}
      </div>
    </div>
  );
});

interface PlannerProps {
  data?: any | null;
  className: string;
  onAdd: (obj: Task) => void;
  onUpdate: (obj: any, section: number, item: number) => void;
}

const PlannerView: FC<PlannerProps> = (props) => {
  const [state, setstate] = useState<any>({
    task: props.data || {},
    error: "",
  });

  const setTaskState = (vals: any) => {
    setstate({ ...state, task: { ...state.task, ...vals } });
  };

  const isAllValid = () => {
    if (!state.task?.name || state.task?.name === "") {
      return { status: false, message: "Please enter a task name" };
    } else if (!state.task?.date) {
      return { status: false, message: "Please select a date" };
    } else if (!state.task?.start) {
      return { status: false, message: "Please enter start time" };
    } else if (state.task?.start < Date.now()) {
      return {
        status: false,
        message: "Start time cannot less than current time",
      };
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
    } else if (getDifference(state.task?.start, state.task?.end) < 1) {
      return {
        status: false,
        message:
          "There should be atleast 1 minute's difference between start and end times",
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
        <div className="text-3xl my-5">Add a Task</div>
        <TitleInputView title="Task Name: ">
          <input
            className={`py-2 px-3 ${styles.input}`}
            placeholder="Enter title"
            defaultValue={state.task?.name}
            onChange={(e) => setTaskState({ name: e.target.value })}
          />
        </TitleInputView>

        <TitleInputView title="Date: ">
          <Flatpickr
            options={{ minDate: state?.task?.date || Date.now() }}
            value={state?.task?.date}
            className={`py-2 px-3 ${styles.input}`}
            placeholder="yyyy-mm-dd"
            onChange={(e: any) =>
              setTaskState({ date: e[0], start: null, end: null })
            }
          />
        </TitleInputView>
        <TitleInputView title="Start: ">
          <Flatpickr
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              defaultDate: getTime(state?.task?.start),
              minDate: state?.task?.date || Date.now(),
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
              defaultDate: getTime(state?.task?.end),
              minDate: state?.task?.date,
            }}
            className={`py-2 px-3 ${styles.input}`}
            placeholder="Select Date"
            onChange={(e: any) => setTaskState({ end: e[0] })}
          />
        </TitleInputView>
        <div className="my-3 w-full flex items-center flex-col">
          <div className="text-red-600 font-medium mb-3 text-center">
            {state.error}
          </div>
          <div
            className="shadow w-3/4 text-center bg-green-500 text-white px-8 py-2 text-lg font-medium rounded-full cursor-pointer"
            onClick={() => {
              let status = isAllValid();
              if (status.status) {
                props.data
                  ? props.onUpdate(
                      state.task,
                      props.data.section,
                      props.data.item
                    )
                  : props.onAdd(state.task);
              }
              setstate({ ...state, error: status.message });
            }}
          >
            {props.data ? "Update" : "Add"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PlannerView);
