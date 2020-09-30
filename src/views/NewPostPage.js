import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from "@material-ui/core/InputAdornment"
import { useSelector } from 'react-redux'
import { categories } from 'helpers/categories'
import { contentTypes } from 'helpers/contentTypes'

// material ui icons
import Close from "@material-ui/icons/Close"
import TitleIcon from '@material-ui/icons/Title'
import HttpIcon from '@material-ui/icons/Http'
import PermMediaIcon from '@material-ui/icons/PermMedia';
import CategoryIcon from '@material-ui/icons/Category';

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import Button from "components/CustomButtons/Button.js"
import Card from "components/Card/Card.js"
import CardHeader from "components/Card/CardHeader.js"
import CardBody from "components/Card/CardBody.js"
import CardFooter from "components/Card/CardFooter.js"


import formStyles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js"
import selectStyles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js"

import { newPost } from 'helpers/postRequestHelper'

const useFormStyles = makeStyles(formStyles)
const useSelectStyles = makeStyles(selectStyles)

const NewPostPage = props => {
  const classes = useFormStyles()
  const selectFormClasses = useSelectStyles()
  const user = useSelector(state => state.authentication.user.user)

  // form input values
  const [inputs, setInputs] = useState({
    user_id: user.id,
    title: '',
    url: '',
    category: '',
    content_type: '',
  })

  const handleChange = (name, value) => {
    setInputs(inputs => ({ ...inputs, [name]: value }))
  }

  // input validation indicators
  const [titleState, setTitleState] = useState(null)
  const [urlState, seturlState] = useState(null)
  const [categoryState, setCategoryState] = useState(null)
  const [contentTypeState, setContentTypeState] = useState(null)

  const verifyAll = () => {
    return (titleState && urlState && categoryState && contentTypeState) === 'success'
  } 

  const [category, setCategory] = useState('')
  const [contentType, setContentType] = useState('')

  const handleCategory = event => {
    const { name, value } = event.target
    setCategory(value)
    setCategoryState('success')
    handleChange(name, value)
  }
  
  const handleContentType = event => {
    const { name, value } = event.target
    setContentType(value)
    setContentTypeState('success')
    handleChange(name, value)
  }
  

  // input validators
  const verifyLength = (value, minimum, maximum) => {
    if (value.length >= minimum && value.length <= maximum) {
      return true
    }
    return false
  };
  
  const verifyUrl = value => {
    try {
      new URL(value)
      return true
    } catch (_) {
      return false
    }
  }
  
  const submitForm = () => {
    if (verifyAll()) newPost(inputs)
  }

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={10} lg={8} xl={8} >
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitle}>Post</h4>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer justify='center'>
                <GridItem xs={2} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    <TitleIcon />
                  </FormLabel>
                </GridItem>
                <GridItem xs={10} sm={8}>
                  <CustomInput
                    success={titleState === "success"}
                    error={titleState === "error"}
                    id="required"
                    labelText="Title"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        const { name, value } = event.target
                        
                        verifyLength(value, 1, 140)
                          ? setTitleState("success")
                          : setTitleState("error")

                        handleChange(name, value)
                      },
                      type: "text",
                      name: 'title',
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
                <GridItem sm={2} md={2} lg={2} xl={2} />
                <GridItem xs={2} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    <HttpIcon />
                  </FormLabel>
                </GridItem>
                <GridItem xs={10} sm={8}>
                  <CustomInput
                    success={urlState === "success"}
                    error={urlState === "error"}
                    labelText="Url"
                    id="url"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        const { name, value } = event.target
                        verifyUrl(value)
                          ? seturlState("success")
                          : seturlState("error")

                        handleChange(name, value)
                      },
                      type: "url",
                      name: "url",
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
                <GridItem sm={2} />
                <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                  <GridContainer>
                    <GridItem xs={2} sm={1} md={1} lg={1}>
                      <FormLabel className={classes.labelHorizontal}>
                        <CategoryIcon />
                      </FormLabel>
                    </GridItem>
                    <GridItem xs={10} sm={5} md={5} lg={5}>
                      <FormControl
                        fullWidth
                        className={selectFormClasses.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="category-select"
                          className={selectFormClasses.selectLabel}
                        >
                          Category
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: selectFormClasses.selectMenu
                          }}
                          classes={{
                            select: selectFormClasses.select
                          }}
                          value={category}
                          onChange={handleCategory}
                          inputProps={{
                            name: "category",
                            id: "category-select",
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: selectFormClasses.selectMenuItem
                            }}
                          >
                            Category
                          </MenuItem>
                          {categories.map(category => {
                            return (
                              <MenuItem
                                key={category}
                                classes={{
                                  root: selectFormClasses.selectMenuItem,
                                  selected: selectFormClasses.selectMenuItemSelected
                                }}
                                value={category}
                              >
                                {category}
                              </MenuItem>
                            )
                          })}                 
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem xs={2} sm={1} md={1} lg={1}>
                      <FormLabel className={classes.labelHorizontal}>
                        <PermMediaIcon />
                      </FormLabel>
                    </GridItem>

                    <GridItem xs={10} sm={5} md={5} lg={5}>
                      <FormControl
                        fullWidth
                        className={selectFormClasses.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="contentType-select"
                          className={selectFormClasses.selectLabel}
                        >
                          Content Type
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: selectFormClasses.selectMenu
                          }}
                          classes={{
                            select: selectFormClasses.select
                          }}
                          value={contentType}
                          onChange={handleContentType}
                          inputProps={{
                            name: "content_type",
                            id: "contentType-select",
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: selectFormClasses.selectMenuItem
                            }}
                          >
                            Content Type
                          </MenuItem>
                          {contentTypes.map(contentType => {
                            return (
                              <MenuItem
                                key={contentType}
                                classes={{
                                  root: selectFormClasses.selectMenuItem,
                                  selected: selectFormClasses.selectMenuItemSelected
                                }}
                                value={contentType}
                              >
                                {contentType}
                              </MenuItem>
                            )
                          })}                 
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
          <CardFooter className={classes.justifyContentCenter}>
            <GridContainer >
              <GridItem xs={6} s={6} md={6} lg={6} xl={6}>
                <Button
                  color={verifyAll() ? "danger": null}
                  disabled={!verifyAll()}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </GridItem>
              <GridItem xs={6} s={6} md={6} lg={6} xl={6}>
                <Button onClick={() => props.history.goBack()}>
                  Cancel
                </Button>
              </GridItem>
            </GridContainer>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

export default NewPostPage