import 'styles/Travel.css';
import { BiHotel } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { RiHotelFill } from 'react-icons/ri';
import { ImAirplane } from 'react-icons/im';
import { FaCarAlt } from 'react-icons/fa';
import { BiBus } from 'react-icons/bi';


function TravelPage() {
    return (
        <div className="Travel">
            <h1> transportation </h1>
            <div className="Travel-options">
                <a href="https://www.google.com/maps/place/Hyatt+Regency+Chesapeake+Bay+Golf+Resort,+Spa+And+Marina/@38.5620367,-76.0505784,17z/data=!3m1!4b1!4m8!3m7!1s0x89b84a28f884d4eb:0xad1fa151cf8ce6eb!5m2!4m1!1i2!8m2!3d38.5620367!4d-76.0483897" className="TravelIcon"><FaCarAlt size={37}/></a>
                <a href="https://www.cheapoair.com/" className="TravelIcon"><ImAirplane size={35}/></a>
                <a href="https://www.greyhound.com/en-us/bus-to-baltimore" className="lastTravelIcon"><BiBus size={40}/></a>
            </div>

            <h1> lodging </h1>
            <div className="Lodging-options">
                <a href="https://www.hyatt.com/en-US/hotel/maryland/hyatt-regency-chesapeake-bay-golf-resort-spa-and-marina/chesa/rooms" className="TravelIcon"><BiHotel size={45}/></a>
                <a href="https://www.guestreservations.com/holiday-inn-express-cambridge/booking" className="TravelIcon"><BsHouse size={45}/></a>
                <a href="hyatt.com/en-US/hotel/maryland/hyatt-regency-chesapeake-bay-golf-resort-spa-and-marina/chesa/rooms" className="lastTravelIcon"><RiHotelFill size={45}/></a>
            </div>
        </div>
    )
};

export default TravelPage;

