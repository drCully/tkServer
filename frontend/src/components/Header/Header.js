import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../features/auth/authSlice'
import { uiActions } from '../../features/app/uiSlice'

import { FaUser } from 'react-icons/fa'

import Nav from '../Nav/Nav'
import {
  SCenter,
  SCloseIcon,
  SHeader,
  SHeaderFixed,
  SHeaderHeight,
  SLeft,
  SLogo,
  SLogoLink,
  SBrand,
  SMenu,
  SMenuIcon,
  SMenuToggleButton,
  SRight,
} from './headerStyles'
import { SButton, SButtonLink, SLink } from '../../styles/buttonStyles'
import LogoImg from './logo.png'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  const { menuOpen } = useSelector((state) => state.ui)

  const menuToggleHandler = () => {
    dispatch(uiActions.menuToggle())
  }

  const menuCloseHandler = () => {
    if (menuOpen) dispatch(uiActions.menuClose())
  }

  const onLogout = () => {
    dispatch(logOut())
    navigate('/')
  }

  return (
    <>
      <SHeaderHeight />
      <SHeaderFixed>
        <SHeader>
          <SLeft>
            <SLogoLink to='/' onClick={menuCloseHandler}>
              <SLogo src={LogoImg}></SLogo>
            </SLogoLink>
            <SBrand>
              Time<b>Keeper</b>
            </SBrand>
          </SLeft>
          <SCenter>
            <SCenter>{user.token ? <Nav /> : ''}</SCenter>
          </SCenter>
          <SRight>
            {user.token ? (
              <>
                <SLink to={'/profile'}>
                  <FaUser /> {user.userName}
                </SLink>
                <SButton margin='0 0 0 2rem' onClick={onLogout}>
                  Logout
                </SButton>
              </>
            ) : (
              <>
                <SButtonLink to='/login'>
                  <FaUser /> Login
                </SButtonLink>

                {/*<SLink to='/register'>
                  <FaUser /> Register
                </SLink> */}
              </>
            )}
            <SMenuToggleButton onClick={menuToggleHandler}>
              {!menuOpen ? <SMenuIcon /> : <SCloseIcon />}
            </SMenuToggleButton>
          </SRight>
        </SHeader>
      </SHeaderFixed>
      <SMenu style={menuOpen ? { left: 0 } : {}}>
        <Nav menuToggleHandler={menuToggleHandler} />
      </SMenu>
    </>
  )
}

export default Header
