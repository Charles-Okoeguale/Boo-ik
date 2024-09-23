import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container2: {
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'row'
    },
    container1: {
        width: '100%',
        height: '100vh',
        background: '#F7F7F7',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '2em',
        paddingRight: '2em',
        "& .MuiTypography-root": {
            fontSize: '1.5em',
            fontWeight: 900,
            fontFamily: 'Space Grotesk',
            alignSelf: 'center',
            marginBottom: '1em'
        }

    },
    viewer: {
        width: '65%',
        background: 'white',
        height: '100%',
        borderRadius: ''
    }
}));