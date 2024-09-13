import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
	container1: {
        width: '100%',
        height: '100vh',
        background: '#F7F7F7',
        display: 'flex',
    },
    container2: {
        background: '#FFFFFF',
        width: '30%',
       
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
        width: '3em',
        height: '3em',
        border: '1px solid lightgrey',
        borderRadius: '0.4em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container4: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        gap: '1em',
        marginBottom: '3em',
        "& .MuiTypography-body2" : {
            fontSize: '0.8em',
            fontFamily: "Space Grotesk",
            fontWeight: 400
        }
    },
    container5: {
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
      },
      container6: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
}));