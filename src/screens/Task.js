import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  loadTask, unloadTask
} from '../actions/tasks';

import { pageLoaded } from './utils';
const styles = theme => ({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  
  });
class Task extends Component {
  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Task');
    this.props.dispatch(loadTask(params.id));
  }

  componentWillUnmount() {
    const { match: { params }, dispatch } = this.props;
    this.props.dispatch(unloadTask(params.id));
  }

  render() {
    const classes = this.props;
    const { error, task } = this.props;

    let errorNode;
    let taskNode;
    if (error) {
      errorNode = (
        <Snackbar
        message={error.message}
      />
      );
    } else if (!task) {
        taskNode = (
            <Box>
              <CircularProgress /><span>Loading...</span>
            </Box>
          );
    } else {
      taskNode = (
        <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Task Details
          </Typography>
          <Typography variant="h5" component="h2">
          {task.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          {task.status}
          </Typography>
          <Typography variant="body2" component="p">
            Percentage Complete
            <br />
            {task.percentComplete}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      );
    }

    return (
      <article>
                <h1 >
          <br />
        </h1>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <Paper> 
        <h3>
       <Link to={`/tasks`}>Back To Tasks </Link>
       </h3>
        </Paper>
        
        </Grid>
        <Grid item xs={12}>
        {errorNode}
        {taskNode}
        </Grid>
        </Grid>
      </article>

    );
  }
}

Task.defaultProps = {
  error: undefined,
  task: undefined
};

Task.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  match: PropTypes.object.isRequired,
  task: PropTypes.object
};

//This is the main react-redux subscriber that gets called when there is a state change
//Input is state, output is props
//NOTE THIS FUNCTION JUST RETURNS AN OBJECT OF ELEMENTS. USING {...VAR} NOTATION MEANS THAT IF VAR HAPPENS TO BE AN ARRAY
//THEN IT IS CONVERTED TO OBJECT WITH ELEMENTS "0", "1"
const mapStateToProps = state => ({ ...state.tasks });

export default connect(mapStateToProps)(withStyles(styles)(Task));