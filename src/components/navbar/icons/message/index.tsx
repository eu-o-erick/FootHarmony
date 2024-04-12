'use client';

import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { trpc } from "@/trpc/client";
import SkeletonMessage from "./Skeleton";
import ListMsgs from "./ListMessage";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


export default function Messages() {

  const { status, data: messages } = trpc.messages.useQuery();
  const [hasNew, setHasNew] = useState(false);

  const [messagesRead, setMessagesRead] = useState<string[]>([]);

  useEffect(() => {
    const msgRead = JSON.parse( localStorage.getItem('messages_read') ?? '[]') as string[];

    setMessagesRead(msgRead);

  }, []);


  useEffect(() => {
    if(!messages) return;

    const state = messages.find( msg => !messagesRead.includes(msg.id) );

    setHasNew( state ? true : false);

    const json = JSON.stringify(messagesRead);

    localStorage.setItem('messages_read', json)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, messagesRead]);



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
                <ListMsgs messages={messages} messagesRead={messagesRead} setMessagesRead={setMessagesRead} />

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