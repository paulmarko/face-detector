import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import tileData from './tileData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImageGridList(props) {
  const { classes } = props;
  const {galleryImagesJSON, removeImage, handleGalleryImageClick} = props;

  const rows = galleryImagesJSON.map((row, index) => {
    return (
    <GridListTile key={row.id} cols={ 1}>
        <div key={index} className="gallery-thumb-container fadein">
            {row.delete === 1 ? (
            <div onClick={() => removeImage(row.id)} className='delete'>
            <FontAwesomeIcon icon={faTimesCircle} size='1x' color="red" />
            </div>
            ) : (
            <div className='delete-none'>
            <FontAwesomeIcon icon={faCircle} size='1x' color="green" />
            </div>
            )}
            <img className="gallery-thumb" onClick={handleGalleryImageClick}  id={row.id} src={row.full_path} />
        </div>
      </GridListTile>
    );
  });
  //return <Slider {...settings}>{rows}</Slider>;
  // slideIndex={rowLength-1}
  return (
    <div className={classes.root}>
    <GridList cellHeight={160} className={classes.gridList} cols={3}>
    {rows}
    </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageGridList);