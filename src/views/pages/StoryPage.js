import 'styles/Story.css';
import 'styles/Content.css';
import story1 from 'images/story_1.jpeg';
import strike1 from 'images/strike_1.jpeg';
import strike2 from 'images/strike_2.jpeg';
import stay1 from 'images/stay_1.jpeg';
import stay2 from 'images/stay_2.jpeg';
import way1 from 'images/way_1.jpeg';
import way2 from 'images/way_2.jpeg';
import apart1 from 'images/apart_1.jpeg';
import apart2 from 'images/apart_2.jpeg';
import moments1 from 'images/moments_1.jpeg';
import moments2 from 'images/moments_2.jpeg';
import roots1 from 'images/roots_1.jpeg';
import roots2 from 'images/roots_2.jpeg';
import world1 from 'images/world_1.jpeg';
import world2 from 'images/world_2.jpeg';
import gravity1 from 'images/gravity_1.jpeg';
import gravity2 from 'images/gravity_2.jpeg';


function StoryPage() {
    return (
        <div className="Story">
            <h1> a luv story </h1>
                <div className="story">
                    <img src={story1} className="Story-photo" alt="luv and krishi's story" />
                </div>
            <p>They say luv strikes the hardest when you least expect it. When we walked into the gym that fall day, luv was the last thing we expected. </p><br></br>
                <div className="strike">
                    <img src={strike1} className="Story-photo" alt="luv and krishi at snow lake" />
                    <img src={strike2} className="Story-photo" alt="luv and krishi together" />
                </div>
            <p>From then on, whether we were sneaking moments away during work or going out to see each other, it was always clear - Luv was here to stay. </p><br></br>
                <div className="stay">
                    <img src={stay1} className="Story-photo" alt="luv and krishi at cap1" />
                    <img src={stay2} className="Story-photo" alt="luv and krishi at mall" />
                </div>
            <p>In a galaxy far, far away, these two rebel spies managed to sneak away from the evil Galactic Empire (their corporate job). However, luv always finds a way. </p><br></br>
                <div className="way">
                    <img src={way1} className="Story-photo" alt="luv and krishi riding bikes" />
                    <img src={way2} className="Story-photo" alt="luv and krishi in cleveland" />
                </div>
            <p>We had to have many goodbyes and many hellos. With luv, anything was possible and nothing could keep us apart. </p><br></br>
                <div className="apart">
                    <img src={apart1} className="Story-photo" alt="luv and krishi having fun" />
                    <img src={apart2} className="Story-photo" alt="luv and krishi at botanical garden" />
                </div>
            <p>Every moment shared was the most special moment, and despite all these, the only thing some of us (Krishi) never got enough of, was luv.  </p><br></br>
                <div className="moments">
                    <img src={moments1} className="Story-photo" alt="luv and krishi having fun" />
                    <img src={moments2} className="Story-photo" alt="luv and krishi at botanical garden" />
                </div>
            <p>Seeing each others roots, dreaming how far we would reach together towards the sun, it became all the more obvious. Luv was a flower that was blooming </p><br></br>
                <div className="roots">
                    <img src={roots1} className="Story-photo" alt="luv and krishi in virgina" />
                    <img src={roots2} className="Story-photo" alt="luv and krishi in cerritos" />
                </div>
            <p>Seeing the world together only showed us more beauty of each other. Even after no longer needing to be separated, Luv was still in the air. </p><br></br>
                <div className="world">
                    <img src={world1} className="Story-photo" alt="luv and krishi in vancouver" />
                    <img src={world2} className="Story-photo" alt="luv and krishi in chicago" />
                </div>
            <p>Gravity is Luv, and the only demand Luv has, is that we fall. And fall, we did. </p>
                <div className="gravity">
                    <img src={gravity1} className="Story-photo" alt="luv and krishi eating burgers" />
                    <img src={gravity2} className="Story-photo" alt="luv and krishi being crazy good looking" />
                </div>
        </div>
    )
};

export default StoryPage;