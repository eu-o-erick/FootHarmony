'use client';

import Navbar from '@/components/navbar';
import Generes from '@/components/home/generes';
import BreadcrumbComponent from '@/components/breadcrumb';
import AddressContent from '@/components/address';
import Footer from '@/components/footer';



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

        <AddressContent />

      </main>
      <Footer />
    </div>
  );
};
