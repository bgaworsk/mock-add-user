import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddUser from "./add-user";
import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '24px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline/>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <AddUser />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}

export default App;
