
interface Props {
  handlerKeyDown: (e: React.KeyboardEvent<any>) => void;
}  

export default function InputTextareaAddress({ handlerKeyDown }: Props) {

  return(
    <textarea
      id='textarea_address'
      name='textarea_address'
      className="w-full min-h-[100px] max-h-60 py-2 pl-3 pr-9 border focus:outline-none"
      placeholder='Order Note(optional)'
      onKeyDown={handlerKeyDown} />
    );
};
