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


export default function WorkoutModal(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [modalStyle] = React.useState(getModalStyle);
    const signInData = props.signInData

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempWorkout = { ...props.userGeneratedWorkout };

        if (tempWorkout[name] != null) {
            tempWorkout[name] = value;
        }
        props.setUserGeneratedWorkout(tempWorkout);
    }


    console.log('userGeneratedWorkout', props.userGeneratedWorkout)
    const formValues = props.userGeneratedWorkout


    console.log("formValues", formValues)
    const saveHandler = () => {
        console.log('workout params', {
            ...props.userGeneratedWorkout,
            user: { id: signInData.id }
        })
        axios.post('http://localhost:8080/saveworkout', {
            ...props.userGeneratedWorkout,
            user: { id: signInData.id }
        }).then(response => {
        }).catch(error => { console.log('in the future add logic to navigate to the error page') });


        // console.log(params, "params")
        console.log(props.userGeneratedWorkout, "props.userGeneratedWorkout")
    }


    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={props.workoutModalIsOpen}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className={classes.textField}>
                        <TextField name='workout' value={formValues.workout} id="standard-basic" label="Workout" onChange={(ev) => changeHandler(ev)} />
                    </div>
                    <div className={classes.textField}>
                        <TextField name='sets' value={formValues.sets} id="standard-basic" label="Sets" onChange={(ev) => changeHandler(ev)} />
                    </div >
                    <div className={classes.textField}>
                        <TextField name='reps' value={formValues.reps} id="standard-basic" label="Reps" onChange={(ev) => changeHandler(ev)} />

                    </div>
                    <div className={classes.textField}>
                        <TextField name='time' value={formValues.time} id="standard-basic" label="Time" onChange={(ev) => changeHandler(ev)} />

                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={async () => {
                                props.setworkoutModalIsOpen(false)
                                saveHandler()
                                props.setUserGeneratedWorkout({
                                    workout: "",
                                    sets: "",
                                    reps: "",
                                    time: ""
                            
                                })
                            }}>
                            Save New Workout
                        </Button>
                        <Button
                            onClick={() => {
                                props.setworkoutModalIsOpen(false)
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
