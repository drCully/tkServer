import React, { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import {
  SArrowContainer,
  SArrowIcon,
  SNav,
  SNavLabel,
  SNavLabelContainer,
  SNavLink,
  SNavLinkContainer,
} from './navStyles'

const Nav = ({ navLinks, menuToggleHandler }) => {
  const [openDropdown, setOpenDropdown] = useState(null)

  const openDropdownHandler = (label) => {
    if (label === openDropdown) return setOpenDropdown(null)
    setOpenDropdown(label)
  }

  const onSelectCallback = () => {
    if (menuToggleHandler) menuToggleHandler()
    setOpenDropdown(null)
  }

  return (
    <SNav>
      {navLinks.map(({ label, link, tree }, index) => {
        const isOpen = openDropdown === label
        return (
          <SNavLinkContainer key={index}>
            {link && <SNavLink to={link}>{label}</SNavLink>}
            {!link && (
              <SNavLabelContainer onClick={() => openDropdownHandler(label)}>
                <SNavLabel isOpen={isOpen}>{label}</SNavLabel>
                <SArrowContainer isOpen={isOpen}>
                  <SArrowIcon />
                </SArrowContainer>
              </SNavLabelContainer>
            )}
            {isOpen && (
              <Dropdown tree={tree} onSelectCallback={onSelectCallback} />
            )}
          </SNavLinkContainer>
        )
      })}
    </SNav>
  )
}

Nav.defaultProps = {
  navLinks: [
    {
      label: 'Time',
      link: '/timesheets',
      tree: null,
    },
    {
      label: 'Billing',
      link: '/billings',
      tree: null,
    },

    {
      label: 'Clients',
      link: '/clients',
      branches: null,
    },
    {
      label: 'Tasks',
      link: '/tasks',
      branches: null,
    },
    {
      label: 'Users',
      link: '/users',
      branches: null,
    },
  ],
}

export default Nav
