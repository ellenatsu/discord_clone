import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";


export const initialProfile = async() => {
    const user = await currentUser();
    if(!user) {
        return redirectToSignIn();
    }

    const profile = await db.profile.findUnique({
        where: { id: user.id }
    });
}