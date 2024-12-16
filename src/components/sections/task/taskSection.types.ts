export enum TASK_STATUS {
  TODO = 'در حال انجام',
  DONE = 'انجام شده',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TASK_STATUS;
}