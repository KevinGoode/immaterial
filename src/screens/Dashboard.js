import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { VictoryPie,VictoryChart,VictoryLine,VictoryTheme,VictoryAxis,VictoryLabel,VictoryStack, VictoryArea  } from 'victory'

import {
  loadDashboard, unloadDashboard
} from '../actions/dashboard';

import { pageLoaded } from './utils';
const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadDashboard());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadDashboard());
  }

  render() {
    const {classes} = this.props;
    const { error, tasks,activity,taskByCategory,activityContinuous,activityOneOff, activityScheduled } = this.props;
    const { intl } = this.context;
    //https://en.wikipedia.org/wiki/Web_colors
    let paleColors = ["greenyellow","tomato","powderblue","lightpink","wheat","plum","honeydew","beige","mistyrose","lightyellow"];
    let whiteColors = ["honeydew","beige","mistyrose","aliceblue","azure","linen", "whitesmoke","ghostwhite", "mintcream","ivory"];
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
          <h3><Link to={`/tasks/${task.id}`}>{task.name} </Link></h3>
          
            <b>{task.percentComplete}</b>
            <CircularProgress variant="static" value={task.percentComplete} />
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
        <Grid item xs={12}>
          <Paper >
          <h3>
            Dashboard Summary
          </h3>
          <p>
            The backend here is using request polling on summary rest api (5 second interval).
            See tasks page for an example
            of websocket communication.
          </p>
          </Paper>
          </Grid>
          
          
          <Grid item xs={4}>
          <Paper className={classes.paper}>

          <VictoryPie animate={{ duration: 1000 }} colorScale={paleColors} 
            data={taskByCategory}
            labelRadius={50}
          />
          <VictoryLabel text={"Tasks by Type"}/>
          </Paper>
          </Grid>
          <Grid item xs={4}>
          <Paper className={classes.paper}>
          <VictoryChart animate={{duration: 500,easing: "bounce"}}theme={VictoryTheme.material}>
          <VictoryAxis
            label="Time (Hours)"
            axisLabelComponent={<VictoryLabel dy={20}/>}
          />
          <VictoryAxis dependentAxis
            label="Number of Running Tasks"
            axisLabelComponent={<VictoryLabel dy={20}/>}
          />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
              }}
              data={activity}
            />
          </VictoryChart >
          <VictoryLabel text={"Task History"}/>
          </Paper>
          </Grid>
          <Grid item xs={4}>
          <Paper className={classes.paper}>
          <VictoryChart animate={{duration: 500,easing: "bounce"}}theme={VictoryTheme.material}>
          
          <VictoryStack colorScale={paleColors} >
      
            <VictoryArea
              data={activityContinuous}
            />
            <VictoryArea
              data={activityScheduled }
            />
            <VictoryArea
              data={activityOneOff}
            />
            <VictoryAxis
            label="Time (Hours)"
            axisLabelComponent={<VictoryLabel dy={20}/>}
          />
          <VictoryAxis dependentAxis
            label="Number of Running Tasks"
            axisLabelComponent={<VictoryLabel dy={-20}/>}
          />
        </VictoryStack>
        </VictoryChart >
          <VictoryLabel text={"Task History by Type"}/>
          </Paper>
          </Grid>
          
          <Grid item xs={4}>
          <Paper className={classes.paper}>
          {tasksNode}
          </Paper>
          </Grid>
        </Grid>
      </article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  tasks: []
};

Dashboard.propTypes = {
  //TODO had to comment this
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  //intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(withStyles(styles)(Dashboard));
