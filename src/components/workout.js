import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: '300px',
        width: '500px',
        backgroundColor: '#364C60',
        border: "1px solid black",
        padding: "20px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export default function WorkOutCard(props) {
    const classes = useStyles();
    const userWorkoutInfo = props.workoutData;
    const signInData = props.signInData
    console.log(props.signInData, "props.user");
    console.log(props.workoutData, "props.workoutData");

    return (
        // <Grid container spacing={2} xs={12} >

        <Card id={props.index} className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.signInData.firstName}'s {props.index + 1} Workout
                </Typography>
                <Typography variant="h5" component="h2">
                    <div>
                        Workout: {userWorkoutInfo.workout}
                    </div>
                    <div>
                        reps: {userWorkoutInfo.reps}
                    </div>
                    <div>
                        sets: {userWorkoutInfo.sets}
                    </div>
                    <div>
                        time Worked out: {userWorkoutInfo.time}
                    </div>

                </Typography>

            </CardContent>
            <CardActions>
                <Button id={props.index}
                    onClick={() => {
                        axios.post('http://localhost:8080/workoutbyworkoutid', {}, { params: { id: userWorkoutInfo.id } }).then(response => {
                            props.setUserGeneratedWorkout(response.data)

                        }).catch(error => { console.log('update workout') });
                        props.setworkoutModalIsOpen(true)
                    }
                    }
                    size="small"
                    variant="contained"
                    color="secondary">

                    Update Workout
                </Button>
                <Button id={props.index}
                    onClick={() => {
                        axios.get('http://localhost:8080/deleteworkoutbyid', { params: { id: userWorkoutInfo.id } }
                        ).then(response => {
                        }).catch(error => { console.log('in the future add logic to navigate to the error page') });
                        console.log("deleteworkoutbyid", props.userGeneratedWorkout)
                        props.setdeleteWorkoutClicked(userWorkoutInfo.id)
                    }
                    }
                    size="small"
                    variant="contained"
                    color="secondary"
                >
                    Delete Workout
                </Button>
            </CardActions>
        </Card>
        // </Grid>
        // </Grid >
    );
}




    // console.log('props.workoutCardId', props.workoutCardId)
    // React.useEffect(() => {
    //     // if (userWorkoutInfo.id != null) {
    //     axios.post('http://localhost:8080/workoutbyworkoutid', { params: { id: 1 } }).then(response => {
    //         setFromValues(response.data)
    //         console.log('workoutbyworkoutid', response.data)
    //     }).catch(error => { console.log('in the future add logic to navigate to the error page') });
    //     // }
    // }, [props.workoutModalIsOpen])
