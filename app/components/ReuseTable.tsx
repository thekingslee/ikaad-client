import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ReuseDrawer from './ReuseDrawer';
import { Button } from '@/components/ui/button';

type TableProps = {
  data: any;
  selected: any;
  setSelected: (selected: any) => void;
  setOpen: (bol: boolean) => void;
};

const ReuseTable = ({ data, selected, setSelected, setOpen }: TableProps) => {
  return (
    <div className="container w-[420px] overflow-x-auto sm:w-auto mx-auto">
      <Table className="w-full">
        <TableCaption className="text-left">
          A list of your recent applications.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-stone-100">
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Reference ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="whitespace-nowrap">
              Date /Time Created
            </TableHead>
            <TableHead className="whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: any, index: number) => (
            <TableRow
              key={item.id + index}
              onClick={() => {
                setSelected(item);
                setOpen(true);
              }}
            >
              <TableCell className="font-medium whitespace-nowrap">
                {item?.name}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {item?.reference_id}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {item?.status}
              </TableCell>

              <TableCell className="whitespace-nowrap">{item?.date}</TableCell>

              <TableCell className="whitespace-nowrap">
                <Button variant="outline" className="text-xs">
                  View application
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReuseTable;
