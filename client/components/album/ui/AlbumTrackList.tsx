import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IAlbum } from "../../../types/albums";
import { ItemForAlbum } from "../ItemForAlbum";
import TrackList from "../../TrackList";

interface AlbumTrackListProps {
    thisAlbum: IAlbum;
}
export const AlbumTrackList: React.FC<AlbumTrackListProps> = ({
    thisAlbum,
}) => {
    return (
        <Grid container direction="column">
            <TrackList tracks={thisAlbum.tracks} Component={ItemForAlbum} />
        </Grid>
    );
};