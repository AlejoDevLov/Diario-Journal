import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { setActiveNote } from "../../store/journal/journalSlice"


export const SideBarItem = ({ note }) => {

  const { id, title, body, date, imageUrls = [] } = note;

  const dispatch = useDispatch();

  const newTitle = useMemo( () => {
    return ( title.length > 17 )
      ? title.substring(0,17) + "..."
      : title
  }, [title]);

  const onClickNote = () => {
    dispatch( setActiveNote( {id, title, body, date, imageUrls} ) );
  }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
