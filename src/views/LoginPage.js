import React from 'react'
import Header from '../components/headers/Header'
import AccountButton from '../components/headers/buttons/AccountButton';
import LoginCard from '../components/LoginCard';
import { makeStyles } from '@material-ui/core/styles'
import styles from '../assets/styles/loginPage'
import { grayColor } from '../assets/material-kit-react';

const useStyles = makeStyles(styles)

const LoginPage = props => {
  const classes = useStyles()

  return (
    <div>
      <Header
        color="primary"
        brand="NewsApp"
        fixed
        absolute
        rightLinks={
          <AccountButton />
        }
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundColor: grayColor,
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <LoginCard />
      </div>      
    </div>
  );
};

export default LoginPage;