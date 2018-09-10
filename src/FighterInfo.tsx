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
            left: this.props.fighterInfoState.fighterLeft
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Paper className="FighterInfo" style={style}>
                    <Button id="closeButton" onClick={this.handleCloseButton}>
                        x
                    </Button>
                    <Typography variant="headline" component="h3">
                        {this.props.fighterInfoState.currentFighterData.name}
                    </Typography>
                    <Typography component="p">
                        birthplace: {this.props.fighterInfoState.currentFighterData.birthplace}
                    </Typography>
                    <Typography component="p">
                        age: {this.props.fighterInfoState.currentFighterData.age}
                    </Typography>
                    <Typography component="p">
                        height: {this.formatHeight(this.props.fighterInfoState.currentFighterData.height)}
                    </Typography>
                    <Typography component="p">
                        weight: {this.props.fighterInfoState.currentFighterData.weight} lbs
                    </Typography>
                    <Typography component="p">
                        weightclass: {this.props.fighterInfoState.currentFighterData.weightclass}
                    </Typography>
                    <Typography component="p">
                        reach: {this.props.fighterInfoState.currentFighterData.reach}"
                    </Typography>
                    <Typography component="p">
                        record: {this.props.fighterInfoState.currentFighterData.wins}/{this.props.fighterInfoState.currentFighterData.losses}/{this.props.fighterInfoState.currentFighterData.draws}
                    </Typography>
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


}

export default FighterInfo