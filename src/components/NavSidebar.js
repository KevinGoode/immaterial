import clsx from 'clsx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import { Link } from 'react-router-dom';
import { navShow } from '../actions/nav';
import Routes from './Routes';
// Styling with components and materialui
//https://codex.happyfuncorp.com/styling-and-theming-with-material-ui-react-material-design-3ba2d2f0ef25
//Default Theme API here:
//https://material-ui.com/customization/default-theme/
//This code based on persistent drawer:
//https://material-ui.com/components/drawers/
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  buttonArrow:{
    direction: theme.direction
  },
menuLinks: {
             color: "dimgray", 
             "text-decoration": "none"},

  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NavSidebar extends Component {
  constructor(props) {
    super(props);
    this._show = this._show.bind(this);
  }

  _show(yes) {
    return ()=>{this.props.dispatch(navShow(yes))};
  }
  render() {

    const {classes} = this.props;
    const { nav: { items } } = this.props;
    const links = items.map((page, key) => (
         <Link to={page.path} className={clsx(classes.menuLinks)}>
            <ListItem>
              <ListItemIcon>
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={page.label} />
            </ListItem>
            </Link>
    ));

    return (
  
     
     <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.props.nav.show,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this._show(true)}
            edge="start"
            className={clsx(classes.menuButton, this.props.nav.show && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My-Mi-Pi - Microservice Manager for Raspberry Pi
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.props.nav.show}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
<div className={classes.drawerHeader}>
          <IconButton onClick={this._show(false)}>
            {classes.buttonArrow.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>

        <List>
        <Divider/>
            <ListItem>
              <ListItemIcon>
                <BlurOnIcon/>
              </ListItemIcon>
              <b><ListItemText primary="MyMiPi"></ListItemText></b>
            </ListItem>
          <Divider/>
          {links}
        </List>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: this.props.nav.show,
        })}
      >  
                 <Routes/>
                 
 </main>
      </div>
    );
  }
}

NavSidebar.defaultProps = {
  open: true,
  nav: {
    show: false, // start with nav hidden
  }
};

NavSidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    show: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string
    }))
  })
};

const mapStateToProps  = state => {
  //This is the main react-redux subscriber that gets called when there is a state change
  //Input is state, output is props
  return {nav: state.nav};
};
//Register state changer function on class NavSidebar via react-redux:connect function
export default connect(mapStateToProps)(withStyles(styles)(NavSidebar));
