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
import { useState } from 'react';

type FormFieldTypes = {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: string;
  disabled?: boolean;
};

const FormFieldComponent = ({
  form,
  name,
  label,
  placeholder,
  description,
  type,
  disabled,
}: FormFieldTypes) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <>
          {type === 'date' ? (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1">Date of birth</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal rounded-xl bg-white shadow-none py-[20px]',
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
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0 rounded-xl bg-white shadow-none border"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    className="w-full"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(date);
                        setOpen(false);
                      }
                    }}
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
                  className="py-[20px] shadow-none bg-white rounded-xl focus-visible:"
                  placeholder={placeholder}
                  type={type}
                  disabled={disabled}
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
