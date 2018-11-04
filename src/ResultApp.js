import React, {Component} from 'react';

class ResultApp extends Component {
    render(){
      const imageAnalyzeResult = this.props;
      const rows = imageAnalyzeResult.imageAnalyzeResult.map((row, index) => { 
        return(
          <div key={index} className="row">
              <h3>Result</h3>
              <div>
                <p>FaceId: {row.faceId}</p>
                <p>Age: {row.faceAttributes.age}</p>
              </div>
          </div>
        );
      });
      return <div>{rows}</div>;
    }
  }

export default ResultApp;