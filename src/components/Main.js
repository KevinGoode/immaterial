import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';







import NavSidebar from './NavSidebar';
import { navResponsive } from '../actions/nav';

class Main extends Component {


  constructor() {
    super();
    this._onResponsive = this._onResponsive.bind(this);
    
  }

  _onResponsive(responsive) {
    this.props.dispatch(navResponsive(responsive));
  }

  render() {
    const {classes} = this.props;


    return (
     

       <Router>
        <NavSidebar/>
            
        </Router>
        

    );
  }
}

Main.defaultProps = {
  
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
 
};

const select = state => ({
  //TODO
});

export default connect(select)(Main);
