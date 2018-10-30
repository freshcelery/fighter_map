require('../styles/fighterInfo.scss');
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

interface FighterInfoState {
    flipped: boolean;
}
@observer
class FighterInfo extends React.Component<FighterInfoProps, FighterInfoState>{

    constructor(props) {
        super(props);
        this.state = { flipped: false };
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.handleFlipCard = this.handleFlipCard.bind(this);
    }

    handleCloseButton(e) {
        // Stops click of close button triggering handleFlipCard!
        e.stopPropagation();
        this.props.fighterInfoState.toggleFighterInfo();
    }

    handleFlipCard() {
        let currentState = this.state.flipped;
        this.setState({ flipped: !currentState });
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
        if (topValue >= (window.innerHeight / 2)) {
            style = {
                bottom: (window.innerHeight - topValue) + 'px',
                left: this.props.fighterInfoState.fighterLeft,
                marginTop: 0,
                padding: 0,
            }
        } else {
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
                            <Button id="fighter-info-close-button" onClick={this.handleCloseButton}>
                            </Button>
                            <Paper className="fighter-info">
                                <div className="fighter-info-image-container">
                                    <img className="fighter-info-image" src={"../data/images/" + this.getImage()} />
                                </div>
                                <div className="fighter-weightclass-container" id="side">
                                    <Typography variant="headline" component="h3" align="center" id="fighter-info-weightclass">
                                        {this.getWeightclassFormatted()}
                                    </Typography>
                                </div>
                                <div className="fighter-weightclass-container" id="bottom" />
                                <div className="fighter-lastname-container">
                                    <Typography variant="headline" component="h3" align="center" id="fighter-info-name">
                                        {this.getLastName()}
                                    </Typography>
                                </div>
                                <div className="fighter-firstname-container">
                                    <Typography variant="headline" component="h3" align="center" id="fighter-info-name">
                                        {this.getFirstName()}
                                    </Typography>
                                </div>
                                <div className="fighter-info-control-header">
                                    <div className="fighter-info-pointer"></div>
                                </div>
                            </Paper>
                        </div>
                        <div className="back">
                            <Button id="fighter-info-close-button" onClick={this.handleCloseButton}>
                                x
                                    </Button>
                            <Paper className="fighter-info">
                                <div className="fighter-info-control-header">
                                    <div className="fighter-info-pointer"></div>
                                </div>
                                <div className="fighter-name-container-back">
                                    <Typography variant="headline" component="h3" className="fighter-info-header" align="center">
                                        {this.props.fighterInfoState.currentFighterData.name}
                                    </Typography>
                                </div>
                                <div className="fighter-info-stats">
                                    <div className="fighter-info-content-container">
                                        <div className="content-container odd">
                                            <div className="content-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Birthplace
                                            </Typography>
                                            </div>
                                            <div className="content-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.props.fighterInfoState.currentFighterData.birthplace}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="content-container even">
                                            <div className="content-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Age
                                            </Typography>
                                            </div>
                                            <div className="content-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.props.fighterInfoState.currentFighterData.age}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="content-container odd">
                                            <div className="content-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Height
                                            </Typography>
                                            </div>
                                            <div className="content-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.formatHeight(this.props.fighterInfoState.currentFighterData.height)}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="content-container even">
                                            <div className="content-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Weight
                                            </Typography>
                                            </div>
                                            <div className="content-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.props.fighterInfoState.currentFighterData.weight} lbs
                                            </Typography>
                                            </div>
                                        </div>
                                        <div className="content-container odd">
                                            <div className="content-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Reach
                                            </Typography>
                                            </div>
                                            <div className="content-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.props.fighterInfoState.currentFighterData.reach}"
                                            </Typography>
                                            </div>
                                        </div>
                                        <div className="content-container even">
                                            <div className="content-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Weightclass
                                            </Typography>
                                            </div>
                                            <div className="content-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.getWeightclassFormatted()}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="content-container" id="record">
                                            <div className="content-label" id="record-label">
                                                <Typography component="p" id='fighter-info-content'>
                                                    Record
                                            </Typography>
                                            </div>
                                            <div className="content-value" id="record-value">
                                                <Typography component="p" id='fighter-info-content'>
                                                    {this.props.fighterInfoState.currentFighterData.wins}/{this.props.fighterInfoState.currentFighterData.losses}/{this.props.fighterInfoState.currentFighterData.draws}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fighter-info-control-header">
                                    <div className="fighter-info-pointer"></div>
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

    getFirstName() {
        return this.props.fighterInfoState.currentFighterData.name.split(' ')[0];
    }

    getLastName() {
        let lastName = this.props.fighterInfoState.currentFighterData.name.split(' ');
        lastName.shift();
        return lastName.join(' ');
    }

    getImage() {
        let name = this.props.fighterInfoState.currentFighterData.name.split(' ').join('_');
        let path = this.props.fighterInfoState.currentFighterData.weightclass + '/' + name + '.png';
        return path;
    }

    getWeightclassFormatted() {
        let weightclass = this.props.fighterInfoState.currentFighterData.weightclass.split('_');
        return weightclass.join("'s ");
    }

}

export default FighterInfo