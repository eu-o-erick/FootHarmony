'use client';

import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { trpc } from "@/trpc/client";
import SkeletonMessage from "./Skeleton";
import ListMsgs from "./ListMessage";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Message, Modal } from "@/payload-types";


export default function Messages() {

  const { status, data: messages } = trpc.messages.useQuery();
  const [hasNew, setHasNew] = useState(false);

  const [messagesRead, setMessagesRead] = useState<string[]>([]);
  const [messagesValid, setMessagesValid] = useState<Message[]>([]);


  useEffect(() => {
    const msgRead = JSON.parse( localStorage.getItem('messages_read') ?? '[]') as string[];

    setMessagesRead(msgRead);

  }, []);


  useEffect(() => {
    if(!messages?.length) return;

    const arr = messages.filter((msg) => {
      const getDate = new Date();

      const dateLimit = (msg.linkTo as Modal | undefined)?.expiryDate?.split('T')[0].split('-').map( n => Number(n) ) ?? [];
      const dateNow = [ getDate.getFullYear(), getDate.getMonth() + 1, getDate.getDate() ];

      return dateNow[0] > dateLimit[0] || dateNow[1] > dateLimit[1] || (dateNow[0] <= dateLimit[0] && dateNow[2] > dateLimit[2]);
    });

    //  @ts-ignore
    setMessagesValid(arr);

  }, [messages]);


  useEffect(() => {
    if(!messagesValid.length && !messagesRead.length) return;

    const state = messagesValid.find( message => !messagesRead.includes(message.id) );

    setHasNew( state ? true : false);

    const json = JSON.stringify(messagesRead);

    json && localStorage.setItem('messages_read', json)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesValid, messagesRead]);



  return(
    <Popover>

      <PopoverTrigger>
        <div className="relative text-gray-800 flex items-center justify-center opacity-90 hover:scale-105 hover:opacity-100 transition-all">
          <Mail className="w-7 h-7 max-sm:w-6 max-sm:h-6" />
          <span className={cn("w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0", { 'hidden': !hasNew })} />
        </div>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-center justify-between min-h-40 w-96 -mr-10 mt-2 max-[400px]:w-svw" align="end">

        {
          status === 'loading' ?
            <SkeletonMessage />
          :
            messagesValid?.length ?
              <Fragment>
                <ul className="relative flex flex-col gap-1 w-full max-h-72 mt-4 mb-6 overflow-auto">
                  { messagesValid.map((message, i) => (
                    <ListMsgs key={i} message={message} messagesRead={messagesRead} setMessagesRead={setMessagesRead} />
                  ))}
                </ul>

                <Separator />

                <button className="mt-2 text-sm opacity-40 hover:underline">
                  mark all messages as read
                </button>
              </Fragment>
            :
              <p className="h-full opacity-40 mt-10">You don&apos;t have any message</p>
        }

      </PopoverContent>
    </Popover>
  );
};