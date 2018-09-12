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

@observer
class FighterInfo extends React.Component<FighterInfoProps>{

    constructor(props) {
        super(props);
        this.handleCloseButton = this.handleCloseButton.bind(this);
    }

    handleCloseButton() {
        this.props.fighterInfoState.toggleFighterInfo();
    }

    render() {

        //Hide if no fighter clicked or show is false
        if (!this.props.fighterInfoState.currentFighterData || !this.props.fighterInfoState.showFighterInfo) {
            return (
                null
            )
        }

        let style = {
            top: this.props.fighterInfoState.fighterTop,
            left: this.props.fighterInfoState.fighterLeft,
            marginTop: 0,
            padding: 0,
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Paper className="FighterInfo" style={style}>
                    <div id="fighterInfoControlHeader">
                        <div id="fighterInfoPointer"></div>
                        <Button id="fighterInfoCloseButton" onClick={this.handleCloseButton}>
                        x
                        </Button>
                    </div>
                    <Typography variant="headline" component="h3" id="fighterInfoHeader" align="center">
                        {this.props.fighterInfoState.currentFighterData.name}
                    </Typography>
                    <div id="fighterInfoImageBox">
                        <img src={"../data/images/" + this.get_fighter_image()} />
                    </div>
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
            </MuiThemeProvider>
        )
    }

    //Changes height from inches to feet' inches" format
    formatHeight(heightInInches) {
        let inches = heightInInches % 12;
        let feet = (heightInInches - inches) / 12;
        return feet + "\' " + inches + "\"";
    }

    get_fighter_image(){
        let name = this.props.fighterInfoState.currentFighterData.name.split(' ').join('_');
        let path = this.props.fighterInfoState.currentFighterData.weightclass + '/' + name + '.jpg';
        return path;
    }

}

export default FighterInfo