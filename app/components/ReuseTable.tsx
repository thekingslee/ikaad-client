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
import StatusTablet from './StatusTablet';
import { Button } from '@/components/ui/button';

type TableProps = {
  data: any;
  selected: any;
  setSelected: (selected: any) => void;
  setOpen: (bol: boolean) => void;
};

const ReuseTable = ({ data, selected, setSelected, setOpen }: TableProps) => {
  return (
    <div className="container min-w-[420px] overflow-x-auto sm:w-auto mx-auto hide-scrollbar">
      <Table className="w-full h-full ">
        {/* <TableCaption className="text-left">
          A list of your recent applications.
        </TableCaption> */}
        <TableHeader className="sticky top-0">
          <TableRow className="bg-stone-100">
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Reference ID</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead className="whitespace-nowrap">
              Date /Time Created
            </TableHead> */}
            <TableHead className="whitespace-nowrap"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((item: any, index: number) => (
            <>
              <TableRow
                key={item.id + index}
                onClick={() => {
                  setSelected(item);
                  setOpen(true);
                }}
                className="cursor-pointer "
              >
                <TableCell className="font-medium whitespace-nowrap">
                  {item?.last_name + ' ' + item?.first_name}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {item?.reference_id}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  <StatusTablet status={item?.status || 'pending'} />
                </TableCell>

                {/* <TableCell className="whitespace-nowrap">{item?.date}</TableCell> */}

                <TableCell className="whitespace-nowrap">
                  <Button
                    variant="outline"
                    className="text-xs text-custom-text"
                  >
                    View application
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}

          <div className="min-h-[40px]"></div>
        </TableBody>
      </Table>
    </div>
  );
};

export default ReuseTable;
