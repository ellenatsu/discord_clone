import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content, fileUrl } = req.body;
    const { conversationId } = req.query;
    const profile = await currentProfilePages(req);
    if (!profile) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!content && !fileUrl) {
      return res.status(400).json({ message: "Content missing" });
    }
    if (!conversationId) {
      return res.status(400).json({ message: "Conversation ID missing" });
    }
    
    const conversation = await db.conversation.findFirst({
      where:{
        id: conversationId as string,
        OR: [
          {
            memberOne:{
              profileId: profile.id
            }
          },
          {
            memberTwo:{
              profileId: profile.id
            }
          }
        ]
      },
      include:{
        memberOne: {
          include:{
            profile: true
          }
        },
        memberTwo: {
          include:{
            profile: true
          }
        }
      }
    })
  


    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });
    //for socket io
    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json({ message });
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
