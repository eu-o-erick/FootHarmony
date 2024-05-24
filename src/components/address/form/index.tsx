import { useEffect, useState } from 'react';
import ComponentInputAddress from './inputs';
import axios from 'axios';
import { trpc } from '@/trpc/client';

interface Props{

};

export default function FormAddress({}: Props) {

  const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const { data, status } = trpc.calculateShipping.useQuery({zipCode});

  console.log('status: ', status)
  console.log('data: ', data)

  useEffect(() => {
    handleZipCodeSubmit()

  }, [zipCode]);


  const handleZipCodeSubmit = async () => {
    if(zipCode.length !== 5) {
      setCity('');
      setState('');

      return;
    };

    try {
      setIsLoadingZipCode(true);

      const response = await axios.get(`https://app.zipcodebase.com/api/v1/search?apikey=${process.env.NEXT_PUBLIC_ZIP_CODESBASE}&codes=${zipCode}`)
      .then( (res) => res.data.results[zipCode].filter(({country_code}: any) => country_code === 'US')[0] );

      setIsLoadingZipCode(false);


      if(response) {
        setCity(response.city);
        setState(response.state);

      } else {
        setCity('');
        setState('');

      };
      

    } catch (error) {
      console.error('Erro ao buscar o código postal:', error);
    
    }
  };


  return (
    <form className='flex flex-col gap-5 p-10 w-[65%] bg-white shadow-md'>
      <ComponentInputAddress id='full_name' label="Recipient's Name" placeholder='Full Name' type='text' />
      <ComponentInputAddress label="Email" type='email' />


      <div className="grid gap-5 grid-cols-2 grid-rows-2">
        <ComponentInputAddress label="Zip" setState={setZipCode} type='zip' />
        <ComponentInputAddress label="Phone Number" type='phone' />
        <ComponentInputAddress label="Town/City" value={city} type="autocomplete" isLoading={isLoadingZipCode} />
        <ComponentInputAddress label="State" value={state} type="autocomplete" isLoading={isLoadingZipCode} />
      </div>

      <ComponentInputAddress id='street' label="Street Address" placeholder='Street Address' type='text' />

      <ComponentInputAddress label="Order Note" type='textarea' />

    </form>
  );
};
