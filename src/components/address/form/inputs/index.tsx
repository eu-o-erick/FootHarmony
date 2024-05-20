import InputTextAddress from "./Text";
import InputEmailAddress from "./Email";
import AutoCompleteAddress from "./AutoComplete";
import InputTextareaAddress from "./Textarea";
import InputZipAddress from "./Zip";

interface PropsComponentInput {
  type: 'text' | 'email' | 'phone' | 'zip' | 'autocomplete' | 'textarea';
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  isLoading?: boolean;
}


export default function ComponentInputAddress({ id, label, placeholder, className = '', type, setState, value, isLoading }: PropsComponentInput) {


  function handlerKeyDown(e: React.KeyboardEvent<any>) {
    if(e.code !== 'Enter') return;

    e.preventDefault();



  };


  return(
    <div className={"flex flex-col gap-1.5 "+ className}>
      <span className='font-semibold text-gray-600 uppercase text-sm mx-1'>{label}</span>

      { type === 'text' &&
        <InputTextAddress id={id!} placeholder={placeholder!} handlerKeyDown={handlerKeyDown} />
      }
      
      { type === 'email' &&
        <InputEmailAddress handlerKeyDown={handlerKeyDown} />
      }
      
      { type === 'autocomplete' &&
        <AutoCompleteAddress value={value} isLoading={isLoading!} />
      }
      
      { type === 'textarea' &&
        <InputTextareaAddress handlerKeyDown={handlerKeyDown} />
      }

      { type === 'zip' &&
        <InputZipAddress setState={setState!} handlerKeyDown={handlerKeyDown} />
      }




    </div>
  );
};
