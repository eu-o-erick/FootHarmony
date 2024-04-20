import Image from 'next/image';
import Link from 'next/link';

interface Props{
  link: string;
  img: string;
  name: string;
};


export default function ItemRoundedFeatured({link, img, name}: Props) {

  return (
    <div className="flex-center flex-col gap-2">

      <Link href={link} className='flex-center bg-white shadow-lg rounded-full overflow-hidden group hover:shadow-lg hover:-rotate-12 transition-all'>
        <div className="relative w-36 h-36 flex-center group-hover:scale-110 transition-all">
          <Image src={'/media/'+img} alt={name} objectFit='conatain' fill />
        </div>
      </Link>

      <Link href={link} className='flex-center'>
        <h4 className="font-semibold">{name}</h4>
      </Link>
    
    </div>
  );
}
