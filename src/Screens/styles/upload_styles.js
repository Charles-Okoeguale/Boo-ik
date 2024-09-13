import { makeStyles } from "@mui/styles";

export const styles1 = {
    fontSize: '1.5em', 
    fontWeight: 700
}

export const styles2 = {
    fontSize: '5em'
}


export const useStyles = makeStyles((theme) => ({
	container1: {
        width: '100%',
        height: '100vh',
        background: '#F7F7F7',
        display: 'flex',
        flexDirection: 'column'
    },
    container2: {
        background: '#FFFFFF',
        width: '40%',
       height: '60%',
        margin: 'auto',
        borderRadius: '2em',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
         paddingTop: '1.5em',
        "& .MuiButton-contained": {
            width: '90%',
            textTransform: 'none',
            height: '3.5em',
            background: '#FFFFFF',
            border: '1px solid lightgrey',
            boxShadow: 'none',
            color: '#000000',
            fontWeight: 'bold',
            borderRadius: '0.5em',
            marginBottom: '3em'
        },
        "& .MuiFormHelperText-root" : {
           alignSelf: 'center',
           marginLeft: '2.1em',
           marginBottom: '6em',
           marginTop: '2em'
        }
    },
    container3: {
        width: '90%',
        height: '60%',
        display: 'flex',              // Enable Flexbox
        flexDirection: 'column',       // Stack the icon and text vertically
        justifyContent: 'center',      // Center content vertically
        alignItems: 'center', 
        border: '1px dashed lightgrey',
        "& .MuiTypography-body2" : {
            fontSize: '0.9em',
            fontFamily: "Space Grotesk",
            fontWeight: 400
        }
    },
    container4: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        gap: '1em',
        marginBottom: '3em',
        justifyContent: 'space-between',
        alignItems: 'center',
        "& .MuiTypography-body2" : {
            fontSize: '0.8em',
            fontFamily: "Space Grotesk",
            fontWeight: 400
        }
    },
    container5: {
        width: '90%',
        height: '20%',
        background: '#F7F7F7',
        marginTop: '2em',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1em',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingTop: '1em',
        flexDirection: 'column',
        marginBottom: '3em',
        "& .MuiTypography-body2" : {
            fontSize: '1em',
            fontFamily: "Space Grotesk",
            fontWeight: 400,
        }
    },
    container7: {
        width: '3em',
        height: '3em',
        borderRadius: '1em',
        background: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container8: {
        width: '60%',
        height: '40%',
        display: 'column',
        justifyContent: 'row',
        gap: '1em'
    },
    container10: {
        width: '100%',
        height: '40%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container12: {
        width: '90%',
        gap: '0.5em',
        display: 'flex',
       "& .MuiButton-outlined": {
            width: '49%',
            height: '3em',
            borderRadius: '0.5em',
            textTransform: 'none',
            background: 'white',  // White background for the outlined button (Cancel)
            color: 'black',       // Black text on white background
            border: '1px solid lightgrey',  // Adding border to the outlined button
        },
        "& .MuiButton-contained": {
            width: '49%',
            height: '3em',
            borderRadius: '0.5em',
            textTransform: 'none',
            background: '#0000FF',   // Blue background for the contained button (Sign up)
            color: 'white',       // White text on the blue background
        },
    }
   
}));