import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MealPrepModal from './mealprepModal';

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

export default function MealPrepCard(props) {
    const classes = useStyles();
    const userMealPrepInfo = props.mealPrepData;
    console.log(props.signInData, "props.user");

    return (


        <Card id={props.index} className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.signInData.firstName}'s {props.index + 1} MealPrep
                </Typography>
                <Typography variant="h5" component="h2">
                    <div>
                        Meals: {userMealPrepInfo.meals}
                    </div>
                    <div>
                        Grocery list: {userMealPrepInfo.grocerylist}
                    </div>
                    <div>
                        Exp date: {userMealPrepInfo.expDate}
                    </div>

                </Typography>

            </CardContent>
            <CardActions>
                <Button id={props.index}
                    onClick={() => {
                        console.log("MEAL PREP BY ID1", props.mealPrepData)

                        axios.post('http://localhost:8080/mealprepbymealprepid', {}, { params: { id: userMealPrepInfo.id } }).then(response => {
                            console.log("MEAL PREP BY ID2", response.data)
                            return props.setUserGeneratedMealPrep({
                                meals: response.data.meals,
                                grocerylist: response.data.grocerylist,
                                expDate: response.data.expDate,
                                id: userMealPrepInfo.id
                            })


                        }).catch(error => { console.log('update mealprep') });
                        props.setMealPrepModalIsOpen(true)

                    }
                    }
                    size="small"
                    variant="contained"
                    color="secondary">
                    Update MealPrep
                </Button>
                <Button
                    id={props.index}
                    onClick={() => {
                        axios.get('http://localhost:8080/deletemealprepbyid', { params: { id: userMealPrepInfo.id } }
                        ).then(response => {
                        }).catch(error => { console.log('in the future add logic to navigate to the error page') });
                        console.log("deleteworkoutbyid", props.userGeneratedDiet)
                        props.setdeleteMealPrepClicked(userMealPrepInfo.id)
                    }
                    }
                    size="small"
                    variant="contained"
                    color="secondary">
                    Delete MealPrep
                </Button>
            </CardActions>
        </Card>
    );
}
