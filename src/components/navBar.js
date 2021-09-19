import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import SignInPopover from './signInPopover';
import axios from 'axios';
import Banner from './banner'


const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}


        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#D3D3D3',
        height: '100vh',
    },
    appBar: {
        display: 'flex',

        zIndex: '7'

    },

    card: {
        height: '100px',
        width: '500px'
    },
    appBarDiv: {
        width: '100vw%',
        display: 'flex',
        justifyContent: 'space-between',
        height: '10vh',
        alignItems: 'flex-end',
        paddingBottom: '3px',
        zIndex: '7'
    },
    signIn: {
        paddingTop: '5px'
    },
    tabs: {
        height: '10vh',
        alignItems: 'flex-end',
        fontSize: '2em',
        zIndex: '7'
    },
    tab: {
        fontSize: '.75em'
    },
    gridContainer: {
        display: 'flex',

        height: '90vh',
        paddingLeft: '10vw',
        width: '100vw',
        justifyContent: 'space-around'

    }

}));



const NavBar = (props) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [signInData, setSignInData] = React.useState(null);
    const [workOutUserData, setUserWorkoutData] = React.useState(null);
    const [userDietData, setUserDietData] = React.useState(null)
    const [userMealPrepData, setUserMealPrepData] = React.useState(null)
    const [workoutModalIsOpen, setworkoutModalIsOpen] = React.useState(false)

    const [MealPrepModalIsOpen, setMealPrepModalIsOpen] = React.useState(false)
    const [dietModalIsOpen, setDietModalIsOpen] = React.useState(false)
    const [deleteWorkoutClicked, setdeleteWorkoutClicked] = React.useState(null)
    const [deleteDietClicked, setdeleteDietClicked] = React.useState(null)
    const [deleteMealPrepClicked, setdeleteMealPrepClicked] = React.useState(null)
    const [savedWorkoutClicked, setSavedWorkoutClicked] = React.useState(null)
    const userWorkoutInfo = props.workoutData;
    const userMealPrepInfo = props.mealPrepData;
    const userDietInfo = props.userDietData;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [user, setUserInfo] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        id: ""
    })
    const [userGeneratedWorkout, setUserGeneratedWorkout] = React.useState({
        workout: "",
        sets: "",
        reps: "",
        time: ""

    })
    const [userGeneratedDiet, setUserGeneratedDiets] = React.useState({
        food: "",
        drink: "",
        amount: "",
        calories: ""

    })
    const [userGeneratedMealPrep, setUserGeneratedMealPrep] = React.useState({
        meals: "",
        grocerylist: "",
        expDate: ""
    })



    const signInSubmitHandler = () => {
        axios.post('http://localhost:8080/login', user).then(response => {
            localStorage.setItem("loggedInStudent", response.data.email)
            setSignInData(response.data)
            console.log('response', response)
        }).catch(error => { console.log('in the future add logic to navigate to the error page') });

    }

    React.useEffect(() => {
        if (signInData) {
            if (value === 1) {
                axios.get('http://localhost:8080/workoutByUserId', { params: { id: signInData.id } }).then(response => {
                    console.log('workout user by id response', response.data)
                    setUserWorkoutData(response.data)
                }).catch(error => { console.log(error, 'in the future add logic to navigate to the error page') });
            }
            if (value === 2) {
                console.log('hit second block')
                axios.get('http://localhost:8080/dietByUserId', { params: { id: signInData.id } }).then(response => {
                    setUserDietData(response.data)
                }).catch(error => { console.log(error, 'in the future add logic to navigate to the error page') });
            }
            if (value === 3) {
                console.log('hit third block')
                axios.get('http://localhost:8080/mealprepByUserId', { params: { id: signInData.id } }).then(response => {
                    setUserMealPrepData(response.data)
                }).catch(error => { console.log(error, 'in the future add logic to navigate to the error page') });
            }
        }

    },
        [value, workoutModalIsOpen, dietModalIsOpen, MealPrepModalIsOpen, deleteWorkoutClicked, deleteDietClicked, deleteMealPrepClicked, savedWorkoutClicked]

    )




    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <div className={classes.appBarDiv}>
                    <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab className={classes.tab} label="" icon={<HomeIcon />} />
                        <Tab className={classes.tab} label="Work outs" />
                        <Tab className={classes.tab} label="Diets" />
                        <Tab className={classes.tab} label="Meal Prep" />
                    </Tabs>
                    <div className={classes.signIn}>
                        <SignInPopover
                            signInSubmitHandler={signInSubmitHandler}
                            setUserInfo={setUserInfo}
                            user={user} />
                    </div>
                </div>

            </AppBar>

            <TabPanel value={value} index={0}>
                <Banner signInData={signInData} tabIndex={0} />

            </TabPanel>

            <TabPanel value={value} index={1}>
                <Banner
                    signInData={signInData}
                    tabIndex={1}
                    setUserGeneratedWorkout={setUserGeneratedWorkout}
                    userGeneratedWorkout={userGeneratedWorkout}
                    workoutModalIsOpen={workoutModalIsOpen}
                    setworkoutModalIsOpen={setworkoutModalIsOpen}
                    user={user}
                    setUserWorkoutData={setUserWorkoutData}
                    setdeleteWorkoutClicked={setdeleteWorkoutClicked}
                    workOutUserData={workOutUserData}
                    classes={classes}
                    setSavedWorkoutClicked={setSavedWorkoutClicked}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Banner
                    setUserGeneratedDiets={setUserGeneratedDiets}
                    userGeneratedDiet={userGeneratedDiet}
                    dietModalIsOpen={dietModalIsOpen}
                    setDietModalIsOpen={setDietModalIsOpen}
                    signInData={signInData}
                    user={user}
                    tabIndex={2}
                    classes={classes}
                    userDietData={userDietData}
                    setUserDietData={setUserDietData}
                    setdeleteDietClicked={setdeleteDietClicked}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Banner
                    setUserGeneratedMealPrep={setUserGeneratedMealPrep}
                    userGeneratedMealPrep={userGeneratedMealPrep}
                    MealPrepModalIsOpen={MealPrepModalIsOpen}
                    setMealPrepModalIsOpen={setMealPrepModalIsOpen}
                    signInData={signInData}
                    user={user}
                    tabIndex={3}
                    classes={classes}
                    userMealPrepData={userMealPrepData}
                    setUserMealPrepData={setUserMealPrepData}
                    setdeleteMealPrepClicked={setdeleteMealPrepClicked}
                />
            </TabPanel>

        </div >
    )
}

export default NavBar;
