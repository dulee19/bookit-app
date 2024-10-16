import { BookedRoomCard } from '@/components';
import Heading from '@/components/Heading';
import getMyBookings from '../actions/getMyBookings';

const BookingsPage = async () => {
    const bookings = await getMyBookings();

    if ('error' in bookings) {
        return (
            <>
                <Heading title="My Bookings" />
                <p className='text-red-600 mt-4'>Failed to load bookings: {bookings.error}</p>
            </>
        );
    }

    return (
        <>
            <Heading title="My Bookings" />
            {bookings.length === 0 ? (
                <p className='text-gray-600 mt-4'>You have no bookings</p>
            ) : (
                bookings.map((booking) => (
                    // @ts-ignore
                    <BookedRoomCard key={booking.$id} booking={booking} />
                ))
            )}
        </>
    )
}

export default BookingsPage