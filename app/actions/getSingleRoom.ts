'use server';

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getSingleRoom(id: string) {
    try {
        const { databases } = await createAdminClient();

        // Fetch rooms
        const room = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS as string,
            id
        );

        // Revalidate the cache for this path
        revalidatePath('/', 'layout')

        return room;
    } catch (error) {
        console.log('Failed to get room', error);
        redirect('/error')
    }
}

export default getSingleRoom;