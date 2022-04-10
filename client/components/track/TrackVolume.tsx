import React from 'react';
import s from './styles/TrackProgress.module.scss';

interface TrackVolumeProps {
    left: number;
    right: number;
    onChange: (e: any) => void;
}

const TrackVolume: React.FC<TrackVolumeProps> = ({ left, right, onChange }) => {
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

export default TrackVolume;