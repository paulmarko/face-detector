import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float:'right',
  },
});

function ImageUploader(props) {
  const { classes, onFileChooserChange } = props;

  return (
  <div>
      <Button size="small" variant="outlined" color="primary" className={classes.button}>
      <label htmlFor="upload">Add your own images</label>
      </Button>
      <input type="file" onChange={onFileChooserChange} id="upload" style={{display:'none'}} />
  </div>
  );
}

ImageUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageUploader);

