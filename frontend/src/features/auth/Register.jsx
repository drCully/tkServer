import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useRegisterMutation } from './authApiSlice'

import { SFixedContainer } from '../../styles/containerStyles'
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
} from '../../styles/formStyles'
import { SButton } from '../../styles/buttonStyles'
import { s } from '../../styles/variables'

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    firstname: '',
    lastname: '',
  })

  const { email, password, password2, firstname, lastname } = formData
  const [registerUser] = useRegisterMutation()
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        email,
        password,
        firstname,
        lastname,
      }
      dispatch(registerUser(userData))
      toast.success('Client Created Successfully')
    }
  }

  const handleCancel = (event) => {
    //setFormValues({ ...initialValues });
    //navigate('/payees');
  }

  return (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>
          <FaUser
            style={{
              marginRight: '.7em',
            }}
          />
          Register
        </SFormTitle>
        <p>Please create an account</p>
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
        <SFormControl>
          <SLabel htmlFor='password2'>Confirm Password</SLabel>
          <SInput
            type='password'
            id='password2'
            name='password2'
            value={password2}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='firstname'>First Name</SLabel>
          <SInput
            type='text'
            id='firstname'
            name='firstname'
            value={firstname}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='lastname'>Last Name</SLabel>
          <SInput
            type='text'
            id='lastname'
            name='lastname'
            value={lastname}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>

        <SButton type='submit' margin='.5rem'>
          Save
        </SButton>

        <SButton
          background='gray'
          type='button'
          margin='.5rem'
          onClick={handleCancel}
        >
          Cancel
        </SButton>
      </SForm>
    </SFixedContainer>
  )
}

export default RegisterScreen
