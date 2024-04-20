import { ScrollText, ShieldCheck, Truck } from "lucide-react";


const ITEMS = [
  {
    title: 'Safe Buy',
    description: 'Your Trusted Online Shopping Guardian. Ensuring worry-free transactions for your peace of mind',
    Icon: ShieldCheck
  },{
    title: 'Free Shipping',
    description: 'Enjoy the Convenience, Without the Extra Cost. Get your orders delivered straight to your doorstep, no added fees',
    Icon: Truck
  },{
    title: 'Guarantee',
    description: 'Your Satisfaction, Our Promise. Shop with confidence knowing your happiness is our priority',
    Icon: ScrollText
  }
]

export default function About() {

  return (
    <article className='flex-center flex-col py-20 bg-gray shadow-lg  text-light-gray'>

      <h5 className="text-3xl">About Us</h5>

      <p className="font-light text-center max-w-[580px] mt-7 mb-10">
        Where Comfort Meets Style. We specialize in delivering premium footwear that not only looks great
        but feels amazing too. Step into a world of quality craftsmanship and trendy designs with
        every pair. Your feet deserve the best, and at FootHarmony, we make sure they get it.
      </p>

      <ul className="flex justify-between gap-10">

        { ITEMS.map((item, i) => (
          <li key={i} className="flex flex-col items-center gap-2 max-w-56 p-6 rounded-md shadow-md bg-light-gray">

            <div className="flex-center w-20 h-20 rounded-full shadow-sm bg-dark-gray">
              <item.Icon className="text-gray w-10 h-10" />
            </div>

            <h6 className="text-gray">{item.title}</h6>
            <p className="font-light text-xs text-center text-gray">{item.description}</p>

          </li>
        )) }

      </ul>


    </article>
  );
}
