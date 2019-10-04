import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import NavSidebar from './NavSidebar';


class Main extends Component {


  constructor() {
    super();
   
    
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
