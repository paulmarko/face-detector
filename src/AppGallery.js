import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  imgSelected: {
    borderBottom:'6px dashed #999'
  },
  imgCursor: {
    cursor: 'pointer',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBarSelected: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(245,245,245,0.7) 0%, rgba(204,204,204,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


class AppGallery extends React.Component {

  render() {
    const { classes, galleryImagesJSON, handleGalleryImageClick, removeImage, imageMainSource  } = this.props;
    
    return (
      <div className={classes.root} >
        <GridList className={classes.gridList} cols={2.5}>
          {galleryImagesJSON.map(row => ( 
            <GridListTile 
              key={row.id} 
              className={imageMainSource === row.full_path ? classes.imgSelected : ""}>
              <img 
                className={classNames(classes.imgCursor)} 
                src={row.full_path} 
                onClick={handleGalleryImageClick}  
                id={row.id} 
                alt="" />
              <GridListTileBar
                title=""
                classes={{
                  root: (imageMainSource === row.full_path ? classes.titleBarSelected : classes.titleBar),
                  title: classes.title,
                }}
                actionIcon={
                  (row.delete === 1 &&
                  <IconButton onClick={() => removeImage(row.id)} color="secondary" className={classes.button} aria-label="Delete">
                      <DeleteIcon />
                  </IconButton>
                  )
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

AppGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppGallery);