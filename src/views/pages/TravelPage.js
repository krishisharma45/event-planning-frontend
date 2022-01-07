import 'styles/Travel.css';
import { BiHotel } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { RiHotelFill } from 'react-icons/ri';
import { ImAirplane } from 'react-icons/im';
import { FaCarAlt } from 'react-icons/fa';
import { BiBus } from 'react-icons/bi';


function TravelPage() {
    return (
        <div className="wrapper">
        <div className="Travel">
            <h1> transportation </h1>
            <div className="Travel-options">
                    <p className="Travel-text">The venue has ample parking. BWI airport is an hour and a half away. Click the icons to get started.</p>
                <div className="Lodging-icons">
                    <div className="Travel-description">
                        <a href="https://www.google.com/maps/place/Hyatt+Regency+Chesapeake+Bay+Golf+Resort,+Spa+And+Marina/@38.5620367,-76.0505784,17z/data=!3m1!4b1!4m8!3m7!1s0x89b84a28f884d4eb:0xad1fa151cf8ce6eb!5m2!4m1!1i2!8m2!3d38.5620367!4d-76.0483897" className="LodgingIcon"><FaCarAlt size={45}/>
                        <p className="Hotel-distance">Car</p>
                        <p>DC: 1.5 hr</p>
                        <p>Philly: 2.25 hr</p>
                        <p>Cleveland: 7 hr</p></a>
                    </div>
                    <div className="Travel-description">
                        <a href="https://www.cheapoair.com/" className="LodgingIcon"><ImAirplane size={45}/>
                        <p className="Hotel-distance">Airplane</p>
                        <p>BWI: 79.2 mi</p>
                        <p>DCA: 91.1 mi</p>
                        <p>IAD: 118 mi</p></a>
                    </div>
                    <div className="Travel-description">
                        <a href="https://www.greyhound.com/en-us/bus-to-baltimore" className="lastTravelIcon"><BiBus size={45}/>
                        <p className="Hotel-distance">Bus</p>
                        <p>Cambridge: 2.2 mi</p>
                        <p>Baltimore: 84 mi</p>
                        <p>DC: 86 mi</p></a>
                    </div>
                </div>
            </div>
            <h1> lodging </h1>
                <div className="Lodging-options">
                     <p className="Travel-text">There are three hotels with room blocks. Book soon with the code to get the group rate. Click the icons to get started.</p>
                <div className="Lodging-icons">
                    <div className="Travel-description">
                        <a href="https://www.hyatt.com/en-US/group-booking/CHESA/G-SHJW" className="LodgingIcon"><RiHotelFill size={45}/>
                        <p className="Hotel-distance">Hyatt</p>
                        <p>0 mi</p>
                        <p>$238/night</p>
                        <p className="Hotel-code">G-SHJW</p></a>
                    </div>
                    <div className="Travel-description">
                        <a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/find-hotels/hotel/rooms?qDest=2715%20Ocean%20Gateway,%20Cambridge,%20MD,%20US&qCiMy=32022&qCiD=22&qCoMy=32022&qCoD=24&qAdlt=1&qChld=0&qRms=1&qIta=99801505&qGrpCd=SJW&qSlH=CGEMD&qAkamaiCC=US&qSrt=sBR&qBrs=re.ic.in.vn.cp.vx.hi.ex.rs.cv.sb.cw.ma.ul.ki.va.ii.sp.nd.ct.sx.we&qWch=0&qSmP=1&setPMCookies=true&qRad=30&qRdU=mi&srb_u=1&qSHBrC=EX&icdv=99801505" className="LodgingIcon"><BsHouse size={45}/>
                        <p className="Hotel-distance">Holiday Inn</p>
                        <p>1.1 mi</p>
                        <p>$159/night</p>
                        <p className="Hotel-code">SJW</p></a>
                    </div>
                    <div className="Travel-description">
                        <a href="https://www.wyndhamhotels.com/days-inn/cambridge-maryland/days-inn-and-suites-cambridge/overview?iata=00093763&cid=PS:nkqknx2u2os8a94&gclid=CjwKCAjw4KyJBhAbEiwAaAQbE-5_XssAce-8DhfR6AmyAEQyOE6il8dgTS59z-mYJ-3mu4RljYie0xoCjlEQAvD_BwE&gclsrc=aw.ds" className="lastTravelIcon"><BiHotel size={45}/>
                        <p className="Hotel-distance">Days Inn</p>
                        <p>2.6 mi</p>
                        <p>$200/night</p>
                        <p className="Hotel-code">[TBD]</p></a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default TravelPage;

