import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";


import background from '../assets/background.jpg';
import phoneIcon from '../assets/phone.svg';
import emailIcon from '../assets/email.svg';
import airplane from '../assets/send.svg';
import mobileBackground from '../assets/mobileBackground.jpg';

const useStyles=makeStyles(theme=>({
    background:{
        background:`url(${background})`,
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        height:"60em",
        paddingBottom:'10em',
        [theme.breakpoints.down('md')]:{
             background:`url(${mobileBackground})`
        }
    },
    estimateButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:80,
        width:205,
        backgroundColor:theme.palette.common.orange,
        fontSize:"1.5rem",
        marginRight:"5em",
        marginLeft:"5em",
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down("md")]:{
            marginLeft:0,
            marginRight:0
        }
    },
    learnButton:{
        ...theme.typography.learnButton,
        fontSize:"0.7rem",
        height:35,
        padding:5,
        [theme.breakpoints.down("md")]:{
            marginBottom:"2em"
        }
    },
    message:{
        border:`2px solid ${theme.palette.common.blue}`,
        marginTop:'5em',
        borderRadius:5
    },
    sendButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:45,
        width:245,
        fontSize:'1rem',
        backgroundColor:theme.palette.common.orange,
        '&:hover':{
            backgroundColor:theme.palette.common.light
        },
        [theme.breakpoints.down("sm")]:{
            height:40,
            width:225
        }
    }
}))


export default function Contact(props) {
    const classes=useStyles();
    const theme=useTheme();
    const matchesSM=useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD=useMediaQuery(theme.breakpoints.down("md"));
    const matchesXS=useMediaQuery(theme.breakpoints.down("xs"));

    const [name,setName]=useState('');

    const [email,setEmail]=useState('');
    const [emailHelper,setEmailHelper]=useState('');

    const [phone,setPhone]=useState('');
    const [phoneHelper,setPhoneHelper]=useState('');

    const [message,setMessage]=useState('');

    const [open,setOpen]=useState(false);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");
    
    const onChange=event=>{
        let isValid;

        switch(event.target.id){
            case 'email':
                setEmail(event.target.value);
                isValid=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
                if(!isValid){
                    setEmailHelper('Invalid Email');
                }else{
                    setEmailHelper('');
                }
                break;
            case 'phone':
                setPhone(event.target.value);
                isValid=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(event.target.value);
                if(!isValid){
                    setPhoneHelper('Invalid Phone');
                }else{
                    setPhoneHelper('');
                }
                break;
            default:
                break;
        }
    }
    
    const onConfirm=()=>{
        setLoading(true);
        //replace url with email api
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res=>{
                setLoading(false);  
                setOpen(false);
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setAlert({ open: true, color: "#4BB543" });
                setAlertMesssage("Message sent successfully!");
            }).catch(err=>{
                setLoading(false);
                setAlert({ open: true, color: "#FF3232" });
                setAlertMesssage("Something went wrong! Please try again.");
                console.error(err);
            })
            
    }

    const buttonContent=(
        <React.Fragment>
               Send Message
               <img src={airplane} alt='paper airplane' style={{marginLeft:'1em'}}/>               
        </React.Fragment>
    )

    return (
        <Grid container direction='row'>
            <Grid item container 
                direction='column' 
                justify='center' 
                alignItems='center' 
                lg={4} xl={4}
                style={{marginBottom:matchesMD?'5em':0,marginTop:matchesSM?'1em':matchesMD?'5em':0,}}>
                <Grid item>
                    <Grid container direction='column'>
                            <Grid item>
                            <Typography variant='h2'  
                                    style={{lineHeight:1}}
                                    align={matchesMD?'center':undefined}>
                                Contact US
                            </Typography>
                            <Typography variant='body1' 
                                style={{color:theme.palette.common.blue}}
                                align={matchesMD?'center':undefined}>
                                We're waiting.
                            </Typography>
                        </Grid>
                        <Grid item container style={{marginTop:'2em'}}>
                            <Grid item>
                                <img src={phoneIcon} alt='phone' style={{marginRight:'0.5em'}}/>
                            </Grid>
                            <Grid item>
                            <Typography variant='body1' 
                                style={{color:theme.palette.common.blue,fontSize:'1rem'}}>
                                <a href='tel:1234567891' style={{textDecoration:'none',color:'inherit'}}>(123) 456-7891</a>
                            </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container  style={{marginBottom:'2em'}}>
                            <Grid item>
                                <img src={emailIcon} alt='envelope' style={{marginRight:'0.5em',verticalAlign:'bottom'}}/>
                            </Grid>
                            <Grid item>
                            <Typography variant='body1' style={{color:theme.palette.common.blue,fontSize:'1rem'}}>
                               <a href='mailto:abcd@example.com'  style={{textDecoration:'none',color:'inherit'}}>abcd@example.com</a>
                            </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction='column' style={{maxWidth:'20em'}}>
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Name' id='name' fullWidth value={name} onChange={e=>setName(e.target.value)}/>
                            </Grid>
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Email' id='email' 
                                        fullWidth 
                                        value={email} 
                                        onChange={onChange}
                                        error={emailHelper.length!==0}
                                        helperText={emailHelper}/>
                            </Grid>
                            <Grid item style={{marginBottom:'0.5em'}}>
                                <TextField label='Phone' id='phone' 
                                        fullWidth 
                                        value={phone} 
                                        onChange={onChange}
                                        error={phoneHelper.length!==0}
                                        helperText={phoneHelper}/>
                            </Grid>
                        </Grid>
                        <Grid item style={{maxWidth:'20em'}}>
                            <TextField value={message} 
                                multiline
                                fullWidth
                                rows={10}
                                id='message' 
                                onChange={e=>setMessage(e.target.value)}
                                className={classes.message}
                                InputProps={{disableUnderline:true}}/>
                        </Grid>
                        <Grid item container justify='center'  style={{marginTop:'2em'}}>
                            <Button variant='contained' 
                                className={classes.sendButton}
                                disabled={name.length===0||email.length===0||phone.length===0||message.length===0||emailHelper.length!==0||phoneHelper.length!==0}
                                onClick={()=>setOpen(true)}
                                >
                                {buttonContent}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
           </Grid>
            <Dialog open={open} 
                onClose={()=>setOpen(false)} 
                style={{zIndex:1302}}
                fullScreen={matchesXS}
                PaperProps={{style:{padding:`${matchesXS?'1em':'3em'} ${matchesXS?0:matchesSM?'3em':matchesMD?'7em':'15em'}`}}}>
                <DialogContent>
                <Grid container direction='column'>
                    <Grid item>
                        <Typography variant='h4' align='center' gutterBottom>Confirm Message</Typography>
                    </Grid>
                    
                    <Grid item style={{marginBottom:'0.5em'}}>
                        <TextField label='Name' id='name' fullWidth value={name} onChange={e=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item style={{marginBottom:'0.5em'}}>
                        <TextField label='Email' id='email' 
                                fullWidth 
                                value={email} 
                                onChange={onChange}
                                error={emailHelper.length!==0}
                                helperText={emailHelper}/>
                    </Grid>
                    <Grid item style={{marginBottom:'0.5em'}}>
                        <TextField label='Phone' id='phone' 
                                fullWidth 
                                value={phone} 
                                onChange={onChange}
                                error={phoneHelper.length!==0}
                                helperText={phoneHelper}/>
                    </Grid>
                    <Grid item style={{maxWidth:matchesXS?'100%':'20em'}}>
                        <TextField value={message} 
                            multiline
                            fullWidth
                            rows={10}
                            id='message' 
                            onChange={e=>setMessage(e.target.value)}
                            className={classes.message}
                            InputProps={{disableUnderline:true}}/>
                    </Grid>
                    <Grid item container 
                        style={{marginTop:'2em'}}
                        alignItems='center'
                        direction={matchesSM?'column':'row'}
                            >
                        <Grid item>
                            <Button color='primary' 
                            onClick={()=>setOpen(false)}
                            style={{fontWeight:300}}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' 
                                className={classes.sendButton}
                                disabled={name.length===0||email.length===0||phone.length===0||message.length===0||emailHelper.length!==0||phoneHelper.length!==0}
                                onClick={onConfirm}
                                >
                                {loading?<CircularProgress size={30}/>:buttonContent}

                             </Button>
                        </Grid>
                    </Grid>
                </Grid>
                </DialogContent>
            </Dialog>
            <Snackbar open={alert.open} 
                message={alertMessage} 
                ContentProps={{style:{backgroundColor:alert.color}}}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
                onClose={()=>setAlert({...alert,open:false})}
                autoHideDuration={4000}
                />



            <Grid item container 
                className={classes.background} 
                lg={8} xl={9} 
                alignItems='center'
                direction={matchesMD?'column':'row'}
                justify={matchesMD?'center':undefined}>
                <Grid item 
                    style={{marginLeft:matchesMD?0:"3em",textAlign:matchesMD?"center":"inherit"}}>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h2" align={matchesMD?'center':undefined}>Simple Software.<br/>Revolutionary Results.</Typography>
                            <Typography variant="subtitle2" style={{fontSize:"1.5rem"}}>Take advantage of the 21st century.</Typography>
                            <Grid container item justify={matchesSM?"center":undefined}>
                                <Button variant="outlined" 
                                    className={classes.learnButton}
                                    component={Link}
                                    to='/revolution'
                                    onClick={()=>props.setValue(2)}>
                                    <span style={{marginRight:5}}>Learn More</span>     
                                    <ArrowForwardIcon style={{width:"0.7em",height:"0.7em",color:theme.palette.common.blue}}/> 
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant="contained" 
                    className={classes.estimateButton}
                    component={Link}
                    to='/estimate'
                    onClick={()=>props.setValue(5)}
                    >Free Estimate</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
