import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SButton, SButtonLink } from '../../../../styles/buttonStyles'
import { s } from '../../../../styles/variables'
import {
  SFixedContainer,
  SFlexContainer,
  SFlexCol,
} from '../../../../styles/containerStyles'
import { SInput, SSelect } from '../../../../styles/formStyles'
import { ProfileHoursDetail } from './ProfileHoursDetail'

const ProfileHours = () => {
  const currentUser = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [activeStatus, setActiveStatus] = useState(true)
  const onChangeActiveStatus = (event) => {
    const activeStatus = event.target.value
    setActiveStatus(activeStatus)
  }
  const [billedStatus, setBilledStatus] = useState('')
  const onChangeBilledStatus = (event) => {
    const billedStatus = event.target.value
    setBilledStatus(billedStatus)
  }

  const [searchDescription, setSearchDescription] = useState('')
  const onChangeSearchDescription = (event) => {
    const searchDescription = event.target.value
    setSearchDescription(searchDescription)
  }

  const handleNewTimeslip = () => {
    navigate('/timeslip')
  }

  return (
    <SFixedContainer maxwidth={`${s.xxl}`}>
      <SFlexContainer margin='1rem 0 0 0'>
        <SFlexCol fsize='1'>
          <h2>Timeslips</h2>
          <h4>{currentUser.userName}</h4>
        </SFlexCol>
        <SSelect
          onChange={(event) => {
            onChangeBilledStatus(event)
          }}
          width='10rem'
        >
          <option value=''>Show All</option>
          <option value='false'>Show Unbilled</option>
          <option value='true'>Show Billed</option>
        </SSelect>
        <SInput
          type='search'
          className='form-control'
          placeholder='Search in description'
          value={searchDescription}
          onChange={onChangeSearchDescription}
          width={'20rem'}
          margin={'0 1em'}
        />
        <SButton onClick={handleNewTimeslip}>Add New</SButton>
        <SButton
          background='gray'
          type='button'
          margin='0 .5rem '
          onClick={(e) => {
            navigate(-1)
          }}
        >
          Go Back
        </SButton>
      </SFlexContainer>
      <ProfileHoursDetail
        billedStatus={billedStatus}
        searchDescription={searchDescription}
      />
    </SFixedContainer>
  )
}

export default ProfileHours
