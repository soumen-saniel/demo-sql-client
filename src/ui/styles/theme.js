import {createMuiTheme} from '@material-ui/core/styles';

const theme = {
  palette: {
    primary: '#2026D2',
    secondary: '#62E1FC',
    borderPrimary: '#CFD4D7',
    borderSecondary: '#EDF1F4',
    textPrimary: '#171717',
    textSecondary: '#3E4C59',
    textLabel: '#CFD4D7',
    containerLight: '#EDF1F4',
    containerDark: '#191B36',
  },
};

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.palette.primary,
    },
    secondary: {
      main: theme.palette.secondary,
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
    fontSize: 14,
    textTransform: 'none',
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        fontSize: 14,
        height: 30,
        padding: '0px 15px',
        textTransform: 'none',
      },
      outlinedPrimary: {
        color: theme.palette.textPrimary,
        fontSize: 14,
        textTransform: 'none',
      },
    },
    MuiInput: {
      root: {
        height: 25,
      },
    },
  },
});

export default theme;
