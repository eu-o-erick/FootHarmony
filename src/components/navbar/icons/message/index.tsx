'use client';

import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { trpc } from "@/trpc/client";
import SkeletonMessage from "./Skeleton";
import ListMsgs from "./ListMessage";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


export default function Messages() {

  const { status, data: messages } = trpc.messages.useQuery();
  const [hasNew, setHasNew] = useState(false);

  const messagesRead = Cookies.get('messages_read');


  useEffect(() => {
    console.log('aaaaa')

    if(!messages) return;

    const msgRead: string[] = JSON.parse(messagesRead ?? '[]');

    console.log('msgRead: ', msgRead)

    const state = messages.find( msg => !msgRead.includes(msg.id) );

    console.log('state: ', state)

    setHasNew( state ? true : false);

  }, [messages, messagesRead]);
  useEffect(() => {
    console.log('bbbbb')

  }, []);


  return(
    <Popover>

      <PopoverTrigger>
        <div className="relative text-gray-800 flex items-center justify-center opacity-90 hover:scale-105 hover:opacity-100 transition-all">
          <Mail className="w-7 h-7" />
          <span className={cn("w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0", { 'hidden': !hasNew })} />
        </div>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col items-center justify-between min-h-40 w-96 -mr-14" align="end">

        {
          status === 'loading' ?
            <SkeletonMessage />
          :
            messages?.length ?
              <>
                <ListMsgs messages={messages} />

                <Separator />

                <button className="mt-2 text-sm opacity-40 hover:underline">
                  mark all messages as read
                </button>
              </>
            :
              <p className="h-full opacity-40 mt-10">You don&apos;t have any message</p>

        }

      </PopoverContent>
    </Popover>
  );
};