'use client';

import { cn } from "@/lib/utils";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { setId } from "@/store/reducers/modal";
import { Media, Message, Modal } from "@/payload-types";
import Cookies from 'js-cookie';



export default function ListMsgs({messages}: {messages: Message[]}) {
  const dispatch = useDispatch();

  const messagesRead = Cookies.get('messages_read');


  const handlerSetModalShow = (msg: Message) => {
    const msgsRead = Cookies.get('messages_read');

    if(!messagesRead) {
      Cookies.set('messages_read', JSON.stringify([msg.id]));

    } else {
      const json: string[] = JSON.parse(messagesRead);

      !json.includes(msg.id) && Cookies.set('messages_read', JSON.stringify([...json, msg.id]) );
    };


    const id = (msg.linkTo as Modal | undefined )?.id;

    id && dispatch( setId(id) );
  };



  return(
    <ul className="relative flex flex-col gap-1 w-full max-h-72 mt-4 mb-6 overflow-auto">
      { messages.map((msg, i) => {

        const isRead = (JSON.parse(messagesRead ?? '[]') as string[]).includes(msg.id);

        return(
          <li key={i}  className={cn("flex gap-3 bg-gray-50 p-4 rounded-md shadow-sm cursor-pointer scale-95 hover:scale-100 transition-all", {
            'opacity-60': isRead
          })} onClick={ () => handlerSetModalShow(msg) }>

            <div className="relative w-1/5 h-16">
              <Image src={'/media/'+(msg.card as Media).filename} alt="IMAGE" fill objectFit="contain" />
            </div>

            <div className="relative flex flex-col w-3/4 bg-sgreen-400">

              <h4 className={cn("font-semibold truncate", {
                'pr-3': !isRead
              })}>
                {msg.title}
              </h4>

              <p className="text-gray-400 line-clamp-2 text-sm">{msg.description}</p>
            
              { !isRead &&
                <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-0" />
              }

            </div>

          </li>
        )
      }) }
    </ul>
  );
};