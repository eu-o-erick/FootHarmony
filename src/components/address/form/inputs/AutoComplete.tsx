import PulseLoader from 'react-spinners/PulseLoader';


interface PropsInput {
  value?: string;
  isLoading: boolean;
}


export default function AutoCompleteAddress({ value, isLoading }: PropsInput) {

  return(
    <p className="w-full h-10 py-2 pl-3 pr-9 border text-gray-500 uppercase font-semibold">
      { isLoading ?
        <PulseLoader color="#ccc" size={5} />
        :
        value
      }
    </p>
  );
};
