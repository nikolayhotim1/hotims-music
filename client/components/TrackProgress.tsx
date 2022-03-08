import React from 'react';
import s from './styles/TrackProgress.module.scss';

interface TrackProgressProps {
    left: number,
    right: number,
    onChange: (e: any) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({
    left, right, onChange
}) => {
    return (
        <div className={s.track_progress}>
            <input
                type='range'
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    );
};

export default TrackProgress;