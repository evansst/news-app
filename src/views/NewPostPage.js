import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useSelector } from 'react-redux';


// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import TitleIcon from '@material-ui/icons/Title';
import HttpIcon from '@material-ui/icons/Http';




import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import formStyles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { newPost } from 'helpers/postRequestHelper';


const useFormStyles = makeStyles(formStyles);

const NewPostPage = props => {
  const classes = useFormStyles()
  const user = useSelector(state => state.authentication.user.user)

  const [inputs, setInputs] = useState({
    user_id: user.id,
    title: '',
    url: '',
    date: '',
    category: '',
    content_type: '',
  })

  const [titleState, setTitleState] = useState('');
  const [urlState, seturlState] = useState('');

  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  
  const verifyUrl = value => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  
  const submitForm = () => {
    if (titleState === "") setTitleState("error");
    else if (urlState === "") seturlState("error");
    else {
      newPost(inputs)
    }
    
  };

  return (
      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitle}>Post</h4>
        </CardHeader>
        <CardBody>
          <form>
            <GridContainer justify='center'>
              <GridItem xs={12} sm={7}>
                <CustomInput
                  success={titleState === "success"}
                  error={titleState === "error"}
                  id="required"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => {
                      const { name, value } = event.target
                      
                      verifyLength(value, 1)
                        ? setTitleState("success")
                        : setTitleState("error");

                      setInputs(inputs => ({ ...inputs, [name]: value }));
                    },
                    type: "text",
                    name: 'title',
                    placeholder: 'Title...',
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}
                      >
                        <TitleIcon className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    endAdornment:
                      titleState === "error" ? (
                        <InputAdornment position="end">
                          <Close className={classes.danger} />
                        </InputAdornment>
                      ) : (
                        undefined
                      )
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={7}>
                <CustomInput
                  success={urlState === "success"}
                  error={urlState === "error"}
                  id="url"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => {
                      const { name, value } = event.target
                      verifyUrl(value)
                        ? seturlState("success")
                        : seturlState("error");

                      setInputs(inputs => ({ ...inputs, [name]: value }))
                    },
                    type: "url",
                    name: "url",
                    placeholder: "Url...",
                    startAdornment: (
                      <InputAdornment
                      position="start"
                      className={classes.inputAdornment}
                    >
                      <HttpIcon className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                    ),
                    endAdornment:
                      urlState === "error" ? (
                        <InputAdornment position="end">
                          <Close className={classes.danger} />
                        </InputAdornment>
                      ) : (
                        undefined
                      )
                  }}
                />
              </GridItem>
            </GridContainer>
          </form>
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
          <Button color="danger" onClick={submitForm}>
            Submit
          </Button>
        </CardFooter>
      </Card>
  );
};

export default NewPostPage;