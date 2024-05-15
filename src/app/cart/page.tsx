'use client';

import BreadcrumbComponent from '@/components/breadcrumb';
import CartContent from '@/components/cart';
import Footer from '@/components/footer';
import Generes from '@/components/home/generes';
import Navbar from '@/components/navbar';


export default function Cart() {

  const elements = [
    {
      label: 'home',
      href: '/'
    },{
      label: 'products',
      href: '/products'
    },{
      label: 'cart'
    }
  ];


  return (
    <div className='min-h-svh w-full'>
      <Navbar />
      <Generes />
      <main className="flex flex-col w-full max-w-6xl px-14 mx-auto my-10">
        <BreadcrumbComponent elements={elements} />

        <h1 className="text-2xl font-semibold mt-2">SHOPPING CART</h1>

        <CartContent />

      </main>
      <Footer />
    </div>
  );
}
