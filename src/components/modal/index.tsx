"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Media } from "@/payload-types";
import { clearId } from "@/store/reducers/modal";
import { trpc } from "@/trpc/client";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import RichTextFormater from "../RichText";
import ButtonModal from "./ButtonLink";
import SkeletonModal from "./Skeleton";


export default function ModalComponent() {

  const dispatch = useDispatch();
  const refTrigger = useRef(null);

  const modalId = useSelector( (state: any) => state.modal );

  const { status, data: modal } = trpc.modal.useQuery({modalId: modalId ?? '' }) ?? { status: 'loading', data: null };

  // test
  useEffect(() => {
    if(!modal) return;


  }, [modal]);


  useEffect(() => {
    if(!modalId) return;

    (refTrigger.current as HTMLButtonElement | null)?.click();

  }, [modalId]);

  function handlerClose(open: boolean) {
    !open && dispatch( clearId() );

  };


  return (
    <Dialog onOpenChange={handlerClose}>
      <DialogTrigger className="hidden" ref={refTrigger} /> 

      <DialogContent className="w-[700px] h-[650px] max-h-svh max-w-none overflow-auto pb-10">

        { (!modal || status !== 'success') ?
          <SkeletonModal />
        :
          <div className="flex flex-col gap-3 my-8 overflow-auto">
            <Image src={`/media/${(modal.banner as Media).filename}`} className="shadow-md" width={1000} height={1000} alt="BANNER" />

            { RichTextFormater(modal.content) }

            { modal.expiryDate && (
              <p className="text-right font-semibold opacity-60 text-sm">
                Valid until
                <span className="ml-1 font-bold">
                  {modal.expiryDate.split('T')[0].replaceAll('-','/')}                
                </span>
              </p>
            )}

            <ButtonModal modal={modal} />
          </div>
        }

      </DialogContent>
    </Dialog>
  );
};