/* eslint-disable quote-props */
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
    MuiTab: {
      root: {
        fontSize: 14,
        height: 40,
        minHeight: 40,
        padding: 0,
        textTransform: 'none',
      },
      selected: {
        background: theme.palette.containerDark,
        color: theme.palette.secondary,
      },
    },
    MuiTabs: {
      root: {
        minHeight: 30,
      },
      indicator: {
        display: 'none',
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: 'none',
        margin: '0px !important',
        padding: '0px !important',
        '&:before': {
          display: 'none',
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: '0px !important',
        minHeight: '30px !important',
      },
      expandIcon: {
        color: '#62E1FC',
        padding: '0px !important',
        margin: '0px !important',
      },
      content: {
        margin: '0px !important',
        minHeight: '0px !important',
      },
    },
    MuiAccordionDetails: {
      root: {
        margin: 0,
        padding: 0,
        display: 'block',
      },
    },
    MuiExpansionPanel: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
});

export default theme;
