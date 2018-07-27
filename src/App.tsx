import Map from "./Map";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import Toolbar from "./toolbar";

class App extends React.Component{
    render(){
        return(
            < Map />
        );
    }
}

ReactDOM.render(
    < App />,
    document.getElementById('app')
);



