import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ImageUploader from './ImageUploader';

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  root: {
    minWidth: 275,
    maxWidth: '100%', 
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    /*flex-flow: shorthand for flex-direction, flex-wrap */
    justifyContent: 'space-evenly',
    alignItems:'flex-start',
    alignContent:'flex-start',
  },
  details1: {
    width:'40%',
    order: '1',
	  flexGrow: '1',
  },
  details2: {
    width:'40%',
    order: '2',
    flexGrow: '1',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

function AppHeaderSub(props) {
  const { classes, onFileChooserChange } = props;

  return (
        <Card className={classes.root}>
          <CardContent className={classes.details1}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Click an image below to process
            </Typography>
          </CardContent>
          <CardContent className={classes.details2}>
              <ImageUploader
                  onFileChooserChange={onFileChooserChange}>
              </ImageUploader>
          </CardContent>
        </Card>
  );
}

AppHeaderSub.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeaderSub);