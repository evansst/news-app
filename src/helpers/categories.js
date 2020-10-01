import React from 'react'

import AnnouncementIcon from '@material-ui/icons/Announcement';
import BrushIcon from '@material-ui/icons/Brush';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import TheatersIcon from '@material-ui/icons/Theaters';
import TimelineIcon from '@material-ui/icons/Timeline';
import BusinessIcon from '@material-ui/icons/Business';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import StyleIcon from '@material-ui/icons/Style';
import SportsBasketball from '@material-ui/icons/SportsBasketball';

export const categories = [
  'Sports',
  'Travel',
  'Technology',
  'Business',
  'Politics',
  'Art',
  'Entertainment',
  'Science',
  'Social',
  'Health',
  'Style',
]

export const categoryIcons = {
  'Style': (<StyleIcon /> ),
  'Travel': (<CardTravelIcon />),
  'Social': (<EmojiPeopleIcon />),
  'Politics': (<AccountBalanceIcon />),
  'Business': (<BusinessIcon/>),
  'Science': (<TimelineIcon />),
  'Art': (<BrushIcon />),
  'Sports': (<SportsBasketball />),
  'Entertainment': (<TheatersIcon />),
  'Health': (<LocalHospitalIcon />),
  'Technology': (<ImportantDevicesIcon />),
  'default': (<AnnouncementIcon />)
}