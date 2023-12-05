"use client"; //not a server component but render both server and client

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";


export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <>
          <CreateServerModal />
        </>
    )
}