import React, { useEffect, useState } from "react";
// import { Autocomplete } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles.js";
//{ onPlaceChanged, onLoad }
function Header({ setCoordinates }) {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  // const onLoad = (autoC) => setAutocomplete(autoC);
  // const onPlaceChanged = () => {
  //   if (!autocomplete) return;
  //   const lat = autocomplete?.getPlace()?.geometry?.loacation?.lat();
  //   const lng = autocomplete?.getPlace()?.geometry.loacation?.lng();
  //   console.log(lat, lng);
  //   setCoordinates({ lat, lng });
  // };

  useEffect(() => {
    if (!autocomplete) return;
    const lat = autocomplete?.geometry?.location?.lat();
    const lng = autocomplete?.geometry?.location?.lng();
    setCoordinates({ lat, lng });
  }, [autocomplete]);

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> */}
          <Autocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              setAutocomplete(place);
            }}
            options={{
              // componentRestrictions: { country: ["bd"] },
              fields: ["address_components", "geometry", "name"],
              strictBounds: false,
              types: ["establishment"],
            }}
            placeholder="Search here..."
          >
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div> */}
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
