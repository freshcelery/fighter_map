require('../styles/loader.scss');
import * as React from 'react';
import MediaQuery from 'react-responsive';


class Overlay extends React.Component {

    render() {
        return (
            <div className='loadingOverlay'>
                <MediaQuery query="(min-device-width: 1224px)">
                    <svg className="container" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="0, 0 -30, 125 -5, 125 -5, 125 20, 0" className="loadingPoly" id="sliceOne"/>
                        <polygon points="20, 0 -5, 125 20, 125 20, 125 45, 0" className="loadingPoly" id="sliceTwo" />
                        <polygon points="45, 0 20, 125 45, 125 45, 125 70, 0" className="loadingPoly" id="sliceThree" />
                        <polygon points="70, 0 45, 125 70, 125 70, 125 95, 0" className="loadingPoly" id="sliceFour" />
                        <polygon points="95, 0 70, 125 95, 125 95, 125 120, 0" className="loadingPoly" id="sliceFive" />
                    </svg>
                </MediaQuery>
                <MediaQuery query="(orientation: portrait">
                <svg className="container" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect width="100%" height="20%" x="0" y="0" className="loadingPoly" id="sliceOne"/>
                        <rect width="100%" height="20%"  x="0" y="20%" className="loadingPoly" id="sliceTwo" />
                        <rect width="100%" height="20%" x="0" y="40%" className="loadingPoly" id="sliceThree" />
                        <rect width="100%" height="20%" x="0" y="60%" className="loadingPoly" id="sliceFour" />
                        <rect width="100%" height="20%" x="0" y="80%"  className="loadingPoly" id="sliceFive" />
                    </svg>
                </MediaQuery>
            </div>
        );
    }
}

export default Overlay;