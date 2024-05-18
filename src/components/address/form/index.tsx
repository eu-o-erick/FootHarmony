import ComponentInputAddress from './input';


interface Props{

};

export default function FormAddress({}: Props) {

  return (
    <form className='flex flex-col gap-5 p-10 w-[65%] bg-white shadow-md'>
      <ComponentInputAddress id='full_name' label="Recipient's Name" placeholder='Full Name' />
      <ComponentInputAddress id='email' label="Email" placeholder='your@email.com' type='email' />


      <div className="grid gap-5 grid-cols-2 grid-rows-2">
        <ComponentInputAddress id='post_code' label="Post Code" placeholder='0000-000' />
        <ComponentInputAddress id='full_name' label="Phone Number" placeholder='(00) 0000-000' />
        <ComponentInputAddress id='town_city' label="Town/City" placeholder='Town/City' />
        <ComponentInputAddress id='state' label="State" placeholder='State' />
      </div>

      <ComponentInputAddress id='street' label="Street Address" placeholder='Street Address' />

      <ComponentInputAddress id='note' label="Order Note" placeholder='Order Note(optional)' />

    </form>
  );
};
