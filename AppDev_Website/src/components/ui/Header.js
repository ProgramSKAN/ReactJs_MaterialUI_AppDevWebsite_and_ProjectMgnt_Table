import React,{useState,useEffect} from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Typography from "@material-ui/core/Typography";
import { getThemeProps, makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const useStyles=makeStyles(theme=>({
    toolbarMargin:{
        ...theme.mixins.toolbar,
        marginBottom:"3em",
        [theme.breakpoints.down("md")]:{
            marginBottom:"2em"
        },
        [theme.breakpoints.down("xs")]:{
            marginBottom:"1.25em"
        }
    },
    logo:{
        height:"8em",
        [theme.breakpoints.down("md")]:{
            height:"7em"
        },
        [theme.breakpoints.down("xs")]:{
            height:"5.5em"
        }
    },
    logoContainer:{
        padding:0,
        "&:hover":{
            backgroundColor:"transparent"
        }
    },
    logoName:{
      color:"white",
      textTransform:"none",
      fontSize:"2rem",
      fontWeight:500
    },
    tabContainer:{
        marginLeft:"auto"
    },
    tab:{
        // fontFamily:"Raleway",
        // textTransform:"none",
        // fontWeight:700,
        // fontSize:"1rem",//OR GET FROM CENTRAL Themejs
        ...theme.typography.tab,
        minWidth:10,
        marginLeft:"25px"
    },
    button:{
        // fontFamily:"Pacifico",
        // fontSize:"1rem",
        // textTransform:"none",
        // color:"white"//OR from theme
        ...theme.typography.estimate,

        borderRadius:"50px",
        marginLeft:"50px",
        marginRight:"25px",
        height:"45px",
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        }
    },
    menu:{
        backgroundColor:theme.palette.common.blue,
        color:"white",
        borderRadius:0
    },
    menuItem:{
        ...theme.typography.tab,
        opacity:0.7,
        "&:hover":{
            opacity:1
        }
    },
    drawerIconContainer:{
        marginLeft:"auto",
        "&:hover":{
            backgroundColor:"tranparent"
        }
    },
    drawerIcon:{
        height:"50px",
        width:"50px"
    },
    drawer:{
        backgroundColor:theme.palette.common.blue
    },
    drawerItem:{
        ...theme.typography.tab,
        color:"white",
        opacity:0.7
    },
    drawerItemEstimate:{
        backgroundColor:theme.palette.common.orange
    },
    drawerItemSelected:{
        "& .MuiListItemText-root":{
            opacity:1
        }//,
        //opacity:1
    },
    appbar:{
        zIndex:theme.zIndex.modal+1
    },
    expansion: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        backgroundColor: theme.palette.common.blue,
        "&.Mui-expanded": {
          margin: 0,
          borderBottom: 0
        },
        "&::before": {
          backgroundColor: "rgba(0, 0, 0, 0)"
        }
      },
      expansionDetails: {
        padding: 0,
        backgroundColor: theme.palette.primary.light
      },
      expansionSummary: {
        padding: "0 24px 0 16px",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)"
        },
        backgroundColor: props =>
          props.value === 1 ? "rgba(0 , 0, 0, 0.14)" : "inherit"
      }
}))
  

export default function Header(props) {
    const classes=useStyles();
    // const [value,setValue]=useState(0);//move out of component for both header and footer
    //const [selectedIndex,setSelectedIndex]=useState(0);
    const {value,setValue,selectedIndex,setSelectedIndex}=props;

    const [anchorEl,setAnchorEl]=useState(null);//for Menu
    const [openMenu,setOpenMenu]=useState(false);//for Menu

    const theme=useTheme();
    const matches=useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer,setOpenDrawer]=useState(false);


    const handleChange=(e,newValue)=>{
        setValue(newValue);
    }

    const handleClick=(e)=>{
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    const handleMenuItemClick=(e,i)=>{
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    }

    const menuOptions=[
        {name:"Services",link:"/services",activeIndex:1,selectedIndex:0},
        {name:"Custom Software Development",link:"/customsoftware",activeIndex:1,selectedIndex:1},
        {name:"iOS/Android App Development",link:"/mobileapps",activeIndex:1,selectedIndex:2},
        {name:"Website Development",link:"/websites",activeIndex:1,selectedIndex:3},
    ];

    const routes=[
        {name:"Home",link:"/",activeIndex:0},
        {name:"Services",link:"/services",activeIndex:1, ariaOwns:anchorEl?"simple-menu":undefined,ariaPopup:anchorEl?"true":undefined,mouseOver:event=>handleClick(event)},
        {name:"The Revolution",link:"/revolution",activeIndex:2},
        {name:"About Us",link:"/about",activeIndex:3},
        {name:"Contact Us",link:"/contact",activeIndex:4},
    ];


    const handleClose=(e)=>{
        setAnchorEl(null);
        setOpenMenu(false);
    }

    useEffect(() => {   
        [...menuOptions,...routes].forEach(route=>{
            switch(window.location.pathname){
                case `${route.link}`:
                    if(value!==route.activeIndex){
                        setValue(route.activeIndex)
                        if(route.selectedIndex && route.selectedIndex!==selectedIndex){
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break; 
                case '/estimate':
                    if(value!==5)
                        setValue(5);
                    break;
                default:
                    break
            }
        })
    }, [value,menuOptions,selectedIndex,routes])
    //     switch(window.location.pathname){
    //         case "/":
    //             if(value!==0){
    //                 setValue(0);
    //             }
    //             break;
    //         case "/services":
    //             if(value!==1){
    //                 setValue(1);
    //                 setSelectedIndex(0);
    //             }
    //             break;
    //         case "/customsoftware":
    //             if(value!==1){
    //                 setValue(1);
    //                 setSelectedIndex(1);
    //             }
    //             break;
    //         case "/mobileapps":
    //             if(value!==1){
    //                 setValue(1);
    //                 setSelectedIndex(2);
    //             }
    //             break;
    //         case "/websites":
    //             if(value!==1){
    //                 setValue(1);
    //                 setSelectedIndex(3);
    //             }
    //             break;
    //         case "/revolution":
    //             if(value!==2){
    //                 setValue(2);
    //             }
    //             break;
    //         case "/about":
    //             if(value!==3){
    //                 setValue(3);
    //             }
    //             break;
    //         case "/contact":
    //             if(value!==4){
    //                 setValue(4);
    //             }
    //             break;
    //         case "/estimate":
    //             if(value!==5){
    //                 setValue(5);
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }, [value])

    const tabs=(
       <React.Fragment>
        <Tabs
            value={value} 
            onChange={handleChange} 
            // indicatorColor="secondary"  //by default
            className={classes.tabContainer}>

                {routes.map((route,index)=> (
                    <Tab key={`${route}${index}`} className={classes.tab} component={Link} to={route.link} label={route.name}
                    aria-owns={route.ariaOwns} aria-haspopup={route.ariaPopup} onMouseOver={route.mouseOver}/>
                ))}
                {/* <Tab label="Home" 
                    component={Link} 
                    to="/" 
                    className={classes.tab} />
                <Tab label="Services" 
                    component={Link} 
                    to="/services" 
                    className={classes.tab}
                    aria-owns={anchorEl?"simple-menu":undefined}
                    aria-haspopup={anchorEl?"true":undefined}
                    onMouseOver={event=>handleClick(event)}/>
                <Tab label="The Revolution" 
                    component={Link} 
                    to="/revolution" 
                    className={classes.tab}/>
                <Tab label="About Us" 
                    component={Link} 
                    to="/about" 
                    className={classes.tab}/>
                <Tab label="Contact Us" 
                    component={Link} 
                    to="/contact" 
                    className={classes.tab}/> */}
            </Tabs>
            <Button variant="contained" 
            color="secondary" 
            className={classes.button}
            component={Link}
            to="/estimate"
            onClick={()=>setValue(5)}>Free Estimate</Button>
            <Menu id="simple-menu" 
                anchorEl={anchorEl} 
                open={openMenu} 
                onClose={handleClose}
                MenuListProps={{onMouseLeave:handleClose}}
                classes={{paper:classes.menu}}
                elevation={0}
                style={{zIndex:1302}}
                keepMounted>

                {
                    menuOptions.map((option,i)=>(
                        <MenuItem key={`${option}${i}`}
                        onClick={(event)=>{handleMenuItemClick(event,i);handleClose();setValue(1);}}
                        component={Link} 
                        to={option.link}
                        classes={{root:classes.menuItem}}
                        selected={i===selectedIndex && value === 1}>
                            {option.name}
                        </MenuItem>
                    ))
                }
                {/* <MenuItem onClick={()=>{handleClose();setValue(1)}}
                        component={Link} 
                    to="/services"
                    classes={{root:classes.menuItem}}>Services</MenuItem>  ->>4 times*/}
            </Menu>
        </React.Fragment>
    );

    const drawer=(
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} 
            open={openDrawer} onClose={()=>setOpenDrawer(false)} onOpen={()=>setOpenDrawer(true)}
            classes={{paper:classes.drawer}}>

                <div className={classes.toolbarMargin}/>
                <List disablePadding>
                    {
                        routes.map((route,index)=>route.name==='Services'?(
                            <ExpansionPanel
                            elevation={0}
                            classes={{ root: classes.expansion }}
                            key={route.name}
                          >
                            <ExpansionPanelSummary
                              classes={{ root: classes.expansionSummary }}
                              expandIcon={<ExpandMoreIcon color="secondary" />}
                            >
                              <ListItemText
                                className={classes.drawerItem}
                                disableTypography
                                style={{
                                  opacity: props.value === 1 ? 1 : null
                                }}
                                onClick={() => {
                                  setOpenDrawer(false);
                                  props.setValue(route.activeIndex);
                                }}
                              >
                                <Link color="inherit" href={route.link}>
                                  {route.name}
                                </Link>
                              </ListItemText>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                              classes={{ root: classes.expansionDetails }}
                            >
                              <Grid container direction="column">
                                {menuOptions.map(route => (
                                  <Grid
                                    item
                                    key={`${route}${route.selectedIndex}`}
                                  >
                                    <ListItem
                                      divider
                                      button
                                      component={Link}
                                      href={route.link}
                                      selected={
                                        props.selectedIndex ===
                                          route.selectedIndex &&
                                        props.value === 1 &&
                                        window.location.pathname !== "/services"
                                      }
                                      classes={{
                                        selected: classes.drawerItemSelected
                                      }}
                                      onClick={() => {
                                        setOpenDrawer(false);
                                        props.setSelectedIndex(
                                          route.selectedIndex
                                        );
                                      }}
                                    >
                                      <ListItemText
                                        className={classes.drawerItem}
                                        disableTypography
                                      >
                                        {route.name
                                          .split(" ")
                                          .filter(
                                            word => word !== "Development"
                                          )
                                          .join(" ")}
                                        <br />
                                        <span
                                          style={{
                                            fontSize: "0.75em"
                                          }}
                                        >
                                          Development
                                        </span>
                                      </ListItemText>
                                    </ListItem>
                                  </Grid>
                                ))}
                              </Grid>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        ):(
                            <ListItem divider button key={`${route}${route.activeIndex}`} 
                            onClick={()=>{setOpenDrawer(false);setValue(route.activeIndex)}} 
                            component={Link} to={route.link} selected={value===route.activeIndex}
                            classes={{selected:classes.drawerItemSelected}}>
                                <ListItemText disableTypography 
                                    className={classes.drawerItem}>
                                    {route.name}
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                    {/* <ListItem onClick={()=>{setOpenDrawer(false);setValue(0)}} divider button component={Link} to="/" selected={value===0}>
                        <ListItemText disableTypography 
                        className={value===0?[classes.drawerItemSelected,classes.drawerItem].join(" "):classes.drawerItem}>Home</ListItemText>
                    </ListItem>
                    <ListItem onClick={()=>{setOpenDrawer(false);setValue(1)}} divider button component={Link} to="/services" selected={value===1}>
                        <ListItemText disableTypography 
                        className={value===1?[classes.drawerItemSelected,classes.drawerItem].join(" "):classes.drawerItem}>Services</ListItemText>
                    </ListItem>
                    <ListItem onClick={()=>{setOpenDrawer(false);setValue(2)}} divider button component={Link} to="/revolution" selected={value===2}>
                        <ListItemText disableTypography 
                        className={value===2?[classes.drawerItemSelected,classes.drawerItem].join(" "):classes.drawerItem}>The Revolution</ListItemText>
                    </ListItem>
                    <ListItem onClick={()=>{setOpenDrawer(false);setValue(3)}} divider button component={Link} to="/about" selected={value===3}>
                        <ListItemText disableTypography 
                        className={value===3?[classes.drawerItemSelected,classes.drawerItem].join(" "):classes.drawerItem}>About us</ListItemText>
                    </ListItem>
                    <ListItem onClick={()=>{setOpenDrawer(false);setValue(4)}} divider button component={Link} to="/contact" selected={value===4}>
                        <ListItemText disableTypography 
                        className={value===4?[classes.drawerItemSelected,classes.drawerItem].join(" "):classes.drawerItem}>Contact Us</ListItemText>
                    </ListItem> */}
                    <ListItem onClick={()=>{setOpenDrawer(false);setValue(5)}} divider button component={Link} to="/estimate" 
                    classes={{root:classes.drawerItemEstimate,selected:classes.drawerItemSelected}} selected={value===5}>
                        <ListItemText disableTypography 
                        className={classes.drawerItem}>Free Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            
            <IconButton className={classes.drawerIconContainer} onClick={()=>setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>  

        </React.Fragment>
    )


    //position='fixed' color="primary"  >>there are default.not need to explicitly mention.
    return (
        <React.Fragment>
        <ElevationScroll>
            <AppBar position='fixed' color="primary" className={classes.appbar}>
                <Toolbar disableGutters>
                    {/*LOGO IMAGE */}
                    {/* <Button component={Link} to="/" className={classes.logoContainer} onClick={()=>setValue(0)} disableRipple>
                        <img alt="App logo" src={logo} className={classes.logo}/>
                    </Button> */}
                    {/*LOGO TEXT */}
                    <Button component={Link} to="/" onClick={()=>setValue(0)} disableRipple>
                        <Typography variant="h1" className={classes.logoName}>App Dev</Typography>
                    </Button>

                    {/* <Typography variant="h3">
                        AppDev
                    </Typography> */}
                    {matches? drawer : tabs}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin}/>
        </React.Fragment>
    )
}
 