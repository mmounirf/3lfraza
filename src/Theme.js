import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  
  primary: { main: '#4db848' },
  secondary: { main: '#ff8f00' },
  palette: {
    type: "light"
  }
};
const themeName = 'FRAZA_THEME';
const direction = 'rtl';

export default createMuiTheme({ palette, themeName, direction });