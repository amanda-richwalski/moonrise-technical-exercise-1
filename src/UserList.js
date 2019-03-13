import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import axios from 'axios';

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

class UserList extends React.Component {
  state = {
	  loading: true,
	  data: null,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount = () => {
	const payload = this.state;
	payload.status = 'new';
	payload.user_type = 'moonriser';
	payload.avatar = 'http://imgur.com/avatar.jpg';
	axios.get('http://localhost:8080/users', {
		headers: {
			'Content-Type': 'application/json',
		}
	})
	.then((response) => {
		const { data } = response;
		this.setState({
			loading: false,
			data,
		});
	})
	.catch((error) => {
		console.log(error);
	});
  }

  render() {
	const { classes } = this.props;
	const { loading, data } = this.state;

    return (
		<div>
			{!!loading && <div>Loading</div>}
			<Grid container spacing={16}>
				{!loading && data.map((user) => 
					<Grid key={user.id} item xs={4}>
						<Card
							name={user.name.full}
							email={user.email}
							address={user.location.address}
							 />
					</Grid>
					)}
			</Grid>
			
		</div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);