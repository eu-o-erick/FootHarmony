"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Media } from "@/payload-types";
import { clearId } from "@/store/reducers/modal";
import { trpc } from "@/trpc/client";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
import RichTextFormater from "../RichText";
import ButtonModal from "./ButtonLink";
import SkeletonModal from "./Skeleton";


const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function ModalComponent() {

  const dispatch = useDispatch();
  const refTrigger = useRef(null);

  const modalId = useSelector( (state: any) => state.modal );

  const { status, data: modal } = trpc.modal.useQuery({modalId});

  const [expirationDate, setExpirationDate] = useState('');


  useEffect(() => {
    if(!modalId) return;

    (refTrigger.current as HTMLButtonElement | null)?.click();

  }, [modalId]);


  useEffect(() => {
    if(!modal || !modal.expiryDate) return setExpirationDate('');

    const date = new Date(modal.expiryDate);

    setExpirationDate( `${MONTH[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` )

  }, [modal])


  function handlerClose(open: boolean) {
    !open && dispatch( clearId() );

  };


  return (
    <Dialog onOpenChange={handlerClose}>
      <DialogTrigger className="hidden" ref={refTrigger} /> 

      <DialogContent className="
        w-[700px] h-[650px] max-h-svh max-w-none overflow-auto
        max-md:w-[500px] max-md:h-[480px] max-md:py-8 max-sm:w-5/6 max-sm:px-2 max-sm:py-3 max-sm:rounded-sm
      ">

        { (!modal || status !== 'success') ?
          <SkeletonModal />
        :

          <div className="flex flex-col gap-3 overflow-auto mt-2">
            <Image src={`/media/${(modal.banner as Media).filename}`} className="shadow-md" width={1000} height={1000} alt="BANNER" />

            { RichTextFormater(modal.content) }

            { modal.expiryDate && (
              <p className="text-right font-semibold opacity-60 text-sm">
                Expires on
                <span className="ml-1 font-bold">{expirationDate}</span>
              </p>
            )}

            <ButtonModal modal={modal} />
          </div>
        }

      </DialogContent>
    </Dialog>
  );
};