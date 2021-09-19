import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

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



export default function DietCard(props) {
    const classes = useStyles();
    const userDietInfo = props.userDietStuff;
    const signInData = props.signInData


    return (
        <Card id={props.index} className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.signInData.firstName}'s {props.index + 1} Diet
                </Typography>
                <Typography variant="h5" component="h2">
                    <div>
                        Food: {userDietInfo.food}
                    </div>
                    <div>
                        Drink: {userDietInfo.drink}
                    </div>
                    <div>
                        Amount : {userDietInfo.amount}
                    </div>
                    <div>
                        Calories: {userDietInfo.calories}
                    </div>


                </Typography>

            </CardContent>
            <CardActions>
                <Button id={props.index}
                    onClick={() => {
                        axios.post('http://localhost:8080/dietbydietid', {}, { params: { id: userDietInfo.id } }).then(response => {
                            return props.setUserGeneratedDiets(response.data)

                        }).catch(error => { console.log('in the future add logic to navigate to the error page') });
                        props.setDietModalIsOpen(true)
                    }
                    }
                    size="small"
                    variant="contained"
                    color="secondary">
                    Update DIET
                </Button>
                <Button id={props.index}
                    onClick={() => {
                        axios.get('http://localhost:8080/deletedietbyid', { params: { id: userDietInfo.id } }
                        ).then(response => {
                        }).catch(error => { console.log('in the future add logic to navigate to the error page') });
                        console.log("deletedietbyid", props.userGeneratedDiet)
                        props.setdeleteDietClicked(userDietInfo.id)
                    }
                    }
                    size="small"
                    variant="contained"
                    color="secondary">
                    Delete DIET
                </Button>
            </CardActions>
        </Card>
    );
}
