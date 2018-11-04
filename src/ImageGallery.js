import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Slider from "react-slick";
import Carousel from 'nuka-carousel';


class ImageGallery extends Component {
    constructor(props){
      super(props);
    }
    
    render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
      const {galleryImagesJSON, removeImage, handleGalleryImageClick} = this.props;
      //const rowLength = galleryImagesJSON.length;
      const rows = galleryImagesJSON.map((row, index) => {
        return (
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
        );
      });
      //return <Slider {...settings}>{rows}</Slider>;
      // slideIndex={rowLength-1}
      return <Carousel  renderBottomCenterControls={null} cellSpacing={20} slidesToScroll={4} slidesToShow={4}>{rows}</Carousel>
    }
  }

export default ImageGallery;