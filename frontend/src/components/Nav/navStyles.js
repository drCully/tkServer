import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { v, b } from '../../styles/variables';

import { IoMdArrowDropdown } from 'react-icons/io';

export const SNav = styled.nav`
  width: auto;
  padding: ${v.mdSpacing};
  background: ${({ theme }) => theme.bg};
  border-radius: ${v.borderRadius};

  @media ${b.md} {
    background: none;
    padding: 0;
    height: 100%;
    display: flex;
  }
`;

export const SNavUser = styled(SNav)`
  width: 300px;
  padding: ${v.mdSpacing};
  background: ${({ theme }) => theme.bg};
  border-radius: ${v.borderRadius};
`;

export const SNavLinkContainer = styled.div`
  user-select: none;
  position: relative;
  width: 100%;
  justify-content: space-between;

  :not(:last-of-type) {
    margin-bottom: ${v.mdSpacing};
  }

  @media ${b.md} {
    display: flex;
    align-items: center;
    :not(:last-of-type) {
      margin-bottom: 0;
      margin-right: ${v.mdSpacing};
    }
  }
`;

export const SNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;

  &.active {
    color: #eb6f16;
    font-weight: 500;

    &:hover {
      color: #ff6a00;
    }
  }

  &:hover {
    color: #959faa;
  }
`;

export const SArrowContainer = styled.div`
  svg {
    color: ${({ isOpen, theme }) => (!isOpen ? 'inherit' : theme.primary)};
    transform: ${({ isOpen }) => (!isOpen ? 'rotate(-90deg)' : 'none')};
  }
`;
export const SArrowIcon = styled(IoMdArrowDropdown)`
  display: block;
  margin-left: 4px;
`;

export const SNavLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const SNavLabel = styled.span`
  color: ${({ isOpen, theme }) => (!isOpen ? 'inherit' : theme.primary)};
`;
