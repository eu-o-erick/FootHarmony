import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}


export default function Error({ isError, label, setIsError }: Props) {

  useEffect(() => {
    if(!isError) return;

    setTimeout(() => {
      setIsError(false);

    }, 2000)

  }, [isError]);
  

  return (
    <div className={cn(`
      fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-[100] flex-center gap-2
      text-red-400 bg-red-100 px-3 py-2 mt-2 rounded-sm shadow-lg pointer-events-none transition-all opacity-0 scale-75
    `, {
      'opacity-100 scale-100': isError
    })}>
      <Info className="w-4 h-4" />
      <span className="text-sm whitespace-nowrap">{label}</span>
    </div>
  );
}
