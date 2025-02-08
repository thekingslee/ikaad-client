import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormFieldTypes = {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: string;
};

const FormFieldComponent = ({
  form,
  name,
  label,
  placeholder,
  description,
  type,
}: FormFieldTypes) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="py-[20px] shadow-none bg-white"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
