/// <reference path='../typings/App.d.ts' />
import Map from "./Map";
import MenuContainer from './MenuContainer';
import Overlay from './Overlay';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Axios from 'axios';

declare const API_PASSWORD: string;
declare const API_USERNAME: string;

class App extends React.Component<any, AppState>{
    constructor(props){
        super(props);
        this.state = {data: null}
    }

    componentDidMount(){
        this.getFighterData();
    }

    getFighterData(){
            Axios({
                method: 'get',
                url: 'http://www.api.freshcelery.ca/fighters/',
                auth: {
                    username: API_USERNAME,
                    password: API_PASSWORD
                }
            }
            ).then((response) => {
                console.log("state changed");
                this.setState({
                    data: response.data.results
                });
            });
    }

    render() {
        if(this.state.data){
        return (
            <div>
                <MenuContainer />
                <Map data={this.state.data}/>
            </div>
        );
    }
    else{
        return(
            <Overlay />
        )
    }
    }
}

ReactDOM.render(
    < App />,
    document.getElementById('app')
);



