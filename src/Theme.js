import { createMuiTheme } from '@material-ui/core/styles';



const palette = {
  primary: { main: '#4db848' },
  secondary: { main: '#414a6b' },
  palette: {
    type: "light"
  }
};
const themeName = 'FRAZA_THEME';
const direction = 'rtl';
const typography = {
  fontFamily: '"Tajawal", sans-serif',
}

export default createMuiTheme({ palette, themeName, direction, typography });