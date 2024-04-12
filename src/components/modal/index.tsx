"use client";

import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Media, Modal } from "@/payload-types";
import { clearId } from "@/store/reducers/modal";
import { trpc } from "@/trpc/client";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

// import React, { useMemo, useCallback, useState } from 'react';
// import { Slate, Editable, withReact } from 'slate-react';
// import { createEditor } from 'slate';
// const editor = useMemo(() => withReact(createEditor()), []);
// const [value, setValue] = useState([]);
// <Slate editor={editor} value={value}>
//   <Editable />
// </Slate>




export default function ModalComponent() {

  const dispatch = useDispatch();
  const refTrigger = useRef(null);

  const modalId = useSelector( (state: any) => state.modal );

  const [objectModal, setObjectModal] = useState<null | Modal>(null)

  const { status, data: modal } = trpc.modal.useQuery({modalId: modalId ?? ''});


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

      <DialogContent className="w-[700px] max- h-96 max-w-none">

        { (!modal || status !== 'success') ?
          <p>alou</p>
        :
          <>
            <DialogHeader>
              <div className="relative w-full h-40"> {/* pegar as dimecções da imagem e calcular a dimenção da altuara para a largura */}
                <Image src={`/media/${(modal.banner as Media).filename}`}  fill objectFit="container" alt="BANNER" />
              </div>
        
            </DialogHeader>
        
            <p>faefea</p>
          </>
        }

      </DialogContent>
    </Dialog>
  );
};

// <Dialog>
// <DialogTitle>
// <DialogDescription>