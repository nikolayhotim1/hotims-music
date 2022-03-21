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