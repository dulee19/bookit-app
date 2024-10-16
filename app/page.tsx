import { RoomCard, Heading } from '@/components';
import { RoomProps } from '@/types';
import getAllRooms from './actions/getAllRooms';

export default async function Home() {
  const documents = await getAllRooms();

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
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomCard key={room.$id} room={room} />
        ))
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}
