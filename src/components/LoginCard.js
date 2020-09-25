import React, { useState } from 'react';
import { login } from '../helpers/requestHelper'
import {
  InputAdornment,
  Icon,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  People
} from '@material-ui/icons'

import styles from '../assets/styles/loginPage'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

const useStyles = makeStyles(styles)

const LoginCard = props => {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card className="">
            <form
              className={classes.form}
              onSubmit={(event) => {
                event.preventDefault();
                login(event);
              }}
            >
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Login</h4>
              </CardHeader>
              <CardBody>
                  {/* <Input type="username" name="username" id="inputUsername"  placeholder="Username" required></Input> */}
                  <CustomInput
                    labelText="Username"
                    id="username"
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
                    id="password"
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
                <Button type="submit" simple color="primary" size="lg">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default LoginCard;