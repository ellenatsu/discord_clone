"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  imageUrl: string | null;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} align="center" side="right">
      <button className="group relative flex items-center" onClick={onClick}>
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          {imageUrl && <Image fill src={imageUrl} alt={name} />}
          {!imageUrl && (
            <div className="bg-zinc-500 w-full h-full flex items-center justify-center">
              <span className="text-white font-semibold text-2xl">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </button>
    </ActionTooltip>
  );
};
