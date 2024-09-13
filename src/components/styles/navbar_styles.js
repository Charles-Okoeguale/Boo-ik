import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    container1: {
      width: '95%',
      height: '10%',
      alignSelf: 'center',
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      "& .MuiButton-contained": {
            width: '8em',
            height: '3em',
            borderRadius: '0.5em',
            textTransform: 'none',
            background: '#0000FF', 
            color: 'white',  
            fontFamily: 'Space Grotesk',
            fontWeight: 900
        },
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1em',
        "& .MuiTypography-root": {
            fontWeight: 'bold',
            fontFamily: 'Space Grotesk'
        }
    },
    logo: {
        width: '5%',
        display: 'flex',
        alignItems: 'center'
    }
  }));