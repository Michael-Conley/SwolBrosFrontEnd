import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        width: '300px'
    },
    form: {
        // display: 'flex'
    },
    popover: {

    },
    textField: {
        padding: '10px'
    }
}));

const SignInPopover = (props) => {
    const {
        signInSubmitHandler,
        setUserInfo,
        user
    } = props
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);


    //added setIsOpen to try and get the windown to close after clicking the sign in or up
    const [buttonClickedValue, setButtonClickedValue] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(null);

    //idea to close popover on submit
    //     state = {
    //         open: false
    //     }
    //     this.setState({
    //         open: true,
    //         anchorEl: event.currentTarget,
    //     });
    // };

    // const refreshPage = () => {
    //     localStorage.clear();
    // }

    const signInButtonAction = () => {
        setIsOpen(true)

        setButtonClickedValue('Sign In')
    }

    const signUpButtonAction = () => {
        setIsOpen(true)
        setButtonClickedValue('Sign Up')
    }
    // const logOutSubmitHandler = () => {
    //     // setIsOpen(null)
    //     setButtonClickedValue('Log out')
    // }
    //another attment at getting the window to close

    // const logOutButtonAction = () => {
    //     setIsOpen(true)
    //     setButtonClickedValue('Log Out')
    // }

    const handleClick = (event) => {
        setIsOpen(true)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setIsOpen(false)
        setAnchorEl(null);
    };

    //isOpen
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined;
    console.log('buttonClickedValue', buttonClickedValue)


    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = { ...user };

        if (tempUser[name] != null) {
            tempUser[name] = value;
        }
        setUserInfo(tempUser);
    }

    const signUpSubmitHandler = () => {
        axios.post('http://localhost:8080/save', user).then(response => {
        }).catch(error => { console.log('in the future add logic to navigate to the error page') });

    }
    //added log out function
    const logOutSubmitHandler = () => {
        localStorage.clear();
        window.location.href = 'http://localhost:3000';
    }


    const renderPopoverContents = () => {
        switch (buttonClickedValue) {
            case 'Sign In':
                return (
                    <div>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField name='email' id="outlined-basic" label="Email" variant="outlined" onChange={(ev) => changeHandler(ev)} />
                            <TextField name='password' id="outlined-basic" label="Password" variant="outlined" onChange={(ev) => changeHandler(ev)} />
                        </form>
                        <Button onClick={() => {
                            signInSubmitHandler()
                            // refreshPage()
                            setIsOpen(false)
                            setButtonClickedValue('Log Out')
                        }} variant="outlined" color="secondary">Log In</Button>
                    </div>

                );
            case 'Sign Up':
                return (
                    <div>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField className={classes.textField} name='firstName' id="outlined-basic" label="First Name" variant="outlined" onChange={(ev) => changeHandler(ev)} />
                            <TextField className={classes.textField} name='lastName' id="outlined-basic" label="Last Name" variant="outlined" onChange={(ev) => changeHandler(ev)} />
                            <TextField className={classes.textField} name='email' id="outlined-basic" label="Email" variant="outlined" onChange={(ev) => changeHandler(ev)} />
                            <TextField className={classes.textField} name='password' id="outlined-basic" label="Password" variant="outlined" onChange={(ev) => changeHandler(ev)} />
                        </form>
                        <Button onClick={() => {
                            signUpSubmitHandler()
                            // close popover
                            setIsOpen(false)
                            setButtonClickedValue(null)
                        }} variant="outlined" color="secondary">Sign Up</Button>
                    </div>

                );
            case 'Log Out':
                return (
                    <div>
                        <Button onClick={() => {
                            logOutSubmitHandler()
                            // setButtonClickedValue('Log out')
                        }} variant="outlined" color="secondary">LogOut</Button>
                    </div>

                )
            case null:
            default:
                return (
                    <div>
                        <div>
                            Already have account?
                        </div>
                        <div>
                            <Button onClick={signInButtonAction} variant="outlined" color="secondary">Sign In </Button>
                        </div>
                        <div>
                            Or
                        </div>
                        <div>
                            <Button onClick={signUpButtonAction} variant="outlined" color="secondary">Sign Up</Button>
                        </div>
                    </div>

                )
        }
    }
    console.log('isOpen', isOpen)
    return (
        <div>
            <Button aria-describedby={id} variant="contained" color="secondary" onClick={handleClick}>
                Get Started
            </Button>
            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.popover}
            >
                <Typography className={classes.typography}>
                    <div>
                        {renderPopoverContents()}
                    </div>
                </Typography>
            </Popover>
        </div >
    );
}

export default SignInPopover