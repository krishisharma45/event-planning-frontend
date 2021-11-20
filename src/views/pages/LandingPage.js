import 'styles/Content.css';
import photo from 'images/luv-krishi.jpg';
import React, { useEffect, useState } from "react";

function LandingPage() {
    const calculateTimeLeft = () => {
        const year = 2022;
        //let year = new Date().getFullYear();
        const difference = +new Date(`04/23/${year}`) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
            };
          }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval]) {
        return;
      }

      timerComponents.push(
        <span>
          {timeLeft[interval]} {interval}{" "}
        </span>
      );
    });

    return (
        <div className="Content">
            <div className="Content-timer">{timerComponents.length ? timerComponents : <span>Luv and Krishi get married!</span>}</div>
            <img src={photo} className="Content-photo" alt="krishi and luv in seattle" />
        </div>
    )
};

export default LandingPage;