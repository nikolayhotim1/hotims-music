import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "../../../../store";
import { updateAlbum } from "../../../../store/action-creators/albums";
import { IAlbum } from "../../../../types/albums";

export const useOnPictureUpdate = (thisAlbum: IAlbum) => {
    const [picture, setPicture]: any = useState<File>();
    const [globTrackPicture, setGlobTrackPicture] = useState(null);
    const dispatch = useDispatch() as NextThunkDispatch;

    const handlePictureUpdate = async () => {
        await dispatch(
            updateAlbum(thisAlbum._id, {
                picture,
            })
        );
    };

    useEffect(() => {
        if (picture) {
            handlePictureUpdate();
        }
    }, [picture]);

    return { setPicture, globTrackPicture, setGlobTrackPicture };
};