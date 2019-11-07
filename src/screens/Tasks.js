import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  loadTasks, unloadTasks
} from '../actions/tasks';

import { pageLoaded } from './utils';
class Tasks extends Component {
  componentDidMount() {
    pageLoaded('Tasks');
    this.props.dispatch(loadTasks());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadTasks());
  }

  render() {
    const { error, tasks } = this.props;

    let errorNode;
    let tasksNode;
    if (error) {
      errorNode = (
        <Snackbar
          message={error.message}
        />
      );
    } else if (tasks.length === 0) {
      tasksNode = (
        <Box>
          <CircularProgress /><span>Loading...</span>
        </Box>
      );
    } else {
      tasksNode = (tasks || []).map(task => (
        <div>
          <Grid item xs={12}>
          <Paper >
          <h3><Link to={`/tasks/${task.id}`}>{task.name} </Link></h3>
            <b>{task.percentComplete}</b>
            <CircularProgress variant="static" value={task.percentComplete} />
          </Paper>
         </Grid>
       </div>
      ));
    }

    return (
<article primary={true}>
        <h1 >
          <br />
        </h1>
        {errorNode}
        <Grid container spacing={3}>
          {tasksNode}  
        </Grid>
      </article>
    );
  }
}
Tasks.defaultProps = {
  error: undefined,
  tasks: []
};

Tasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Tasks.contextTypes = {
  intl: PropTypes.object
};


//This is the main react-redux subscriber that gets called when there is a state change
//Input is state, output is props
//NOTE THIS FUNCTION JUST RETURNS AN OBJECT OF ELEMENTS. USING {...VAR} NOTATION MEANS THAT IF VAR HAPPENS TO BE AN ARRAY
//THEN IT IS CONVERTED TO OBJECT WITH ELEMENTS "0", "1"
const mapStateToProps = state => ({ ...state.tasks });

export default connect(mapStateToProps)(Tasks);