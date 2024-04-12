import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props{
  sizeIndex: number;
  setSizeIndex: React.Dispatch<React.SetStateAction<number>>
  options: {
    size: string;
    amount: number;
  }[];
};


export default function SizeDropdown({sizeIndex, setSizeIndex, options}: Props) {

  function handlerChangeValue(value: string) {
    setSizeIndex( options.findIndex( ({size}) => size === value ) );

  };           

  return(
    <Select defaultValue={options[sizeIndex].size} onValueChange={handlerChangeValue}>
      <SelectTrigger className="w-20 h-6 pl-3 pr-2 rounded-none border shadow-sm font-semibold text-xs bg-gray-50">
        { options[sizeIndex].size }
      </SelectTrigger >

      <SelectContent className="rounded-none min-w-0 w-20" >

        { options.map( ({size, amount}, i) => {

          return(
            <SelectItem
              key={i}
              value={size}
              disabled={amount <= 0}
              className={cn("rounded-none font-semibold text-xs h-6 cursor-pointer pl-3", {
                '!bg-gray-300 !text-gray-700 cursor-default': sizeIndex === i
              })}>
                {size}
            </SelectItem>
          );
        })}

      </SelectContent>
    </Select>
  );
};