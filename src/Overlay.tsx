import * as React from 'react';

class Overlay extends React.Component {

    render() {
        return (
            <div className='loading_overlay'>
                <div className='loading_message'>
                    Loading...
            </div>
            </div>
        );
    }
}

export default Overlay;