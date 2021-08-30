import 'styles/Content.css';
import photo from 'images/luv-krishi.jpg';

function LandingPage() {
    return (
        <div className="Content">
            <img src={photo} className="Content-photo" alt="krishi and luv in seattle" />
        </div>
    )
};

export default LandingPage;