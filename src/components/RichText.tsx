import { Media, Product } from '@/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { renderToString } from 'react-dom/server';

interface TContent {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ul' | 'ol' | 'li' | 'link' | 'upload' | 'indent';

  // type text
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean
  code?: boolean;

  // type imagem 
  relationTo?: string;
  value?: {
    id: string;
  }

  // type link
  linkType?: 'custom' | 'internal';
  doc?: {
    value: any;
    relationTo: string;
  };
  newTab?: boolean;
  url?: string;

  children?: TContent[],
};



export default function RichTextFormater(content: any[]) {

  return content.map( (obj, i) => {
    const { type } = obj as TContent; // default

    if( !type || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(type) ) {
      return createTextElement(obj, i)
    
    } else if( type === 'ul' || type === 'ol' ) {
      return createListElement(obj, i);

    } else if( type === 'link') {
      return createLinkElement(obj, i);
    
    } else if( type === 'upload') {
      return createMediaElement(obj, i);
    
    } else if( type === 'indent') {
      return createIdentElement(obj, i);
    
    } else {
      return <Fragment key={i}></Fragment>;
    }

  });
};



function createTextElement(obj: TContent, i: number) {
  const { type, children } = obj as TContent;
  const { text, bold, italic, underline, strikethrough } = obj as TContent;

  let ChildrenElements: JSX.Element[] | string = '';

  if(children?.length) {
    ChildrenElements = RichTextFormater(children);

  };

  switch (type) {
    case 'h1':
      return <h1 key={i} className="!font-semibold !text-3xl flex">{text}{ChildrenElements}</h1>;

    case 'h2':
      return <h2 key={i} className="!font-semibold !text-2xl flex">{text}{ChildrenElements}</h2>;

    case 'h3':
      return <h3 key={i} className="!font-semibold !text-2xl flex">{text}{ChildrenElements}</h3>;

    case 'h4':
      return <h4 key={i} className="!font-semibold !text-xl flex">{text}{ChildrenElements}</h4>

    case 'h5':
      return <h5 key={i} className="!font-semibold !text-lg flex">{text}{ChildrenElements}</h5>;

    case 'h6':
      return <h6 key={i} className="!font-semibold !text-lg flex">{text}{ChildrenElements}</h6>

    case 'li':
      return <li key={i}>{text}{ChildrenElements}</li>;

    default:
      const classNames = (bold ? '!font-bold ' : '') + (italic ? '!italic ' : '') + (underline ? '!underline ' : '') + (strikethrough ? '!line-through' : '');

      // if(classNames) {
        return <span key={i} className={'block '+classNames}>{text}{ChildrenElements}</span>;

      // } else {
        // return <Fragment key={i} className="block">{text}{ChildrenElements}</Fragment>;

      // };
  };
};

function createListElement(obj: TContent, i: number) {
  const { type, children } = obj as TContent; // default

  let ChildrenElements: JSX.Element[] | string = '';

  if(children?.length) {
    ChildrenElements = RichTextFormater(children);

  };

  if(type === 'ul') {
    return <ul key={i} className='!list-disc pl-5'> {ChildrenElements} </ul>;

  } else {
    return <ol key={i} className='!list-decimal pl-5'> {ChildrenElements} </ol>;

  };
};

function createLinkElement(obj: TContent, i: number) {
  const { children, linkType, doc, newTab, url } = obj as TContent; // link

  let ChildrenElements: JSX.Element[] | string = '';

  if(children?.length) {
    ChildrenElements = RichTextFormater(children);

  };


  if(linkType === 'custom') {
    return (
      <a key={i} href={url} target={ newTab ? '_blank' : undefined} className='underline font-semibold text-blue-400'>{ChildrenElements}</a>
    );

  } else {
    let link = '';

    if(doc?.relationTo === 'product') {
      link = '/products/'+doc.value.id;

    } else if(doc?.relationTo === 'variation') {
      link = `/products/${doc.value.product.id}?variation=${doc.value.id}`;

    } else if(doc?.relationTo === 'brand') {
      link = `/products?brand=${encodeURIComponent(doc.value.name)}`;
      
    } else if(doc?.relationTo === 'category') {
      link = `/products?category=${encodeURIComponent(doc.value.name)}`;
      
    } else if(doc?.relationTo === 'offers') {
      link = `/products?offer=${doc.value.id}`;
      
    } else if(doc?.relationTo === 'coupom') {
      // callback of coupom
      
    };

    return (
      <Link key={i} href={link} target={ newTab ? '_blank' : undefined} className='underline font-semibold text-blue-400'>{ChildrenElements}</Link>
    );
  };
};

function createMediaElement(obj: TContent, i: number) {
  const { children, value } = obj as TContent;

  let ChildrenElements: JSX.Element[] | string = '';

  if(children?.length) {
    ChildrenElements = RichTextFormater(children);

  };

  const maxWidth = 200;

  const { width, height, filename } = (value as Media);
  const offSetHeight = maxWidth / width! / height!;

  const h = offSetHeight;

  const src = '/media/'+filename;


  return(
    <div className="relative m-5">
      <Image key={i} src={src} width={maxWidth} height={h} alt='IMAGE' />
      {ChildrenElements}
    </div>
  )

};

function createIdentElement(obj: TContent, i: number) {
  const { children } = obj;

  let ChildrenElements: JSX.Element[] | string = '';

  if(children?.length) {
    ChildrenElements = RichTextFormater(children);

  };

  return(
    <div key={i} className="ml-4">
      { ChildrenElements }
    </div>
  );
};