export interface ListModel {
  date?: Date;
  tasks?: Array<Task>;
}
export interface Task {
  name?: String;
  date?: Date;
  start?: Date;
  end?: Date;
}
