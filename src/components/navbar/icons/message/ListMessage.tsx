'use client';

import { useDispatch } from "react-redux";
import { setId } from "@/store/reducers/modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Media, Message, Modal } from "@/payload-types";
import { useEffect, useState } from "react";


interface Props {
  messages: Message[];
  messagesRead: string[];
  setMessagesRead: React.Dispatch<React.SetStateAction<string[]>>;
}


export default function ListMsgs({messages, messagesRead, setMessagesRead}: Props) {
  const dispatch = useDispatch();

  const [msgValid, setMsgValid] = useState<Message[]>([]);

  useEffect(() => {
    if(!messages.length) return;

    const arr = messages.filter((msg) => {
      const getDate = new Date();

      const date = (msg.linkTo as Modal | undefined)?.expiryDate?.split('T')[0].split('-') ?? [];

      const dateNow = [ getDate.getFullYear(), getDate.getMonth() + 1, getDate.getDate() ];


      console.log('date: ', date);
      console.log('dateNow: ', dateNow);

      return !date.find( (n, i) => Number(n) < dateNow[i] );
    })

    console.log(arr)
    setMsgValid(arr)


  }, [messages]);


  const handlerSetModalShow = (msg: Message) => {

    !messagesRead.includes(msg.id) && setMessagesRead([...messagesRead, msg.id]);

    const id = (msg.linkTo as Modal | undefined )?.id;

    id && dispatch( setId(id) );
  };



  return(
    <ul className="relative flex flex-col gap-1 w-full max-h-72 mt-4 mb-6 overflow-auto">
      { msgValid.map((msg, i) => {

        const isRead = messagesRead.includes(msg.id);

        return(
          <li key={i}  className={cn("flex gap-3 p-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-all max-[400px]:px-0", {
            'opacity-60': isRead
          })} onClick={ () => handlerSetModalShow(msg) }>

            <Image src={'/media/'+(msg.card as Media).filename} alt="IMAGE" width={60} height={60} />

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