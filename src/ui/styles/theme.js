import { createMuiTheme } from '@material-ui/core/styles';

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
    containerDark: '#000000',
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
      disableRipple: true,
      outlinedPrimary: {
        color: theme.palette.textPrimary,
        fontSize: 14,
        textTransform: 'none',
      },
    },
  },
});

export default theme;
