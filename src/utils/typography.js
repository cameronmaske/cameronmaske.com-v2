import Typography from "typography";
import theme from 'typography-theme-lawton'

theme.overrideThemeStyles = () => ({
  'a': {
    textShadow: 'none',
  }
})

const typography = new Typography(theme);

export default typography;
