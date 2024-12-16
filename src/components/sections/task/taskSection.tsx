import { FC } from 'react';
import {
  CircleCheckBigIcon,
  CircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/inputs/input';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/ui/modal';
import DataTable, { DataTableProps } from '@/components/ui/dataTable';
import { useState } from 'react';

import { Task, TASK_STATUS } from './taskSection.types';
import CreateTaskForm from './createForm/createTaskForm';
import UpdateTaskForm from './updateForm/updateTaskForm';
import Select from '@/components/ui/inputs/select';

const initialData: Task[] = [
  {
    id: 1,
    title: 'تست 1',
    description: 'توضیحات تست 1',
    status: TASK_STATUS.DONE,
  },
  {
    id: 2,
    title: 'تست 2',
    description: 'توضیحات تست 2',
    status: TASK_STATUS.TODO,
  },
  {
    id: 3,
    title: 'تست 3',
    description: 'توضیحات تست 3',
    status: TASK_STATUS.DONE,
  },
];

const TaskSection: FC = () => {
  const createModal = useModal();
  const updateModal = useModal();
  const [data, setData] = useState<Task[]>(initialData);
  const [record, setRecord] = useState<Task | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<TASK_STATUS | null>(null);

  const filtedData = data.filter(
    (task) =>
      (task.title.includes(searchFilter) ||
        task.description.includes(searchFilter)) &&
      (!statusFilter || task.status === statusFilter)
  );

  const createTask = (
    title: Task['title'],
    description: Task['description']
  ) => {
    setData((prev) => [
      ...prev,
      { id: +new Date(), title, description, status: TASK_STATUS.TODO },
    ]);
  };

  const deleteTask = (id: number) => {
    setData((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (
    id: number,
    title: Task['title'],
    description: Task['description']
  ) => {
    setData((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const toggleTaskStatus = (id: number) => {
    setData((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === TASK_STATUS.TODO
                  ? TASK_STATUS.DONE
                  : TASK_STATUS.TODO,
            }
          : task
      )
    );
  };

  const columns: DataTableProps['columns'] = [
    {
      accessor: 'id',
      header: 'شناسه',
      minWidth: 90,
      width: 100,
    },
    {
      accessor: 'title',
      header: 'عنوان',
      minWidth: 120,
      width: 150,
    },
    {
      accessor: 'description',
      header: 'توضیحات',
      minWidth: 150,
      width: 200,
    },
    {
      accessor: 'status',
      header: 'وضعیت',
      minWidth: 120,
      width: 120,
      render: (value: TASK_STATUS) => (
        <div className="flex items-center gap-2 ">
          {value === TASK_STATUS.TODO ? (
            <>
              <CircleIcon className="w-5 h-5 text-neutral-600" />
              در حال انجام
            </>
          ) : (
            <>
              <CircleCheckBigIcon className="w-5 h-5 text-neutral-600" />
              انجام شده
            </>
          )}
        </div>
      ),
    },
    {
      accessor: 'actions',
      header: 'عملیات',
      minWidth: 140,
      width: 140,
      render: (_, row: Task) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleTaskStatus(row.id)}
          >
            {row.status === TASK_STATUS.TODO ? (
              <CircleCheckBigIcon className="w-5 h-5 text-neutral-600" />
            ) : (
              <CircleIcon className="w-5 h-5 text-neutral-600" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-neutral-600 dark:text-neutral-400"
            onClick={() => {
              setRecord(row);
              updateModal.open();
            }}
          >
            <PencilIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-red-600 dark:text-red-400"
            onClick={() => deleteTask(row.id)}
          >
            <TrashIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="جستجو"
          onChange={(e) => {
            setSearchFilter(e.target.value);
          }}
        />
        <Select
          className="min-w-28"
          options={[
            { label: 'همه', value: '' },
            { label: 'در حال انجام', value: TASK_STATUS.TODO },
            { label: 'انجام شده', value: TASK_STATUS.DONE },
          ]}
          value={statusFilter?.toString() || null}
          onChange={(e) =>
            setStatusFilter((e.target.value as TASK_STATUS) || null)
          }
        />
        <div className="flex-1" />
        <Button onClick={createModal.open}>
          <PlusIcon />
          تسک جدید
        </Button>
        <Modal
          title="افزودن تسک جدید"
          isOpen={createModal.isOpen}
          onClose={createModal.close}
        >
          <CreateTaskForm
            createTask={createTask}
            onSuccess={() => createModal.close()}
          />
        </Modal>
        <Modal
          title="ویرایش تسک"
          isOpen={updateModal.isOpen}
          onClose={updateModal.close}
        >
          <UpdateTaskForm
            record={record!}
            updateTask={updateTask}
            onSuccess={() => updateModal.close()}
          />
        </Modal>
      </div>
      <DataTable columns={columns} data={filtedData} />
    </div>
  );
};

export default TaskSection;
