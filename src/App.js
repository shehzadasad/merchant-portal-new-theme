import AppLayout from '@crema/core/AppLayout'
import JWTAuthAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider'
import AppContextProvider from '@crema/utility/AppContextProvider'
import AppLocaleProvider from '@crema/utility/AppLocaleProvider'
import AppStyleProvider from '@crema/utility/AppStyleProvider'
import AppThemeProvider from '@crema/utility/AppThemeProvider'
import AuthRoutes from '@crema/utility/AuthRoutes'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import configureStore, { history } from 'redux/store'
import ReportError from 'ReportError'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { ThemeProvider } from 'react-bootstrap'
const store = configureStore()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e93a7d',
    },
  },
})
const App = () => (
  <ThemeProvider theme={theme}>
    <AppContextProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <BrowserRouter history={history}>
                <ToastContainer />
                <JWTAuthAuthProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <AppLayout />
                  </AuthRoutes>
                </JWTAuthAuthProvider>
              </BrowserRouter>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
        <ReportError />
      </Provider>
    </AppContextProvider>
  </ThemeProvider>
)

export default App
