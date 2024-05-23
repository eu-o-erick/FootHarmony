import FormAddress from './form';
import SummaryAddress from './summary';


export default function AddressContent() {


  return (
    <div className="flex items-start justify-between mt-12">
      <FormAddress />

      <SummaryAddress />
    </div>
  );
};
