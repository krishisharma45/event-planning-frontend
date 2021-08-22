import 'layouts/Content.css';
import photo from 'images/index_1.jpeg';

function Content() {
    return (
    <div className="Content">
        <img src={photo} className="Content-photo" alt="krishi and luv in seattle" />
    </div>
    );
}

export default Content;