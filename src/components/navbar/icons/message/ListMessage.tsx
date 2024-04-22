'use client';

import { useDispatch } from "react-redux";
import { setId } from "@/store/reducers/modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Media, Message, Modal } from "@/payload-types";


interface Props {
  message: Message;
  messagesRead: string[];
  setMessagesRead: React.Dispatch<React.SetStateAction<string[]>>;
}


export default function ListMsgs({message, messagesRead, setMessagesRead}: Props) {
  const dispatch = useDispatch();

  const isRead = messagesRead.includes(message.id);

  const handlerSetModalShow = () => {

    !messagesRead.includes(message.id) && setMessagesRead([...messagesRead, message.id]);

    const id = (message.linkTo as Modal | undefined )?.id;

    id && dispatch( setId(id) );
  };



  return(
    <li className={cn("flex gap-3 p-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition-all max-[400px]:px-0", {
      'opacity-60': isRead
    })} onClick={handlerSetModalShow}>

      <Image src={'/media/'+(message.card as Media).filename} alt="IMAGE" width={60} height={60} />

      <div className="relative flex flex-col w-3/4 bg-sgreen-400">

        <h4 className={cn("font-semibold truncate", {
          'pr-3': !isRead
        })}>
          {message.title}
        </h4>

        <p className="text-gray-400 line-clamp-2 text-sm">{message.description}</p>
      
        { !isRead &&
          <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-0" />
        }

      </div>

    </li>
  );
};