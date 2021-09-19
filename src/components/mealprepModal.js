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




export default function MealPrepModal(props) {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [modalStyle] = React.useState(getModalStyle);
    const signInData = props.signInData

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempMealPrep = { ...props.userGeneratedMealPrep };

        if (tempMealPrep[name] != null) {
            tempMealPrep[name] = value;
        }
        props.setUserGeneratedMealPrep(tempMealPrep);
    }



    const formValues = props.userGeneratedMealPrep

    console.log("MEAL PREP BY ID3", props.userGeneratedMealPrep)

    console.log("formValues", formValues)
    const saveHandler = () => {

        axios.post('http://localhost:8080/savemealprep', {
            ...props.userGeneratedMealPrep,
            user: { id: signInData.id }
        }).then(response => {
            console.log('meal prep response', response)
        }).catch(error => { console.log('in the future add logic to navigate to the error page') });



        console.log(props.userGeneratedMealPrep, "props.userGeneratedMealPrep")
    }


    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={props.MealPrepModalIsOpen}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className={classes.textField}>
                        <TextField name='meals' value={formValues.meals} id="standard-basic" label="Meals" onChange={(ev) => changeHandler(ev)} />
                    </div>
                    <div className={classes.textField}>
                        <TextField name='grocerylist' value={formValues.grocerylist} id="standard-basic" label="grocerylist" onChange={(ev) => changeHandler(ev)} />
                    </div >
                    <div className={classes.textField}>
                        <TextField name='expDate' value={formValues.expDate} id="standard-basic" label="expDate" onChange={(ev) => changeHandler(ev)} />

                    </div>

                    <div>
                        <Button
                            variant="contained"
                            onClick={async () => {
                                props.setMealPrepModalIsOpen(false)
                                saveHandler()
                                props.setUserGeneratedMealPrep({
                                    meals: "",
                                    grocerylist: "",
                                    expDate: "",
                                    id: ""
                                })
                            }}>
                            Save New Meal Prep
                        </Button>
                        <Button
                            onClick={() => {
                                props.setMealPrepModalIsOpen(false)
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
