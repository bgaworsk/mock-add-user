import React from 'react'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: theme.spacing(2, 0),
    maxHeight: '120px',
    overflowY: 'scroll',
    border: 'solid 1px #d2d2d2',
    borderRadius: '4px',

    '&.empty': {
      padding: theme.spacing(1.7),
      display: 'grid',
      justifyContent: 'center',
      color: '#868686'
    }
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  form: {
    '& > *': {
      padding: theme.spacing(0, 2)
    },
  },
  text: {
    textAlign: 'left',
    padding: theme.spacing(0, 2),
    '& + .MuiPaper-root': {
      marginTop: theme.spacing(2)
    }
  },
  buttons: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 0),
    '& button + button': {
      marginLeft: theme.spacing(0.5)
    }
  },
  'paper': {
    padding: theme.spacing(2)
  },
  'title': {
    padding: theme.spacing(0, 2),
    textAlign: 'center'
  }
}));

const AddUser = () => {

  const classes = useStyles();

  const [chipData, setChipData] = React.useState([]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const [newPill, setNewPill] = React.useState('');
  const handleChange = (event) => {
    setNewPill(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newKey = chipData.length > 0 ? chipData[chipData.length - 1].key + 1 : 0;
    setChipData([...chipData, {key: newKey, label: newPill}]);
    setNewPill('');
  }

  const scrollContainer = React.useRef();
  React.useEffect(() => {
    if (!scrollContainer.current) return;
    // Make sure, container is scrolled to bottom
    scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
  }, [chipData]);

  const [checked, setChecked] = React.useState(true);
  const handleCheckedChange = (event) => setChecked(event.target.checked);

  const Form = () => (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" placeholder="Enter a name or a group name" value={newPill}
                 onChange={handleChange} autoFocus={true} fullWidth={true}
                 InputProps={{
                   startAdornment: <SearchIcon/>,
                 }}/>
    </form>
  )

  return (
    <>
      <div>
        <FormControlLabel
          control={<Switch
            checked={checked}
            onChange={handleCheckedChange}
          />}
          label="Bottom"
        />
      </div>
      <Paper className={classes.paper}>
        <h1 className={classes.title}>For review</h1>
        <div className={classes.text}>
          This workflow will be assigned automatically to all eligible people, or just offer
          the workflow to selected users and groups.
        </div>
        {!checked && <Paper elevation={0}><Form/></Paper>}
        {chipData.length > 0 && (
          <ul className={classes.root} ref={scrollContainer}>
            {chipData.map((data) => {
              let icon;

              if (data.label === 'React') {
                icon = <FaceIcon/>;
              }

              return (
                <span key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
              className={classes.chip}
            />
          </span>
              );
            })}
          </ul>
        )}
        {chipData.length === 0 && (
          <div className={clsx(classes.root, 'empty')}>
            Offered to all eligible people
          </div>
        )}
        {checked && <Paper elevation={0}><Form/></Paper>}
        <div className={classes.buttons}>
          <Button variant="contained" color="default">
            Abbrechen
          </Button>
          <Button variant="contained" color="primary">
            Anwenden
          </Button>
        </div>
      </Paper>
    </>
  )
}

export default AddUser;