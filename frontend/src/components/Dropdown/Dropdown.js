import React, { Fragment, useState } from 'react';
import {
  SArrowContainer,
  SArrowIcon,
  SNavLabel,
  SNavLabelContainer,
  SNavLink,
} from '../Nav/navStyles';
import { SDropdown, STreeChild, STreeItem } from './dropdownStyles';

const TreeItem = ({ onSelectCallback, label, children, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <STreeItem>
      {link && (
        <SNavLink to={link} onClick={onSelectCallback}>
          {label}
        </SNavLink>
      )}
      {!link && (
        <SNavLabelContainer onClick={() => setIsOpen((p) => !p)}>
          <SNavLabel isOpen={isOpen}>{label}</SNavLabel>
          <SArrowContainer isOpen={isOpen}>
            <SArrowIcon />
          </SArrowContainer>
        </SNavLabelContainer>
      )}
      {children && isOpen && <STreeChild>{children}</STreeChild>}
    </STreeItem>
  );
};

const Dropdown = ({ tree, onSelectCallback }) => {
  const createTree = (branch) => (
    <TreeItem
      onSelectCallback={onSelectCallback}
      label={branch.label}
      link={branch.link}
    >
      {branch?.branches?.map((branch, index) => (
        <Fragment key={index}>{createTree(branch)}</Fragment>
      ))}
    </TreeItem>
  );

  console.log(tree);

  return (
    <SDropdown>
      {tree.map((branch, index) => (
        <Fragment key={index}>{createTree(branch)}</Fragment>
      ))}
    </SDropdown>
  );
};

export default Dropdown;
