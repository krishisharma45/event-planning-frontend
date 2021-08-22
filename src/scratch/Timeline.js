import timelineData from 'timelineData';
import TimelineItem from 'components/TimelineItem';
import 'layouts/Timeline.css';

const Timeline = () =>
    timelineData.length > 0 && (
        <div className="timeline-container">
            {timelineData.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </div>
    );

export default Timeline;