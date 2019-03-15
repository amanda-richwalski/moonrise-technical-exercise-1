import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";


class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
		<IconButton
			aria-owns={anchorEl ? 'simple-menu' : null}
			aria-haspopup="true"
			onClick={this.handleClick}
		>
			<MenuIcon />
		</IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'block' }}><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
          <Link to="/user" style={{ textDecoration: 'none', display: 'block' }}><MenuItem onClick={this.handleClose}>Create a User</MenuItem></Link>
          <Link to="/list" style={{ textDecoration: 'none', display: 'block' }}><MenuItem onClick={this.handleClose}>List Users</MenuItem></Link>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;