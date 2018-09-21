import * as React from 'react';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './Theme';
interface FighterInfoProps {
    fighterInfoState: any;
}

interface FighterInfoState{
    flipped: boolean;
}
@observer
class FighterInfo extends React.Component<FighterInfoProps, FighterInfoState>{

    constructor(props) {
        super(props);
        this.state = {flipped: false};
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.handleFlipCard = this.handleFlipCard.bind(this);
    }

    handleCloseButton() {
        this.props.fighterInfoState.toggleFighterInfo();
    }

    handleFlipCard(){
        let currentState = this.state.flipped;
        this.setState({flipped: !currentState});
    }

    render() {

        //Hide if no fighter clicked or show is false
        if (!this.props.fighterInfoState.currentFighterData || !this.props.fighterInfoState.showFighterInfo) {
            return (
                null
            )
        }
        
        let style = {};
        let topValue = parseInt(this.props.fighterInfoState.fighterTop, 10);
        if(topValue >= (window.innerHeight/2)){
            style={
                bottom: ((window.innerHeight - topValue) + 10) + 'px',
                left: this.props.fighterInfoState.fighterLeft,
                marginTop: 0,
                padding: 0,
            }
        }else{
            style = {
                top: this.props.fighterInfoState.fighterTop,
                left: this.props.fighterInfoState.fighterLeft,
                marginTop: 0,
                padding: 0,
            }
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className="flip-container" id={this.state.flipped ? 'flipped' : null} onClick={this.handleFlipCard} style={style}>
	                <div className="flipper">
                        <div className="front">
                            <Button id="fighterInfoCloseButton" onClick={this.handleCloseButton}>
                            </Button>
                            <Paper className="fighterInfo">
                                    <div className="fighterInfoImage">
                                        <img  id="fighterInfoImage" src={"../data/images/" + this.get_fighter_image()}/>
                                    </div>
                                    <div className="fighterWeightclassContainer" id="side">
                                        <Typography variant="headline" component="h3"align="center" id="fighterInfoWeightclass">
                                            {this.props.fighterInfoState.currentFighterData.weightclass}
                                        </Typography>
                                    </div>
                                    <div className="fighterWeightclassContainer" id="bottom"/>
                                    <div className="fighterLastNameContainer">
                                            <Typography variant="headline" component="h3" align="center" id="fighterInfoName">
                                             {this.getLastName()}
                                            </Typography>
                                    </div>
                                    <div className="fighterFirstNameContainer">
                                            <Typography variant="headline" component="h3" align="center" id="fighterInfoName">
                                                {this.getFirstName()}
                                            </Typography>
                                    </div>
                                    <div id="fighterInfoControlHeader">
                                        <div id="fighterInfoPointer"></div>
                                    </div>
                            </Paper>
                        </div>
                        <div className="back">
                            <Paper className="FighterInfo">
                                <div id="fighterInfoControlHeader">
                                    <div id="fighterInfoPointer"></div>
                                    <Button id="fighterInfoCloseButton" onClick={this.handleCloseButton}>
                                        x
                                    </Button>
                                </div>
                                <Typography variant="headline" component="h3" id="fighterInfoHeader" align="center">
                                    {this.props.fighterInfoState.currentFighterData.name}
                                </Typography>
                                <div id="fighterInfoStatsBox">
                                    <div id="fighterInfoContent">
                                        <Typography component="p">
                                            Birthplace: {this.props.fighterInfoState.currentFighterData.birthplace}
                                        </Typography>
                                        <Typography component="p">
                                            Age: {this.props.fighterInfoState.currentFighterData.age}
                                        </Typography>
                                        <Typography component="p">
                                            Height: {this.formatHeight(this.props.fighterInfoState.currentFighterData.height)}
                                        </Typography>
                                        <Typography component="p">
                                            Weight: {this.props.fighterInfoState.currentFighterData.weight} lbs
                                        </Typography>
                                        <Typography component="p">
                                            Weightclass: {this.props.fighterInfoState.currentFighterData.weightclass}
                                        </Typography>
                                        <Typography component="p">
                                            Reach: {this.props.fighterInfoState.currentFighterData.reach}"
                                        </Typography>
                                        <Typography component="p">
                                            Record: {this.props.fighterInfoState.currentFighterData.wins}/{this.props.fighterInfoState.currentFighterData.losses}/{this.props.fighterInfoState.currentFighterData.draws}
                                        </Typography>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

    //Changes height from inches to feet' inches" format
    formatHeight(heightInInches) {
        let inches = heightInInches % 12;
        let feet = (heightInInches - inches) / 12;
        return feet + "\' " + inches + "\"";
    }

    getFirstName(){
            return this.props.fighterInfoState.currentFighterData.name.split(' ')[0];
    }

    getLastName(){
        let lastName = this.props.fighterInfoState.currentFighterData.name.split(' ');
        lastName.shift();
        lastName.join(' ');
        return lastName;
    }

    get_fighter_image(){
        let name = this.props.fighterInfoState.currentFighterData.name.split(' ').join('_');
        let path = this.props.fighterInfoState.currentFighterData.weightclass + '/' + name + '.jpg';
        return path;
    }

}

export default FighterInfo