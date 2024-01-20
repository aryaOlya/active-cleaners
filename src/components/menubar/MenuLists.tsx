import React from 'react'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { Link,useLocation } from 'react-router-dom';


function MenuLists() {
  const location = useLocation()
  const {pathname} = location
  return (
    <div className='pt-20 '>
      <MenuList >
        <Link to="/emails">
        <MenuItem selected={pathname==="/emails"}>
          <ListItemText>
            inbox
          </ListItemText>
        </MenuItem>
        </Link>
        <Link to="/send-email">
        <MenuItem selected={pathname==="/send-email"}>
          <ListItemText>
            compose email
          </ListItemText>
        </MenuItem>
        </Link>
        <Link to="/outbox">
        <MenuItem selected={pathname==="/outbox"}>
          <ListItemText>
            outbox
          </ListItemText>
        </MenuItem>
        </Link>
      </MenuList>
    </div>
  )
}

export default MenuLists
