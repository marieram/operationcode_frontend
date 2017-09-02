import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { styles, navbarCustom } from './header.css';
import NavItem from './navItem/navItem';
import TopNav from './topNav/topNav';
import SideNav from './sideNav/sideNav';
import Logo from './logo/logo';
import Burger from './burger/burger';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isSideNavVisible: false,
    };
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
    this.navbarCustom = this.navbarCustom.bind(this);
  }

  handleToggleDrawer(e) {
    e.preventDefault();
    this.setState({ isSideNavVisible: !this.state.isSideNavVisible });
    this.setState({ navbarCustom: this.state.navbarCustom });
  }

  renderNavContents(signedIn, mentor, onClick, navbarCustom) {
    return (
      <div>
        <navbarCustom>
          <NavItem to="/about" text="About" onClick={this.bind} />
          <NavItem to="/code_schools" text="Code Schools" onClick={onClick} />
          <NavItem to="https://donorbox.org/operationcode" text="Donate" onClick={onClick} isExternal />
          {signedIn && <NavItem to="/mentor-request" text="Request Help" onClick={onClick} />}
          {signedIn && <NavItem to="/mentors" text="Mentors" onClick={onClick} />}
          {mentor && <NavItem to="/requests" text="Requests" onClick={onClick} />}
          {signedIn && <NavItem to="/squads" text="Squads" onClick={onClick} />}
          {signedIn ? <NavItem to="/profile" text="Profile" onClick={onClick} />
                    : <NavItem to="/join" text="Join" onClick={onClick} />}
          {signedIn ? <NavItem to="/" text="Logout" onClick={this.props.logOut} />
                    : <NavItem to="/login" text="Login" onClick={onClick} />}
        </navbarCustom>
      </div>
    );
  }

  render() {
    const { mentor, signedIn } = this.props;
    const classes = classNames({
      [`${styles.header}`]: true,
      [`${styles.navbarCustom}`]: true,
      [`${styles.transparent}`]: this.props.transparent
    });
    return (
      <div className={classes} >
        <navbarCustom>
          <Logo />
          <Burger onClick={this.handleToggleDrawer} />
          <TopNav>
            {this.renderNavContents(signedIn, mentor)}
          </TopNav>
          <SideNav
            isVisible={this.state.isSideNavVisible}
            onClose={this.handleToggleDrawer}
          >
            {this.renderNavContents(signedIn, mentor, this.handleToggleDrawer)}
          </SideNav>
        </navbarCustom>
      </div>
    );
  }
}

Header.propTypes = {
  transparent: PropTypes.bool,
  logOut: PropTypes.func,
  signedIn: PropTypes.bool,
  mentor: PropTypes.bool,
  navbarCustom: PropTypes.bool
};

Header.defaultProps = {
  transparent: false,
  logOut: () => {},
  signedIn: false,
  mentor: false,
  navbarCustom: true
};

export default Header;
