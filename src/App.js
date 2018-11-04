import React, { Component } from 'react';
import './App.css';
import axios from 'axios'; // import axios, { post } from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from './AppHeader';
import AppHeaderSub from './AppHeaderSub';
import AppGallery from './AppGallery';
import SnackbarMsg from './SnackbarMsg';
import Result from './Result';
import ProgressBar from './ProgressBar';


const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  gridinner: {
    maxWidth:600,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

class FaceDetector extends Component {
    constructor(props){
      super(props);
      this.state ={
        gallery_images_json : [],
        file:null,
        uploading: false,
        image_main_source: '',
        image_analyze_result : [],
        sb_msg : '',
        sb_msg_type : '',
        sb_msg_state : false,
        sb_msg_timer: 5000,
        progress_bar_state: false,
      }
      this.onFileChooserChange = this.onFileChooserChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
      this.handleGalleryImageClick = this.handleGalleryImageClick.bind(this);
    }
    componentDidMount(){
      this.refreshGallery();
    }
    refreshGallery() {
      this.setState({
        progress_bar_state: true,
      });

      let self = this;
      // process.env.REACT_APP_REFRESH_GALLERY
      let url = process.env.REACT_APP_REFRESH_GALLERY;
      axios.get(url)
        .then(function (response) {
          //let responseOK = response && response.status === 200 && response.statusText === 'OK';
          // handle success
          if (response.data.data.length < 1) {
            self.setState({
              progress_bar_state: false,
              image_main_source: ''
            });
          } else {
            let src = response.data.data[0].full_path; 
            // must do callback because src isn't set unless
            self.setState(
              {
                image_main_source: src,
                gallery_images_json: response.data.data,
              }, () => {
              self.analyzeImage(false,true);
            });
          }
        })
        .catch(error => self.setState({ error }));
    }
    setResetMessage(msg,timer=5000,msgType="success") {
      this.setState({
        sb_msg_state : true,
        sb_msg_type : msgType,
        sb_msg : msg,
        sb_msg_timer: timer,
      });
      setTimeout( () => {
        this.setState({
          sb_msg_state : false,
          sb_msg_type : msgType,
          sb_msg : '',
          sb_msg_timer: 0,
        });
      }, timer);
    }
    onFileChooserChange(e) {
      let theFile = e.target.files[0];
      // #1 Catching wrong file types on the client
      const types = ['image/png', 'image/jpeg', 'image/gif']
      if (types.every(type => theFile.type !== type)) {
        this.setResetMessage('File must be an image (.png,.jpg,.gif)!',4000, 'error')
        return
      }
      
      // #2 Catching files that are too large on the client
      // 500000 = 500kb / 5000000 = 5000kb, 5mb
      let maxFileSizeMb = 1000000;
      let maxFileSizeMbText = maxFileSizeMb / 1000000;
      if (theFile.size > maxFileSizeMb) {
        //errs.push(`'${file.name}' is too large, please pick a smaller file`)
        this.setResetMessage('The image uploaded was too large, it must be less than ' + maxFileSizeMbText + ' MB.',4000, 'error')
        return
      }
      // put in callback to ensure state set
      this.setState({
        file:theFile,
      }, () => {
        this.fileProcess();
      });
    }
    fileProcess(e) {
      let self = this;
      if(this.state.file !== null || this.state.file !== undefined){
          // turn on here, off in analyzeImage
          this.setState({
            progress_bar_state: true,
          });

          this.fileUpload(this.state.file).then((response)=>{
            this.setState(
              {
                file:null,
                uploading: false,
                gallery_images_json : [response.data.data, ...this.state.gallery_images_json],
                image_main_source : response.data.data.full_path
              }, () => {

                let tempTimer = 1500;
                self.setResetMessage('Image added!',tempTimer, 'success');
                setTimeout( () => {
                  self.analyzeImage(false,true);
                }, tempTimer);

            });
          });

      } else {
        this.setState({
          progress_bar_state: false,
        });
        this.setResetMessage('No image was selected, click "Add Your Own Images".',200, 'warning')
        return
      }
    }
    fileUpload(file){
      this.setState({ uploading: true })
      // process.env.REACT_APP_IMAGE_UPLOAD
      const url = process.env.REACT_APP_IMAGE_UPLOAD;
      const formData = new FormData();
      // input field name:file_img_faces
      formData.append('file_img_faces',file);
  
      const config = {
          headers: {
              'Access-Control-Allow-Origin': '*',
              //'content-type': 'multipart/form-data',
              'content-type': 'application/x-www-form-urlencoded'
          }
      }
      
      //let self = this;
      return axios.post(url, formData,config);
        /*
        .then(function (response) {

        })
        .catch(error => self.setState({ error }));
  
        return response;
        */
    }
    removeImage = id => {
      this.setState({
        progress_bar_state: true,
      });

      let self = this;
      // send to server for deletion
      // process.env.REACT_APP_REMOVE_IMAGE
      const url = process.env.REACT_APP_REMOVE_IMAGE + id;
      const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            //'content-type': 'multipart/form-data',
            'content-type': 'application/x-www-form-urlencoded'
        }
      }

      axios.delete(url,config)
      .then(function (response) {
        //let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (response.data.data.length < 1) {
          // didn't work, provide message here
          self.setResetMessage('Image was not removed, please try again!',2000, 'error');
        } else {
          if (response.data.data[0].msg === 'deleted') {
            // delete item from json
            let cleanedImages = self.state.gallery_images_json.filter(image => image.id !== id);
            let newImgSrc = cleanedImages[0].full_path;

            self.setState(
              {
                gallery_images_json: cleanedImages,
                image_main_source : newImgSrc
              }, () => {
              let tempTimer = 1500;
              self.setResetMessage('Image removed!',tempTimer, 'success');
              setTimeout( () => {
                self.analyzeImage(false,true);
              }, tempTimer);
            });
          }
        }
        this.setState({
          progress_bar_state: false,
        });
      })
      .catch(error => self.setState({ error }));

    }
    handleGalleryImageClick(event) {
      // get id and use it in main image
      let idClicked = event.target.id; 
      let galleryImagesJSON = this.state.gallery_images_json;
 
      let rowImage = galleryImagesJSON.filter(function(row) {
          if (row.id == idClicked) {
            return row;
          }
      });
      // callback to ensure set
      this.setState(
        {
          image_main_source : rowImage[0].full_path,
          progress_bar_state: true,
        }, () => {
        this.analyzeImage(false,true);
      });

    }
    analyzeImage(progressBarOn=true, progressBarOff=true) {
      if(progressBarOn) {
        this.setState({
          progress_bar_state: true,
        });
      }

      // Replace <Subscription Key> with your valid subscription key.
      // process.env.REACT_APP_SUBSCRIPTION_KEY
      let subscriptionKey = process.env.REACT_APP_SUBSCRIPTION_KEY;

      // NOTE: You must use the same region in your REST call as you used to
      // obtain your subscription keys. For example, if you obtained your
      // subscription keys from westus, replace "westcentralus" in the URL
      // below with "westus".
      //
      // Free trial subscription keys are generated in the westcentralus region.
      // If you use a free trial subscription key, you shouldn't need to change 
      // this region.
      let url ="https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect";

      // Request parameters.
      let params = {
          "returnFaceId": "true",
          "returnFaceLandmarks": "false",
          "returnFaceAttributes":
              "age,gender,headPose,smile,facialHair,glasses,emotion," +
              "hair,makeup,occlusion,accessories,blur,exposure,noise"
      };

      // Display the image.
      let sourceImageUrl = this.state.image_main_source;

      // Perform the REST API call
      let formData =  {
        'url': sourceImageUrl
      };
  
      const config = {
          headers: {
              //'Access-Control-Allow-Origin': '*',
              //'content-type': 'application/x-www-form-urlencoded',
              "Content-Type":"application/json",
              "Ocp-Apim-Subscription-Key": subscriptionKey
          },
          params : params
      }
      
      let self = this;
      axios.post(url, formData,config)
      .then(function (response) {
        //let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (response.statusText === "OK") { 
            if (response.data[0] !== undefined) {
              self.setState({
                image_analyze_result : response.data
              });
              if(progressBarOff) {
                self.setState({
                  progress_bar_state: false,
                });
              }
              // to much with this alert
              //self.setResetMessage('Image processed!', 900, 'success')
            } else {
              self.setState({
                  image_analyze_result : []
              });
              if(progressBarOff) {
                self.setState({
                  progress_bar_state: false,
                });
              }
              //self.setResetMessage('No facial image detected!', 1500, 'warning')
            }
        } else { 
            if(progressBarOff) {
              self.setState({
                progress_bar_state: false,
              });
            }
            self.setResetMessage('Image was not processed!',1500, 'error')
        }
      })
      .catch(error => self.setState({ error })); 
        
    }
    render() {
      
      const { classes } = this.props;
      return(
        <div className={classes.root} style={{'border':"0px solid blue"}}>
          
          <Grid container spacing={24} justify="center" style={{'border':"0px solid red"}}>
            <Grid container justify="center" className={classes.gridinner} style={{'border':"0px solid orange"}}>
              <Grid item xs={12} zeroMinWidth>
                <Paper>
                    <AppHeader appTitle="Facial Characteristics Detector"></AppHeader>
                    
                    <ProgressBar progressBarState={this.state.progress_bar_state} />
 
                    <AppHeaderSub
                      onFileChooserChange={this.onFileChooserChange}>
                    </AppHeaderSub>
   
                    <AppGallery 
                      imageMainSource={this.state.image_main_source}
                      galleryImagesJSON={this.state.gallery_images_json}
                      removeImage={this.removeImage}
                      handleGalleryImageClick={this.handleGalleryImageClick}
                    >
                    </AppGallery>
                </Paper>
              </Grid>
              <Grid item xs={12} zeroMinWidth>
                <Paper>
                  <Result
                    imageMainSource={this.state.image_main_source}
                    imageAnalyzeResult={this.state.image_analyze_result}
                  >
                  </Result>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <SnackbarMsg
            successMsgState={this.state.sb_msg_state}
            successMsgType={this.state.sb_msg_type}
            successMsg={this.state.sb_msg}  
            successMsgTimer={this.state.sb_msg_timer}
          ></SnackbarMsg>
        </div>
      );
    }
  }

export default withStyles(styles)(FaceDetector);