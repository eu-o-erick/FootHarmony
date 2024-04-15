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
    value: string;
    relationTo: string;
  };
  newTab?: boolean;
  url?: string;

  children?: TContent[],
};

const typesText = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'];


export default function RichTextFormater(content: any[]) {

  return content.map( (obj, i) => {
    const { type, children } = obj as TContent; // default
    const { text, bold, italic, underline, strikethrough, code } = obj as TContent; // text
    const { relationTo, value } = obj as TContent; // media
    const { linkType, doc, newTab, url } = obj as TContent; // link
      
    // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ul' | 'ol' | 'li' | 'link' | 'upload' | 'indent';

    if( !type || typesText.includes(type) ) {
      return createElementText(obj, i)
    
    } else {
      return <></>
    }

  });
};


function createElementText(obj: TContent, i: number) {
  const { type, children } = obj as TContent; // default
  const { text, bold, italic, underline, strikethrough } = obj as TContent; // text

  let Element = '';

  switch (type) {
    case 'h1':
      Element = renderToString(<h1 className="bg-red-700">{text}</h1>);
      break;
    
    case 'h2':
      Element = renderToString(<h2 className="bg-blue-700">{text}</h2>);
      break;
    
    case 'h3':
      Element = renderToString(<h3 className="bg-green-700">{text}</h3>);
      break;
    
    case 'h4':
      Element = renderToString(<h4 className="bg-purple-700">{text}</h4>);
      break;
    
    case 'h5':
      Element = renderToString(<h5 className="bg-zinc-700">{text}</h5>);
      break;
    
    case 'h6':
      Element = renderToString(<h6 className="bg-yellow-700">{text}</h6>);
      break;
    
    case 'li':
      Element = renderToString(<li className="bg-teal-800">{text}</li>);
      break;

    default:
      const classNames = bold && 'font-bold ' + italic && 'italic ' + underline && 'underline ' + strikethrough && 'line-through';

      Element = renderToString(<span className={"bg-fuchsia-400 " + classNames}>{text}</span>);
      break;
  };


  return (
    <div key={i} dangerouslySetInnerHTML={{ __html: Element }} />
  );
};


// <Element key={i}></Element>
// switch (type) {
//   case 'h1':
//     Element = renderToString(<h1 className="bg-red-700"></h1>);
//     break;
  
//   case 'h2':
//     Element = renderToString(<h2 className="bg-blue-700"></h2>);
//     break;
  
//   case 'h3':
//     Element = renderToString(<h3 className="bg-green-700"></h3>);
//     break;
  
//   case 'h4':
//     Element = renderToString(<h4 className="bg-purple-700"></h4>);
//     break;
  
//   case 'h5':
//     Element = renderToString(<h5 className="bg-zinc-700"></h5>);
//     break;
  
//   case 'h6':
//     Element = renderToString(<h6 className="bg-yellow-700"></h6>);
//     break;
  
//   case 'ul':
//     Element = renderToString(<ul className="bg-orange-500"></ul>);
//     break;

//   case 'ol':
//     Element = renderToString(<ol className="bg-lime-300"></ol>);
//     break;

//   case 'li':
//     Element = renderToString(<li className="bg-teal-800"></li>);
//     break;

//   case 'link':
//     if(linkType === 'custom') {
//       Element = renderToString(<a href={url!} target={newTab ? '__blank' : undefined} className="bg-yellow-950"></a>);
    
//     } else {
//       Element = renderToString(<a href={url!} target={newTab ? '__blank' : undefined} className="bg-yellow-950"></a>);

//     };
//     break;
  
//   // case 'upload':
//   //   Element = renderToString(<h1 className="bg-blue-300"></h1>);
//   //   break;
  
//   // case 'indent':
//   //   Element = renderToString(<h1 className="bg-pink-700"></h1>);
//   //   break;

//   // default:
//   //   Element = renderToString(<p className="bg-fuchsia-400"></p>);
//   //   break;
// };


// return (
//   <div key={i} dangerouslySetInnerHTML={{ __html: Element }}>
//     { children && RichTextFormater(children) }
//   </div>
// );
