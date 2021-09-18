import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textField: {
        padding: '5px'
    }
}));

//change user in line 33 to the add id we used for workout
//be sure to pass the sign in user id thing to the workout model in nav bar below line 223 signindata  


export default function DietModal(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [modalStyle] = React.useState(getModalStyle);
    const signInData = props.signInData

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempDiet = { ...props.userGeneratedDiet };

        if (tempDiet[name] != null) {
            tempDiet[name] = value;
        }
        props.setUserGeneratedDiets(tempDiet);
    }


    console.log('userGeneratedDiet', props.userGeneratedDiet)
    const formValues = props.userGeneratedDiet


    console.log("formValues", formValues)
    const saveHandler = () => {

        axios.post('http://localhost:8080/savediet', {
            ...props.userGeneratedDiet,
            user: { id: signInData.id }
        }).then(response => {
        }).catch(error => { console.log('in the future add logic to navigate to the error page') });


        // console.log(params, "params")
        console.log(props.userGeneratedDiet, "props.userGeneratedDiet")
    }


    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={props.dietModalIsOpen}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className={classes.textField}>
                        <TextField name='food' value={formValues.food} id="standard-basic" label="food" onChange={(ev) => changeHandler(ev)} />
                    </div>
                    <div className={classes.textField}>
                        <TextField name='drink' value={formValues.drink} id="standard-basic" label="Drink" onChange={(ev) => changeHandler(ev)} />
                    </div >
                    <div className={classes.textField}>
                        <TextField name='amount' value={formValues.amount} id="standard-basic" label="amount" onChange={(ev) => changeHandler(ev)} />

                    </div>
                    <div className={classes.textField}>
                        <TextField name='calories' value={formValues.calories} id="standard-basic" label="calories" onChange={(ev) => changeHandler(ev)} />

                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={async () => {
                                props.setDietModalIsOpen(false)
                                saveHandler()
                                props.setUserGeneratedDiets({
                                    food: "",
                                    drink: "",
                                    amount: "",
                                    calories: ""
                                })
                            }}>
                            Save New Workout
                        </Button>
                        <Button
                            onClick={() => {
                                props.setDietModalIsOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal >
        </div >
    );
}
