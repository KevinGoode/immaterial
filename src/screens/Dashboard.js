import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  loadDashboard, unloadDashboard
} from '../actions/dashboard';

import { pageLoaded } from './utils';

class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadDashboard());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadDashboard());
  }

  render() {
    const { error, tasks } = this.props;
    const { intl } = this.context;

    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Snackbar
          message={error.message}
        />
      );
    } else if (tasks.length === 0) {
      listNode = (
        <Box>
          <CircularProgress /><span>Loading...</span>
        </Box>
      );
    } else {
      const tasksNode = (tasks || []).map(task => (
        <ListItem>
          <h3><Link to={`/tasks/${task.id}`}>{task.name} </Link></h3>
          <Box>
            <b>{task.percentComplete}</b>
            <CircularProgress variant="static" value={task.percentComplete} />
          </Box>
        </ListItem>
      ));

      listNode = (
        <List  className={this.props.classes}>
          {tasksNode}
        </List>
      );
    }

    return (
      <article primary={true}>
        <h1 >
          <br />
        </h1>
        {errorNode}
        <Box pad='medium'>
          <h3>
            Running Tasks
          </h3>
          <p>
            The backend here is using request polling (5 second interval).
            See tasks page for an example
            of websocket communication.
          </p>
        </Box>
        {listNode}
      </article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  tasks: []
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  //intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);
