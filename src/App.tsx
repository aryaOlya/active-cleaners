import React from 'react';
import MenuLists from './components/menubar/MenuLists';
import Grid from '@mui/material/Unstable_Grid2';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Grid container sx={{height:"100vh"}}>
        <Grid xs={2} className="bg-blue-100 relative bottom-0">
          <MenuLists/>
        </Grid>
        <Grid xs={10} >
          <Outlet/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
