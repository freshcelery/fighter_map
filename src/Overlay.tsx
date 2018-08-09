import * as React from 'react';

class Overlay extends React.Component {

    render() {
        return (
            <div className='loadingOverlay'>
                <svg className="container" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0, 0 -30, 100 -5, 100 -5, 100 20, 0" className="loadingPoly" id="sliceOne" fill="red" />
                    <polygon points="20, 0 -5, 100 20, 100 20, 100 45, 0" className="loadingPoly" id="sliceTwo" />
                    <polygon points="45, 0 20, 100 45, 100 45, 100 70, 0" className="loadingPoly" id="sliceThree" />
                    <polygon points="70, 0 45, 100 70, 100 70, 100 95, 0" className="loadingPoly" id="sliceFour" />
                    <polygon points="95, 0 70, 100 95, 100 95, 100 120, 0" className="loadingPoly" id="sliceFive" />
                </svg>
            </div>
        );
    }
}

export default Overlay;