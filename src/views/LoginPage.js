import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userActions } from '_actions';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { People } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const { history } = props
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  // const [submitted, setSubmitted] = useState(false)
  const { username, password } = inputs
  // const loggingIn = useSelector(state => state.authentication.loggingIn)
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();

  useEffect(() => {
    setCardAnimation("");
    dispatch(userActions.logout())
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
}

  const submitForm = event => {
    event.preventDefault();

    // setSubmitted(true)
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from, history));
  }
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={submitForm}>
            <Card  className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="danger"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Username"
                  id="username"
                  onChange={handleChange}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'username',
                    name: 'username',
                    required: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  onChange={handleChange}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: 'password',
                    name: 'password',
                    required: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" size="lg" block>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
