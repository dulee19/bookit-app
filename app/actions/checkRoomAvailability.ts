'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

// Convert a date string to a Luxon DateTime object in UTC
function toUTCDateTime(dateString: string) {
    return DateTime.fromISO(dateString, { zone: 'utc' }).toUTC();
}

// Check for overlapping date ranges
function dateRangesOverlap(checkInA: string, checkOutA: string, checkInB: string, checkOutB: string) {
    return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkRoomAvailability(roomId: string, checkIn: string, checkOut: string) {
    const sessionCookie = cookies().get('appwrite-session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        const checkInDateTime = toUTCDateTime(checkIn);
        const checkOutDateTime = toUTCDateTime(checkOut);

        // Fetch all bookings for a given room
        const { documents: bookings } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS as string,
            [Query.equal('room_id', roomId)]
        );

        // Loop over bookingsa and check for overlaps
        for (const booking of bookings) {
            const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
            const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

            if (
                dateRangesOverlap(
                    // @ts-ignore
                    checkInDateTime,
                    checkOutDateTime,
                    bookingCheckInDateTime,
                    bookingCheckOutDateTime
                )
            ) {
                return false; // Overlap found, do not book
            }
        }

        // No overlap found, continue to book
        return true;
    } catch (error) {
        console.log('Failed to check availability', error);
        return {
            error: 'Failed to check availability',
        };
    }
}

export default checkRoomAvailability;