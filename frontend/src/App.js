import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/globalStyles'
import { darkTheme, lightTheme } from './styles/theme'
import { Helmet } from 'react-helmet'
import Header from './components/Header/Header'
import Layout from './components/Layout'
import { SPageContainer } from './styles/containerStyles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Public from './components/Public'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/auth/Welcome'
import Billing from './features/app/billings/Billing'
import ClientsList from './features/app/clients/ClientsList'
import Client from './features/app/clients/Client'
import Invoice from './features/app/invoices/Invoice'
import InvoiceCreate from './features/app/invoices/InvoiceCreate'
import Profile from './features/app/users/profile/Profile'
import ProfileHours from './features/app/users/profile/ProfileHours'
import TasksList from './features/app/tasks/TasksList'
import Task from './features/app/tasks/Task'
import Timesheet from './features/app/timeslips/Timesheet'
import Timeslip from './features/app/timeslips/Timeslip'
import Timeslips from './features/app/timeslips/TimeslipsList'
import Users from './features/app/users/UsersList'
import UserAddEdit from './features/app/users/User'

const App = () => {
  const { theme } = useSelector((state) => state.ui)
  const currentTheme = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Helmet>
        <title>TimeKeeper</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <>
        <Header />
        <SPageContainer>
          <Routes>
            <Route path='/' element={<Layout />} />
            {/* public routes */}
            <Route index element={<Public />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register/' element={<Register />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path='/welcome' element={<Welcome />} />
              <Route path='/billings' element={<Billing />} />
              <Route path='/invoice' element={<InvoiceCreate />} />
              <Route path='/invoice/:id' element={<Invoice />} />
              <Route path='/clients' element={<ClientsList />} />
              <Route path='/client' element={<Client />} />
              <Route path='/client/:id' element={<Client />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profilehours' element={<ProfileHours />} />
              <Route path='/tasks' element={<TasksList />} />
              <Route path='/task' element={<Task />} />
              <Route path='/task/:id' element={<Task />} />
              <Route path='/timesheets' element={<Timesheet />} />
              <Route path='/timeslip' element={<Timeslip />} />
              <Route path='/timeslip/:id' element={<Timeslip />} />
              <Route path='/timeslips' element={<Timeslips />} />
              <Route path='/users' element={<Users />} />
              <Route path='/useradd' element={<UserAddEdit />} />
              <Route path='/useredit/:id' element={<UserAddEdit />} />
            </Route>
          </Routes>
        </SPageContainer>
        <ToastContainer autoClose={2000} />
      </>
    </ThemeProvider>
  )
}

export default App
