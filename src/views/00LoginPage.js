import React, { useState } from 'react'
// import Header from '../components/headers/Header'

import styles from 'assets/styles/loginPage'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { makeStyles } from '@material-ui/core/styles'
import { grayColor } from '../assets/material-kit-react';

import { login } from '../helpers/requestHelper'
import MuiAlert from '@material-ui/lab/Alert';
import {
  InputAdornment,
  Icon,
  Snackbar
} from '@material-ui/core'
import {
  People
} from '@material-ui/icons'
import AuthNavbar from '../components/Navbars/AuthNavbar';


const useStyles = makeStyles(styles)

const LoginPage = props => {
  const [openLoginError, setOpenLoginError] = useState(false);
  const classes = useStyles()
  const { ...rest } = props


  const handleBadLogin = () => {
    setOpenLoginError(true)
  }
  const handleErrorAlertClose = (event, reason) => {
    return reason === 'clickaway'
      ? null
      : setOpenLoginError(false)
  }

  return (
    <div>


      {/* <Snackbar open={openLoginError} autoHideDuration={60} onClose={handleErrorAlertClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleErrorAlertClose} severity="success">
          <b>Error:</b> Incorrect username or password.
        </MuiAlert>
      </Snackbar> */}
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card className="">
              <form
                className={classes.form}
                onSubmit={async (event) => {
                  event.preventDefault();
                  login(event)
                    .then((response) => {
                      if(response.message) handleBadLogin()
                      return response
                    })
                    .then((response) => console.log(response))
                }}
              >
                <CardHeader color="danger" className={classes.cardHeader}>
                  <h4>Login</h4>
                </CardHeader>
                <CardBody>
                    <CustomInput
                      labelText="Username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'username',
                        name: 'username',
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        autoComplete: "off",
                        name: "password",
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button type="submit" size="lg">
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>    
    </div>
  );
};

export default LoginPage;