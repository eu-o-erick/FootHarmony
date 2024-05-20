'use client';

import Navbar from '@/components/navbar';
import Generes from '@/components/home/generes';
import BreadcrumbComponent from '@/components/breadcrumb';

import Footer from '@/components/footer';
import FormAddress from '@/components/address/form';
import SummaryAddress from '@/components/address/summary';



export default function Cart() {

  const elements = [
    {
      label: 'home',
      href: '/'
    },{
      label: 'products',
      href: '/products'
    },{
      label: 'cart',
      href: '/cart'
    },{
      label: 'address'
    }
  ];


  return (
    <div className='min-h-svh w-full'>
      <Navbar />
      <Generes />
      <main className="flex flex-col w-full max-w-6xl px-14 mx-auto my-10">
        <BreadcrumbComponent elements={elements} />

        <h1 className="text-2xl font-semibold mt-2">SHOPPING ADDRESS</h1>

        <div className="flex items-start justify-between mt-12">
          <FormAddress />

          <SummaryAddress />
        </div>

      </main>
      <Footer />
    </div>
  );
};
