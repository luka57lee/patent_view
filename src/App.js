import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Home from './pages/home'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
