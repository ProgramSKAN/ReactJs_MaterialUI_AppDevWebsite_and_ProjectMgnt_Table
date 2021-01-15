import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles,useTheme} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment'
import AddIcon from '@material-ui/icons/Add'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {format} from 'date-fns';
import EnhancedTable from './ui/EnhancedTable';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles=makeStyles(theme=>({
    service:{
        fontWeight:300
    },
    users:{
        marginRight:0
    },
    button:{
        color:'#fff',
        backgroundColor:theme.palette.common.orange,
        borderRadius:50,
        textTransform:'none',
        '&:hover':{
            backgroundColor:theme.palette.secondary.light
        }
    }
}));


function CreateData(name,date,service,features,complexity,platforms,users,total,search){
    return {name,date,service,features,complexity,platforms,users,total,search};
}

export default function LandingPage() {
  const classes=useStyles();
  const theme=useTheme();
  const [rows,setRows]=useState([
        CreateData('Jack','1/1/2021','website','E-Commerce','high','Android','10-100','$15000',true),
        CreateData('Jack1','1/1/2021','Mobile App','E-Commerce','medium','Web Application','100+','$15000',true),
        CreateData('Jack2','1/1/2021','Custom Software','E-Commerce','low','iOS,Android','10-100','$15000',true),
        CreateData('Jack3','1/1/2021','website','E-Commerce','high','N/A','N/A','$15000',true),
        CreateData('Jack4','1/1/2021','Mobile App','E-Commerce','N/A','N/A','N/A','$15000',true),
        CreateData('Jack5','1/1/2021','Mobile App','E-Commerce','N/A','N/A','N/A','$15000',true),
        CreateData('Jack6','1/1/2021','website','E-Commerce','N/A','N/A','N/A','$15000',true),
        CreateData('Jack7','1/1/2021','Mobile App','E-Commerce','N/A','N/A','N/A','$15000',true),
        CreateData('Jack8','1/1/2021','website','E-Commerce','N/A','N/A','N/A','$15000',true),
        CreateData('Mike','1/5/2021','Custom Software','GPS,Push Notofocation,User Authentication,File Transfer','medium','web application','0-100','$16000',true)
    ]);
const platformOptions=['Web','iOS','Android'];
let featureOptions=['Photo/Video','GPS','Biometrics','Push Notifications','File Transfer','Users/Authentication'];
let websiteOptions=['Basic','Interactive','E-Commerce']

  const [websiteChecked,setWebsiteChecked]=useState(false);
  const [iOSChecked,setiOSChecked]=useState(false);
  const [androidChecked,setAndroidChecked]=useState(false);
  const [softwareChecked,setSoftwareChecked]=useState(false);

  const [dialogOpen,setDialogOpen]=useState(false);
  const [name,setName]=useState('');
  const [date,setDate]=useState(new Date());
  const [total,setTotal]=useState('');
  const [service,setService]=useState('');
  const [complexity,setComplexity]=useState('');
  const [users,setUsers]=useState('');
  const [platforms,setPlatforms]=useState([]);
  const [features,setFeatures]=useState([]);
  const [search,setSearch]=useState('');

  const [page, setPage] = React.useState(0);
  const matchesMD=useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM=useMediaQuery(theme.breakpoints.down('sm'));


  const addProject=()=>{
    setRows([...rows,CreateData(
        name,
        format(date,"MM/dd/yyyy"),
        service,
        features.join(', '),
        service==='Website'?'N/A':complexity,
        service==='Website'?'N/A':platforms.join(', '),
        service==='Website'?'N/A':users,
        `$${total}`,true)]);
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setTotal('');
    setService('');
    setComplexity('');
    setUsers('');
    setPlatforms([]);
    setFeatures([]);
  }

  const handleSearch=(event)=>{
    setSearch(event.target.value);
    const rowData=rows.map(row=>Object.values(row)
                            .filter(option=>option!==true&&option!==false));
    const matches=rowData.map(row=>row.map(option=>option.toLowerCase().includes(event.target.value.toLowerCase())));
    const newRows=[...rows];
    matches.map((row,index)=>row.includes(true)?newRows[index].search=true:newRows[index].search=false);

    setRows(newRows);
    setPage(0);
  }

  return(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container direction='column' alignItems={matchesSM?'center':undefined}>
        <Grid item style={{marginTop:'2em',marginLeft:matchesSM?0:'5em'}}>
            <Typography variant='h1'>Projects</Typography>
        </Grid>
        <Grid item>
            <TextField style={{width:matchesSM?'25em':'35em',marginLeft:matchesSM?0:'5em'}}
                InputProps={{endAdornment:
                <InputAdornment position='end' 
                    onClick={()=>setDialogOpen(true)}
                    style={{cursor:'pointer'}}>
                    <AddIcon color='primary' style={{fontSize:30}}/>
                </InputAdornment>}}
                placeholder='Search Project details or Create a new entry.'
                value={search}
                onChange={handleSearch}
                />
        </Grid>
        <Grid item style={{marginLeft:matchesSM?0:'5em',marginTop:'2em'}}>
            <FormGroup row>
                <Grid container direction={matchesSM?'column':'row'}
                                justify={matchesSM?'center':undefined}>
                    <Grid item>
                        <FormControlLabel label='Websites' 
                                  labelPlacement={matchesSM?'end':'start'}
                                  control={<Switch
                                  color='primary'
                                  onChange={()=>setWebsiteChecked(!websiteChecked)}/>}
                                  style={{marginRight:matchesSM?0:'5em'}}
                                  />
                    </Grid>
                    <Grid item>
                        <FormControlLabel label='iOS Apps' 
                                  labelPlacement={matchesSM?'end':'start'}
                                  control={<Switch
                                  color='primary'
                                  onChange={()=>setiOSChecked(!iOSChecked)}/>}
                                  style={{marginRight:matchesSM?0:'5em'}}
                                  />
                    </Grid>
                    <Grid item>
                        <FormControlLabel label='Andriod Apps' 
                                  labelPlacement={matchesSM?'end':'start'}
                                  control={<Switch
                                  color='primary'
                                  onChange={()=>setAndroidChecked(!androidChecked)}/>}
                                  style={{marginRight:matchesSM?0:'5em'}}
                                  />
                    </Grid>
                    <Grid item>
                        <FormControlLabel label='Custom Software' 
                                  labelPlacement={matchesSM?'end':'start'}
                                  control={<Switch
                                  color='primary'
                                  onChange={()=>setSoftwareChecked(!softwareChecked)}/>}
                                  />
                    </Grid>
                </Grid>
                
                
                
                
            </FormGroup>
        </Grid>
        {/* <Grid item container justify='flex-end' style={{marginTop:'5em'}}>
            <Grid item style={{marginRight:75}}>
                <FilterListIcon color='secondary' style={{fontSize:'50'}}/>
            </Grid>                        
        </Grid> */}
        <Grid inputMode style={{marginBottom:matchesMD?'40em':'35em',
                                marginTop:'5em',
                                maxWidth:'100%'}}>
            {/* <TableContainer component={Paper} elevation={0}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Service</TableCell>
                            <TableCell align='center'>Features</TableCell>
                            <TableCell align='center'>Complexity</TableCell>
                            <TableCell align='center'>Platforms</TableCell>
                            <TableCell align='center'>Users</TableCell>
                            <TableCell align='center'>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.filter(row=>row.search).map((row,index)=>(
                            <TableRow>
                                <TableCell align='center'>{row.name}</TableCell>
                                <TableCell align='center'>{row.date}</TableCell>
                                <TableCell align='center'>{row.service}</TableCell>
                                <TableCell align='center' style={{maxWidth:'5em'}}>{row.features}</TableCell>
                                <TableCell align='center'>{row.complexity}</TableCell>
                                <TableCell align='center'>{row.platforms}</TableCell>
                                <TableCell align='center'>{row.users}</TableCell>
                                <TableCell align='center'>{row.total}</TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

            <EnhancedTable rows={rows} 
                           setRows={setRows} 
                           page={page} 
                           setPage={setPage} 
                           websiteChecked={websiteChecked}
                           iOSChecked={iOSChecked}
                           androidChecked={androidChecked}
                           softwareChecked={softwareChecked}
                           />
        </Grid>
        <Dialog fullWidth 
            maxWidth='md' 
            open={dialogOpen} 
            onClose={()=>setDialogOpen(false)}
            fullScreen={matchesSM}
            style={{zIndex:1302}}>
            <Grid container justify='center'>
                <Grid item>
                    <Typography variant='h1' gutterBottom>Add New Project</Typography>
                </Grid>
            </Grid>
            <DialogContent>
                <Grid container justify='space-between' direction={matchesSM?'column':'row'}>
                    <Grid item>
                        <Grid item container direction='column' sm alignItems={matchesSM?'center':undefined}>
                            <Grid item>
                                <TextField fullWidth={!matchesSM} 
                                    label='Name' id='name' 
                                    value={name} onChange={e=>setName(e.target.value)}
                                    style={{width:matchesSM?250:undefined}}/>
                            </Grid>
                            <Grid item container direction='column' style={{marginTop:'5em'}} alignItems={matchesSM?'center':undefined}>
                                <Grid item>
                                    <Typography variant='h4'>Service</Typography>
                                </Grid>
                                <Grid item>
                                    <RadioGroup aria-label='service' name='service' 
                                        value={service} 
                                        onChange={e=>{setService(e.target.value);setFeatures([])}}>
                                        <FormControlLabel value='Website' label='Website'control={<Radio/>} classes={{label:classes.service}}/>
                                        <FormControlLabel value='Mobile App' label='Mobile App'control={<Radio/>} classes={{label:classes.service}}/>
                                        <FormControlLabel value='Custom Software' label='Custom Software'control={<Radio/>} classes={{label:classes.service}}/>
                                    </RadioGroup>
                                </Grid>
                                <Grid item  style={{marginTop:'5em'}}>
                                    <Select labelId='platforms' id='platforms'
                                         disabled={service==='Website'}
                                        style={{width:matchesSM?250:'12em'}}
                                        multiple
                                        displayEmpty
                                        renderValue={platforms.length>0?undefined: ()=>'Platforms'}
                                        value={platforms} 
                                        onChange={e=>setPlatforms(e.target.value)}>
                                            {platformOptions.map(option=>
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>)}
                                        </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item>
                        <Grid item container direction='column' sm style={{marginTop:16}}  alignItems='center'>
                            <Grid item>
                                <KeyboardDatePicker format='MM/dd/yyyy' value={date} onChange={newDate=>setDate(newDate)} style={{width:matchesSM?250:undefined}}/>
                            </Grid>
                            <Grid item>
                                <Grid item container direction='column' style={{marginTop:'5em'}}>
                                    <Grid item>
                                        <Typography variant='h4'>Complexity</Typography>
                                    </Grid>
                                    <Grid item>
                                        <RadioGroup aria-label='complexity' name='complexity' value={complexity} onChange={e=>setComplexity(e.target.value)}>
                                            <FormControlLabel value='low' label='low'control={<Radio/>} classes={{label:classes.service}} disabled={service==='Website'}/>
                                            <FormControlLabel value='medium' label='medium'control={<Radio/>} classes={{label:classes.service}} disabled={service==='Website'}/>
                                            <FormControlLabel value='high' label='high'control={<Radio/>} classes={{label:classes.service}} disabled={service==='Website'}/>
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                            </Grid> 
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item container direction='column' sm alignItems={matchesSM?'center':undefined}>
                            <Grid item>
                                <TextField id='total' label='Total'
                                    InputProps={{startAdornment:<InputAdornment position='start'>$</InputAdornment>}}
                                    value={total} 
                                    onChange={e=>setTotal(e.target.value)}/>
                            </Grid>
                            <Grid item style={{alignSelf:matchesSM?'center':'flex-end'}}>
                                <Grid item container 
                                    direction='column' 
                                    style={{marginTop:'5em'}}>
                                    <Grid item>
                                        <Typography variant='h4'>Users</Typography>
                                    </Grid>
                                    <Grid item>
                                        <RadioGroup aria-label='users' name='users' value={users} onChange={e=>setUsers(e.target.value)}>
                                            <FormControlLabel value='0-10' label='0-10'control={<Radio/>} classes={{label:classes.service,root:classes.users}} disabled={service==='Website'}/>
                                            <FormControlLabel value='10-100' label='10-100'control={<Radio/>} classes={{label:classes.service,root:classes.users}} disabled={service==='Website'}/>
                                            <FormControlLabel value='100+' label='100+'control={<Radio/>} classes={{label:classes.service,root:classes.users}} disabled={service==='Website'}/>
                                        </RadioGroup>
                                    </Grid>
                                </Grid> 
                            </Grid>
                            <Grid item  style={{marginTop:'5em'}}>
                                <Select labelId='features' id='features'
                                    style={{width:'12em'}}
                                    MenuProps={{style:{zIndex:1302}}}
                                    multiple
                                    displayEmpty
                                    renderValue={features.length>0?undefined: ()=>'Features'}
                                    value={features} 
                                    onChange={e=>setFeatures(e.target.value)}>
                                        {service==='Website'?featureOptions=websiteOptions:null}
                                        {featureOptions.map(option=>
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>)}
                                    </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify='center' style={{marginTop:'3em'}}>
                    <Grid item>
                        <Button color='primary' style={{fontWeight:300}} onClick={()=>setDialogOpen(false)}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' 
                            className={classes.button} 
                            onClick={addProject}
                            disabled={service==='Website'?name.length===0||total.length===0||features.length===0||features.length>1:
                            name.length===0||total.length===0||features.length===0||users.length===0||complexity.length===0||platforms.length===0||service.length===0}>+ Add Project</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
  </Grid>
  </MuiPickersUtilsProvider>
  )
}
