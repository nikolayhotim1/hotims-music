import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NextThunkDispatch } from "../store";
import { updateAlbum } from "../store/action-creators/albums";
import { IAlbum } from "../types/albums";
import { TFieldRef } from "../types/jointTypes";

export const useOnBlurUpdate = (thisAlbum: IAlbum | any, setThisAlbum: Function) => {
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useDispatch() as NextThunkDispatch;

    const [currentField, setCurrentField]: any = useState<TFieldRef>();

    useEffect(() => {
        if (isEditable) {
            currentField.current.focus();
        }
    }, [isEditable]);

    const handleOnBlurAlbumUpdate = async (
        fieldRef: TFieldRef,
        field: string
    ) => {
        const fieldContent = fieldRef.current.textContent;
        if (thisAlbum[field] === fieldContent) {
            setIsEditable(false);
            return;
        }

        await dispatch(
            updateAlbum(thisAlbum._id, {
                [field]: fieldRef.current.textContent,
            })
        );
        setIsEditable(false);
        setCurrentField();
        setThisAlbum({
            ...thisAlbum,
            [field]: fieldRef?.current?.textContent?.trim(),
        });
    };

    const handleClickOnEditIcon = (fieldRef: TFieldRef) => {
        setCurrentField(fieldRef);
        setIsEditable(true);
    };

    return {
        isEditable,
        handleOnBlurAlbumUpdate,
        handleClickOnEditIcon,
    };
};