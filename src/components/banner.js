import React from 'react'
import Button from '@material-ui/core/Button';
import WorkoutModal from './workoutModal'
import WorkOutCard from './workout';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import DietCard from './diet';
import DietModal from './dietModal'
import MealPrepModal from './mealprepModal';
import MealPrepCard from './mealprep';


function Banner(props) {
    const renderCorrectTabContent = () => {
        switch (props.tabIndex) {

            case 0:
            default: {
                return (props.signInData ? (
                    <div style={{ fontSize: '3em' }}>
                        Welcome, {props.signInData.firstName}
                        <div>
                            to get started click on workout
                            diet or mealprep tab above.
                        </div>
                    </div>
                ) : (
                    <div style={{ fontSize: '3em' }}>
                        Welcome to Swol Bros Fitness Tracker,
                        <div>
                            to get started click the get started button.
                        </div>
                    </div>

                ))
            }
            case 1: {
                return (
                    <div>
                        {props.signInData ? (
                            <div>
                                <WorkoutModal
                                    setUserGeneratedWorkout={props.setUserGeneratedWorkout}
                                    userGeneratedWorkout={props.userGeneratedWorkout}
                                    workoutModalIsOpen={props.workoutModalIsOpen}
                                    setworkoutModalIsOpen={props.setworkoutModalIsOpen}
                                    signInData={props.signInData}
                                    user={props.user}
                                />
                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() => {

                                        props.setworkoutModalIsOpen(true)

                                        console.log("I added something to workout model")
                                    }} size="small">Add New Workout</Button>
                                </CardActions>
                                <Grid className={props.classes.gridContainer} container direction="row" spacing={5} >
                                    {props.workOutUserData && props.workOutUserData.map((workoutData, index) => {
                                        return (
                                            <Grid item direction="row" sm={4}>
                                                <WorkOutCard
                                                    workoutData={workoutData}
                                                    signInData={props.signInData}
                                                    index={index}
                                                    setUserWorkoutData={props.setUserWorkoutData}
                                                    userGeneratedWorkout={props.userGeneratedWorkout}
                                                    setUserGeneratedWorkout={props.setUserGeneratedWorkout}
                                                    setworkoutModalIsOpen={props.setworkoutModalIsOpen}
                                                    setdeleteWorkoutClicked={props.setdeleteWorkoutClicked}
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </div>
                        ) : (
                            <div style={{ fontSize: '3em' }} > To get started click the get started button to sign in or great a new account </div>
                        )
                        }
                    </div >
                )
            }
            case 2: {
                return (
                    <div>
                        {props.signInData ? (
                            <div>
                                <DietModal
                                    setUserGeneratedDiets={props.setUserGeneratedDiets}
                                    userGeneratedDiet={props.userGeneratedDiet}
                                    dietModalIsOpen={props.dietModalIsOpen}
                                    setDietModalIsOpen={props.setDietModalIsOpen}
                                    signInData={props.signInData}
                                    user={props.user}
                                />

                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        props.setDietModalIsOpen(true)
                                        console.log("I added something to the diet model")
                                    }} size="small">Add New Diet</Button>
                                </CardActions>
                                <Grid className={props.classes.gridContainer} container direction="row" spacing={5} >
                                    {props.userDietData && props.userDietData.map((userDiets, index) => {
                                        return (
                                            <Grid item direction="row" sm={4}>
                                                <DietCard
                                                    userDietStuff={userDiets}
                                                    signInData={props.signInData}
                                                    index={index}
                                                    setUserDietData={props.setUserDietData}
                                                    userGeneratedDiet={props.userGeneratedDiet}
                                                    setUserGeneratedDiets={props.setUserGeneratedDiets}
                                                    setDietModalIsOpen={props.setDietModalIsOpen}
                                                    setdeleteDietClicked={props.setdeleteDietClicked}
                                                />
                                            </Grid>
                                        )
                                    })}
                                    {/* </div> */}
                                </Grid>
                            </div>
                        ) : (
                            <div style={{ fontSize: '3em' }}> To get started click the get started button to sign in or great a new account</div>
                        )
                        }
                    </div >
                )
            }
            case 3: {
                return (
                    <div>
                        {props.signInData ? (
                            <div>
                                <MealPrepModal
                                    setUserGeneratedMealPrep={props.setUserGeneratedMealPrep}
                                    userGeneratedMealPrep={props.userGeneratedMealPrep}
                                    MealPrepModalIsOpen={props.MealPrepModalIsOpen}
                                    setMealPrepModalIsOpen={props.setMealPrepModalIsOpen}
                                    signInData={props.signInData}
                                    user={props.user}
                                />

                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        props.setMealPrepModalIsOpen(true)
                                        console.log("I added something  to the meal prep model")
                                    }} size="small">Add New Meal Prep</Button>

                                </CardActions>

                                <Grid className={props.classes.gridContainer} container direction="row" spacing={5} >
                                    {props.userMealPrepData && props.userMealPrepData.map((mealPrepData, index) => {
                                        return (
                                            <Grid item direction="row" sm={4}>
                                                <MealPrepCard
                                                    mealPrepData={mealPrepData}
                                                    signInData={props.signInData}
                                                    index={index}
                                                    setUserGeneratedMealPrep={props.setUserGeneratedMealPrep}
                                                    setUserMealPrepData={props.setUserMealPrepData}
                                                    userGeneratedMealPrep={props.userGeneratedMealPrep}
                                                    setMealPrepModalIsOpen={props.setMealPrepModalIsOpen}
                                                    setdeleteMealPrepClicked={props.setdeleteMealPrepClicked}

                                                />
                                            </Grid>

                                        )
                                    })}
                                    {/* </div> */}
                                </Grid>
                            </div>
                        ) : (
                            <div style={{ fontSize: '3em' }} >To get started click the get started button to sign in or great a new account</div>
                        )
                        }
                    </div >
                )
            }
        }
    }
    return (
        <div className="hero-container">
            <banner />
            <div className='banner-container'>
                {renderCorrectTabContent()}

            </div>
        </div>

    );
}
export default Banner