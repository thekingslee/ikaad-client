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
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

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
        <>
          {type === 'daterr' ? ( // TODO: Enable date picker code for dates
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          ) : type === 'file' ? (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  className="py-[20px] shadow-none bg-white rounded-lg focus-visible:"
                  placeholder={placeholder}
                  type="file"
                  {...field}
                />
              </FormControl>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </FormItem>
          ) : (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  className="py-[20px] shadow-none bg-white rounded-lg focus-visible:"
                  placeholder={placeholder}
                  type={type}
                  {...field}
                />
              </FormControl>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        </>
      )}
    />
  );
};

export default FormFieldComponent;
