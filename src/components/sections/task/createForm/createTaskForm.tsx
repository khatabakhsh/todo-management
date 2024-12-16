import { FC } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/inputs/input';
import { Textarea } from '@/components/ui/inputs/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '../taskSection.types';

const formSchema = z.object({
  title: z.string().nonempty('عنوان الزامی می‌باشد').min(2, {
    message: 'عنوان باید حداقل دو کاراکتر باشد.',
  }),
  description: z.string().min(2, {
    message: 'توضیحات باید حداقل دو کاراکتر باشد.',
  }),
});

interface CreateTaskFormProps {
  createTask: (title: Task['title'], description: Task['description']) => void;
  onSuccess?: () => void;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({ createTask, onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTask(values.title, values.description);
    onSuccess?.();
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Controller
        control={form.control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="عنوان"
            placeholder="یک عنوان برای تسک"
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            label="توضیحات"
            placeholder="توضیحات برای تسک"
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit" className="float-end">
        ثبت
      </Button>
    </form>
  );
};

export default CreateTaskForm;
