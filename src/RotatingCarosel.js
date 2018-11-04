import React, { Component } from 'react';
import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import SwipeableViews from 'react-swipeable-views';


import {red400,red600} from '@material-ui/core/colors/red';
import {blue400, blue600} from '@material-ui/core/colors/blue';
import {green400,green600} from '@material-ui/core/colors/green';
//const { red400, red600, blue400, blue600, green400, green600 } = require('material-ui/styles/colors');

export default props => 
<div style={{ position: 'relative', width: '100%', height: 'auto' }}>
<AutoRotatingCarousel
  label='Get started'
  open={true}
  style={{ position: 'relative' }}
>
  <Slide
    media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
    mediaBackgroundStyle={{backgroundColor: red400}}
    contentStyle={{backgroundColor: red600}}
    title='This is a very cool feature'
    subtitle='Just using this will blow your mind.'
  />
  <Slide
    media={<img src='http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png' />}
    mediaBackgroundStyle={{backgroundColor: blue400}}
    contentStyle={{backgroundColor: blue600}}
    title='Ever wanted to be popular?'
    subtitle='Well just mix two colors and your are good to go!'
  />
  <Slide
    media={<img src='http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png' />}
    mediaBackgroundStyle={{backgroundColor: green400}}
    contentStyle={{backgroundColor: green600}}
    title='May the force be with you'
    subtitle='The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe.'
  />
</AutoRotatingCarousel>
</div>