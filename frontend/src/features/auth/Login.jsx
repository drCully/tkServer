import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { toast } from 'react-toastify'
import { FaSignInAlt, FaUser } from 'react-icons/fa'

import { SFixedContainer, SFlexContainer } from '../../styles/containerStyles'
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
} from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialValues)
  const { email, password } = formValues
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...userData }))
      setFormValues({ ...initialValues })
      navigate('/timesheets')
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        toast('No Server Response')
      } else if (err.originalStatus === 400) {
        toast('Missing Username or Password')
      } else if (err.originalStatus === 401) {
        toast('Unauthorized')
      } else {
        toast('Login Failed')
      }
    }
  }

  const handleCancel = () => {
    setFormValues({ ...initialValues })
    navigate('/')
  }

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>
          <FaUser
            style={{
              marginRight: '.7em',
            }}
          />
          Login
        </SFormTitle>
        <SFormControl>
          <SLabel htmlFor='email'>Email Address</SLabel>
          <SInput
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='password'>Password</SLabel>
          <SInput
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFlexContainer>
          <SButton background='green' type='submit' margin='.5rem'>
            <FaSignInAlt /> Login
          </SButton>

          <SButton
            background='gray'
            type='button'
            margin='.5rem'
            onClick={handleCancel}
          >
            Cancel
          </SButton>
        </SFlexContainer>
      </SForm>
    </SFixedContainer>
  )

  return content
}

export default Login
