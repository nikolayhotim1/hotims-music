import React from 'react';
import s from './styles/TrackProgress.module.scss';
import formatTrackTime from '../utils/formatTime';

interface TrackProgressProps {
    left: number,
    right: number,
    onChange: (e: any) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange }) => {
    return (
        <div className={s.track_progress}>
            <input
                type='range'
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{formatTrackTime(left)} / {formatTrackTime(right)}</div>
        </div>
    );
};

export default TrackProgress;


// import React from "react";

// interface TrackProgressProps {
//     left: number;
//     right: number;
//     onChange: (e: any) => void;
//     type: string;
// }

// const convertMeasureIfLessTen = (measure: number): string => {
//     return measure < 10 ? "0" + measure.toString() : measure.toString();
// };

// const convertTimestampToTrackTime = (timestamp: number) => {
//     const hours = Math.floor(timestamp / 60 / 60);
//     const minutes = Math.floor(timestamp / 60) - hours * 60;
//     const seconds = timestamp % 60;

//     const sHours = convertMeasureIfLessTen(hours);
//     const sMinutes = convertMeasureIfLessTen(minutes);
//     const sSeconds = convertMeasureIfLessTen(seconds);

//     const areHoursMoreZero = hours > 0;
//     return `${areHoursMoreZero ? sHours + ":" : ""}${sMinutes}:${sSeconds}`;
// };

// export const TrackProgress: React.FC<TrackProgressProps> = ({
//     left,
//     right,
//     onChange,
//     type,
// }) => {
//     let formattedLeft =
//         type === "TRACK" ? convertTimestampToTrackTime(left) : left;
//     let formattedRight =
//         type === "TRACK" ? convertTimestampToTrackTime(right) : right;
//     return (
//         <div style={{ display: "flex" }}>
//             <input
//                 type="range"
//                 min={0}
//                 max={right}
//                 value={left}
//                 onChange={onChange}
//             />
//             <div style={{ marginLeft: "0.5rem" }}>
//                 {formattedLeft} / {formattedRight}
//             </div>
//         </div>
//     );
// };