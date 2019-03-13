import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import 'whatwg-fetch'
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
	flexWrap: 'wrap',
	width: 450,
	marginTop: 16,
	margin: 'auto',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  button: {
	marginRight: 40,
  }
});

class OutlinedTextFields extends React.Component {
  state = {
		payload: {
			first: '',
			last: '',
			email: '',
			phone: '',
			address: '',
			lat: 0,
			lng: 0
		},
		error: false,
		errorMessage: '',
		redirect: false,
  };

  handleChange = name => event => {
    this.setState({
      payload: {
				...this.state.payload,
				[name]: event.target.value,
			}
    });
  };

  onSubmit = event => {
	const { payload } = this.state;
	console.log('payload: ', payload)
	payload.status = 'new';
	payload.user_type = 'moonriser';
	payload.avatar = 'http://imgur.com/avatar.jpg';
	fetch('http://localhost:8080/users', {
		method: 'POST',
		body: JSON.stringify(payload),
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': "*"
		}
	})
	.then((response) => {
			this.setState({
				redirect: true,
			})
	})
	.catch((error) => {
		console.log(error);
		this.setState({
			error: true,
			errorMessage: error.message,
		});
	});
  }

  render() {
		const { classes } = this.props;
		const { redirect, error, errorMessage } = this.state;

    return (
			<React.Fragment>
			{
				!!redirect && <Redirect to={'/list'} />
			}
			{ !redirect && <form className={classes.container} noValidate autoComplete="off">
				<Grid container className={classes.root} spacing={16}>
					<Grid item xs={12}>
						<TextField
						id="first"
						label="First Name"
						className={classes.textField}
						value={this.state.first}
						onChange={this.handleChange('first')}
						margin="normal"
						variant="outlined"
						/>
						<TextField
						id="last"
						label="Last Name"
						className={classes.textField}
						value={this.state.last}
						onChange={this.handleChange('last')}
						margin="normal"
						variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						id="email"
						label="Email"
						className={classes.textField}
						value={this.state.email}
						onChange={this.handleChange('email')}
						margin="normal"
						variant="outlined"
						/>
						<TextField
						id="phone"
						label="Phone"
						className={classes.textField}
						value={this.state.phone}
						onChange={this.handleChange('phone')}
						margin="normal"
						variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						id="address"
						label="Address"
						className={classes.textField}
						value={this.state.address}
						onChange={this.handleChange('address')}
						margin="normal"
						variant="outlined"
						/>
						<TextField
						id="lat"
						label="Latitude"
						className={classes.textField}
						value={this.state.name}
						onChange={this.handleChange('lat')}
						margin="normal"
						variant="outlined"
						type="number"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						id="lng"
						label="Longitude"
						className={classes.textField}
						value={this.state.name}
						onChange={this.handleChange('lng')}
						margin="normal"
						variant="outlined"
						type="number"
						/>
					</Grid>
					<Grid item xs={12} >
						<Grid container justify="flex-end">
							<Button className={classes.button} variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button>
						</Grid>
					</Grid>
					{ !!error && <Grid item xs={12}>
						<div>
							<h2>Error: {errorMessage}</h2>
						</div>
					</Grid> }
				</Grid>
					</form>}
			</React.Fragment>
      
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);