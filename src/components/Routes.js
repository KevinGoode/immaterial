import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import Task from '../screens/Task';

/*
import Login from '../screens/Login';
import System from '../screens/System';
import NotFound from '../screens/NotFound';
*/

class Routes extends Component {
  constructor() {
    super();
  }

  _
  render() {
    
    return (
     
      
        <Switch>
<Route exact={true} path='/' component={Dashboard}/>} />
<Route path='/dashboard' component={Dashboard} />/>
{/* VERY IMPORTANT CHILD URIS (eg /tasks/:id ) NEED TO GO BEFORE PARENTS !!! (eg /tasks) */}
<Route path='/tasks/:id' component={Task} />
<Route path='/tasks' component={Tasks} />}/>

{/*
<Route path='/system' component={System} />
<Route path='/login' component={Login} />

*/}
</Switch>

    );
  }
}

Routes.defaultProps = {
  
};

Routes.propTypes = {
 
 
};

const select = state => ({
  //TODO
});

export default connect(select)(Routes);


