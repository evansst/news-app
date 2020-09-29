import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons




// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

const useStyles = makeStyles(styles);

const NewPostSelectorInputs = props => {
  const [simpleSelect, setSimpleSelect] = useState("");
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [tags, setTags] = useState(["pizza", "pasta", "parmesan"]);
  const classes = useStyles();

  const handleSimple = event => {
    setSimpleSelect(event.target.value);
  };
  const handleMultiple = event => {
    setMultipleSelect(event.target.value);
  };
  const handleTags = regularTags => {
    setTags(regularTags);
  };
  return (
    <GridItem xs={12} sm={12} md={6}>
      <GridContainer>
        <GridItem xs={12} sm={6} md={5} lg={5}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}
          >
            <InputLabel
              htmlFor="simple-select"
              className={classes.selectLabel}
            >
              Choose City
            </InputLabel>
            <Select
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={simpleSelect}
              onChange={handleSimple}
              inputProps={{
                name: "simpleSelect",
                id: "simple-select",
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Choose City
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                Paris
              </MenuItem>

            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6} md={5} lg={5}>
          <FormControl
            fullWidth
            className={classes.selectFormControl}
          >
            <InputLabel
              htmlFor="multiple-select"
              className={classes.selectLabel}
            >
              Choose City
            </InputLabel>
            <Select
              multiple
              value={multipleSelect}
              onChange={handleMultiple}
              MenuProps={{ className: classes.selectMenu }}
              classes={{ select: classes.select }}
              inputProps={{
                name: "multipleSelect",
                id: "multiple-select"
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                Choose City
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelectedMultiple
                }}
                value="2"
              >
                Paris
              </MenuItem>
              
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    </GridItem>
  );
};

export default NewPostSelectorInputs;