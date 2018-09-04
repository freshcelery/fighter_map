import Map from "./Map";
import MenuContainer from './Menus/MenuContainer';
import Overlay from './Overlay';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Axios from 'axios';
import HeatmapStore from './State/HeatmapStore';
import FighterStore from './State/FighterStore';
import FighterInfoStore from './State/FighterInfoStore';

interface AppState{
    data: JSON;
}

declare const API_PASSWORD: string;
declare const API_USERNAME: string;
const HEATMAP_STATE = new HeatmapStore();
const FIGHTER_STATE = new FighterStore();
const FIGHTER_INFO_STATE = new FighterInfoStore();

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
                this.setState({
                    data: response.data.results
                });
            });
    }

    render() {
        if(this.state.data){
        return (
            <div>
                <MenuContainer heatmapState={HEATMAP_STATE} fighterState={FIGHTER_STATE}/>
                <Map data={this.state.data} heatmapState={HEATMAP_STATE} fighterState={FIGHTER_STATE} fighterInfoState={FIGHTER_INFO_STATE}/>
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



