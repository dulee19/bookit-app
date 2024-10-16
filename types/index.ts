export interface RoomProps {
    $id: string;
    user_id: string;
    name: string;
    description: string;
    sqft: number;
    capacity: number;
    location: string;
    address: string;
    amenities: string[];
    availability: string;
    price_per_hour: number;
    image: string;
}

export interface BookingProps {
    booking: {
        $id: string;
        user_id: string;
        check_in: string;
        check_out: string;
        room_id: {
            $id: string;
            name: string;
            description: string;
            location: string;
            availability: string;
            sqft: string;
            capacity: string;
            price_per_hour: string;
            amenities: string;
            image: string;
            address: string;
        };
    }
}