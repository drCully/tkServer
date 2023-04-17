import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  useCreateUserMutation,
  useUserQuery,
  useUpdateUserMutation,
} from './usersApiSlice'

const User = () => {
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    initials: '',
    password: '',
    rate: 150,
    isAdmin: false,
    isActive: true,
  }

  const [formValues, setFormValues] = useState(initialValues)
  const [editMode, setEditMode] = useState(false)
  const [createUser] = useCreateUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const {
    email,
    firstName,
    lastName,
    initials,
    password,
    rate,
    isAdmin,
    isActive,
  } = formValues

  const navigate = useNavigate()
  let { id } = useParams()
  if (!id) {
    id = ''
  }
  const { data, error } = useUserQuery(id)

  useEffect(() => {
    if (error && id) {
      toast.error('Something went wrong')
    }
  }, [id, error])

  useEffect(() => {
    if (id) {
      setEditMode(true)
      if (data) {
        setFormValues({ ...data })
      }
    } else {
      setEditMode(false)
      setFormValues({ ...initialValues })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data])

  const handleInputChange = (event) => {
    let target = event.target
    if (target.name) {
      let name = target.name
      let value = target.type === 'checkbox' ? target.checked : target.value
      setFormValues({ ...formValues, [name]: value })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email && !password) {
      toast.error('Please complete each input field')
    } else {
      if (!editMode) {
        await createUser(formValues)
        navigate('/users')
        toast.success('User Created Successfully')
      } else {
        await updateUser(formValues)
        setEditMode(false)
        navigate('/users')
        toast.success('User Updated Successfully')
      }
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setFormValues({ ...initialValues })
    navigate('/users')
  }

  return (
    <SFixedContainer maxwidth={`${s.xsm}`}>
      <SForm className='row g-3 ms-3' onSubmit={handleSubmit}>
        <SFormTitle>{editMode ? 'Edit User' : 'Add New User'}</SFormTitle>
        <SFormControl>
          <SLabel htmlFor='email'>Email</SLabel>
          <SInput
            type='text'
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
            type='text'
            id='password'
            name='password'
            value={password}
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
            onChange={handleInputChange}
            width='100%'
          />
        </SFormControl>
        <SFormControl>
          <SLabel htmlFor='rate'>Bill Rate</SLabel>
          <SInput
            type='number'
            step='any'
            id='rate'
            name='rate'
            value={rate}
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
            {editMode ? 'Update' : 'Save'}
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

export default User
