import getMyRooms from "@/app/actions/getMyRooms"
import { Heading, MyRoomCard } from "@/components"
import { RoomProps } from "@/types";

const MyRoomsPage = async () => {
    const documents = await getMyRooms();

    const rooms: RoomProps[] = documents.map((doc) => ({
        $id: doc.$id,
        user_id: doc.user_id || '',
        name: doc.name || '',
        description: doc.description || '',
        sqft: doc.sqft || 0,
        capacity: doc.capacity || 0,
        location: doc.location || '',
        address: doc.address || '',
        amenities: doc.amenities ? doc.amenities.split(", ") : [],
        availability: doc.availability || '',
        price_per_hour: doc.price_per_hour || 0,
        image: doc.image || '',
    }));

    return (
        <>
            <Heading title="My Rooms" />
            {rooms.length > 0 ? (
                rooms.map((room) => (
                    <MyRoomCard key={room.$id} room={room} />
                ))
            ) : (
                <p>You have no room listings</p>
            )}
        </>
    )
}

export default MyRoomsPage