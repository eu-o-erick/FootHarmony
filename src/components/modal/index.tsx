"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Media } from "@/payload-types";
import { clearId } from "@/store/reducers/modal";
import { trpc } from "@/trpc/client";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import RichTextFormater from "../RichText";


export default function ModalComponent() {

  const dispatch = useDispatch();
  const refTrigger = useRef(null);

  const modalId = useSelector( (state: any) => state.modal );

  const { status, data: modal } = trpc.modal.useQuery({modalId: modalId ?? '' });

  useEffect(() => {
    if(!modalId) return;

    (refTrigger.current as HTMLButtonElement | null)?.click();

  }, [modalId]);

  function handlerClose(open: boolean) {
    // !open && dispatch( clearId() );

  };


  return (
    <Dialog onOpenChange={handlerClose} open={true}>
      <DialogTrigger className="hidden" ref={refTrigger} /> 

      <DialogContent className="w-[700px] h-[550px] max-w-none overflow-auto">

        { (!modal || status !== 'success') ?
          <p>alou</p>
        :
          <div className="flex flex-col gap-3 my-8 overflow-auto">
            {/* <Image src={`/media/${(modal.banner as Media).filename}`} width={1000} height={1000} alt="BANNER" /> */}

            { RichTextFormater(modal.content) }

          </div>
        }

      </DialogContent>
    </Dialog>
  );
};