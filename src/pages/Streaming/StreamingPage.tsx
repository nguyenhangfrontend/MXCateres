import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CardMedia from '@mui/material/CardMedia';
import ListItemText from '@mui/material/ListItemText';

export default function MediaList() {
  return (
    <List>
      <ListItem>
        <CardMedia
          component="img"
          sx={{ width: 50, height: 50, marginRight: 2 }}
          image="https://via.placeholder.com/50"
          alt="Image thumbnail"
        />
        <ListItemText primary="Image Item" />
      </ListItem>
      <ListItem>
        <CardMedia
          component="video"
          sx={{ width: 50, height: 50, marginRight: 2 }}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        />
        <ListItemText primary="Video Item" />
      </ListItem>
      <ListItem>
        <CardMedia
          component="video"
          sx={{ width: 50, height: 50, marginRight: 2 }}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        />
        <ListItemText primary="Video Item" />
      </ListItem>
      <ListItem>
        <CardMedia
          component="video"
          sx={{ width: 50, height: 50, marginRight: 2 }}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        />
        <ListItemText primary="Video Item" />
      </ListItem>
      <ListItem>
        <CardMedia
          component="video"
          sx={{ width: 50, height: 50, marginRight: 2 }}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        />
        <ListItemText primary="Video Item" />
      </ListItem>
    </List>
  );
}