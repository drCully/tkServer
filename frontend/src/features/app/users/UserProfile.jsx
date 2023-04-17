import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  SFixedContainer,
  SFlexContainer,
} from '../../../styles/containerStyles'
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SLabel,
} from '../../../styles/formStyles'
import { SButton } from '../../../styles/buttonStyles'
import { s } from '../../../styles/variables'
import {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
} from './usersApiSlice'

const initialValues = {
  email: '',
  password: '',
  password2: '',
  firstName: '',
  lastName: '',
  initials: '',
  rate: 0,
  isActive: true,
  isAdmin: false,
}

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const [formValues, setFormValues] = useState(initialValues)
  const {
    email,
    password,
    password2,
    firstName,
    lastName,
    initials,
    rate,
    isActive,
    isAdmin,
  } = formValues

  const { data, error } = useUserProfileQuery(user._id)
  const [updateUser] = useUpdateUserProfileMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong')
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setFormValues({ ...data })
    }
  }, [data])

  const handleInputChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!firstName && !lastName && !initials && !rate) {
      toast.error('Please provide value for required fields')
    } else {
      if (password !== password2) {
        toast.error('Passwords do not match')
      } else {
        const userData = formValues.filer('password2')
        console.log('User: ', userData)
        await updateUser(userData)

        navigate('/')
        toast.success('User Profile Updated Successfully')
      }
    }
  }

  const handleCancel = (event) => {
    setFormValues({ ...initialValues })
    navigate('/')
  }

  return (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm onSubmit={handleSubmit}>
        <SFormTitle>Edit User Profile</SFormTitle>
        <SFormControl>
          <SLabel htmlFor='email'>Email Address</SLabel>
          <SInput
            type='text'
            id='email'
            name='email'
            value={email}
            placeholder='required'
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='password'>New Password</SLabel>
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
          <SLabel htmlFor='password2'>Confirm New Password</SLabel>
          <SInput
            type='password2'
            id='password2'
            name='password2'
            value={password2}
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='firstName'>First Name</SLabel>
          <SInput
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            placeholder='required'
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='lastName'>Last Name</SLabel>
          <SInput
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            placeholder='required'
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='initials'>Initials</SLabel>
          <SInput
            type='text'
            id='initials'
            name='initials'
            value={initials}
            placeholder='required'
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='rate'>Rate</SLabel>
          <SInput
            type='number'
            id='rate'
            name='rate'
            value={rate}
            placeholder='required'
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl style={{ marginTop: '1.1rem' }}>
          <SLabel htmlFor='isAdmin'>Admin?</SLabel>
          <SInput
            type='checkbox'
            id='isAdmin'
            name='isAdmin'
            value={isAdmin}
            checked={isAdmin}
            onChange={handleInputChange}
            style={{ cursor: 'pointer' }}
            width={`2rem`}
            height={`1.1rem`}
          />
          <SLabel htmlFor='isActive'>Active?</SLabel>
          <SInput
            type='checkbox'
            id='isActive'
            name='isActive'
            value={isActive}
            checked={isActive}
            onChange={handleInputChange}
            style={{ cursor: 'pointer' }}
            width={`2rem`}
            height={`1.1rem`}
          />
        </SFormControl>
        <SFlexContainer>
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
        </SFlexContainer>
      </SForm>
    </SFixedContainer>
  )
}

export default UserProfile
