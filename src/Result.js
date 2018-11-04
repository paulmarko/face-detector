import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { CardHeader } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import HighlightOff from '@material-ui/icons/HighlightOff';
import DoneIcon from '@material-ui/icons/Done';
import TagFaces from '@material-ui/icons/TagFaces';
import DisFace from '@material-ui/icons/SentimentDissatisfied';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root1: {
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
  root2: {
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
  card1: {
    width:'40%',
    order: '1',
	  flexGrow: '1',
  },
  card2: {
    width:'40%',
    order: '2',
    flexGrow: '1',
  },
  card3: {
    width:'40%',
    order: '3',
    flexGrow: '1',
  },
  primaryAvatar: {
    color: '#fff',
    backgroundColor: '#3f51b5'
  },
  secondaryAvatar: {
    color: '#fff',
    backgroundColor: '#f50057'
  },
  notDetected:{
    color:'#666666',
  },
  notDetectedDiv: {
    padding:'20px',
    margin:'15px',
    textAlign:'center',
  },
  avatar: {
    backgroundColor: red[500],
    margin: 10,
  },



  card: {
    maxWidth: '100%', 
    height: 'auto',
    justifyContent:'center',
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 300,
    backgroundPosition: 'center top'
  },
  avrow: {
    display: 'flex',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 200,
    height: 200,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class Result extends Component {
  render(){
    const { classes, imageAnalyzeResult, imageMainSource } = this.props;
    const rows = imageAnalyzeResult.map((row, index) => {
        return (
        <div key={index}>
          <div className={classes.root1}>
                <Chip
                  avatar={<Avatar size="large" alt="Male" src={imageMainSource} />}
                  label={row.faceAttributes.gender + " - " + row.faceAttributes.age + " y/o"}
                  className={classes.chip}
                  color={row.faceAttributes.gender === 'male' ? 'primary' : 'secondary'}
                />
                <Chip
                  avatar={
                    <Avatar>
                      {(row.faceAttributes.smile * 100).toFixed(1) > 50 ? <TagFaces /> : <DisFace />}
                    </Avatar>
                  }
                  label={"Smile " + (row.faceAttributes.smile * 100).toFixed(1) + "%"}
                  className={classes.chip}
                />
                <Chip 
                  label={"Makeup"}
                  icon={(row.faceAttributes.makeup.eyeMakeup === true || row.faceAttributes.makeup.lipMakeup === true) ? <DoneIcon /> : <HighlightOff/>}
                  className={classes.chip}
                />

                <Chip 
                  label="Glasses"
                  icon={(row.faceAttributes.glasses === "NoGlasses") ? <HighlightOff/> : <DoneIcon />}
                  className={classes.chip}
                />

                
          </div>
          <div  className={classes.root2}>
            <Card className={classes.card1}>
              <CardHeader
                avatar={
                  <Avatar aria-label="" className={row.faceAttributes.gender === 'male' ? classes.primaryAvatar : classes.secondaryAvatar}>
                    HH
                  </Avatar>
                }
                title="Hair"
                subheader="head"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={16}>
                  <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                      <List dense={true}>
                          <ListItem>
                              <ListItemText
                                primary="Beard"
                                secondary={(row.faceAttributes.facialHair.beard * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Moustache"
                                secondary={(row.faceAttributes.facialHair.moustache * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="SideBurns"
                                secondary={(row.faceAttributes.facialHair.sideburns * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Bald"
                                secondary={(row.faceAttributes.hair.bald * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.card2}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={row.faceAttributes.gender === 'male' ? classes.primaryAvatar : classes.secondaryAvatar}>
                    BE
                  </Avatar>
                }
                title="Bad"
                subheader="emotion"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={16}>
                  <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                      <List dense={true}>
                          <ListItem>
                              <ListItemText
                                primary="Anger"
                                secondary={(row.faceAttributes.emotion.anger * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Contempt"
                                secondary={(row.faceAttributes.emotion.contempt * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Disgust"
                                secondary={(row.faceAttributes.emotion.disgust * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Fear"
                                secondary={(row.faceAttributes.emotion.fear * 100).toFixed(1) + "%"}
                            />
                          </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.card3}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={row.faceAttributes.gender === 'male' ? classes.primaryAvatar : classes.secondaryAvatar}>
                    GE
                  </Avatar>
                }
                title="Good"
                subheader="emotion"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={16}>
                  <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                      <List dense={true}>
                          <ListItem>
                              <ListItemText
                                primary="Happiness"
                                secondary={(row.faceAttributes.emotion.happiness * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Neutral"
                                secondary={(row.faceAttributes.emotion.neutral * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Sadness"
                                secondary={(row.faceAttributes.emotion.sadness * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                                primary="Surprise"
                                secondary={(row.faceAttributes.emotion.surprise * 100).toFixed(1) + "%"}
                              />
                          </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
        );
    });

    return (
      <div>
      {Object.keys(rows).length > 0 ? (
        <div>{rows}</div>
      ) : (
        <div className={classes.notDetectedDiv}>
          <h3 className={classes.notDetected}>No facial features detected!</h3>
          <p className={classes.notDetected}>Click on a different image</p>
        </div>
      )}
      </div>
    );

  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Result);