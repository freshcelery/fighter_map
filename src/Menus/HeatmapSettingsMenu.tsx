/// <reference path='../../typings/Menu.d.ts' />
import * as React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../Theme';

class HeatmapSettingsMenu extends React.Component<any, HeatmapMenuState> {

    constructor(props) {
        super(props);

        this.state = {
            Flyweight: true,
            Bantamweight: false,
            Featherweight: false,
            Lightweight: false,
            Welterweight: false,
            Middleweight: false,
            Light_Heavyweight: false,
            Heavyweight: true,
            Women_Strawweight: false,
            Women_Flyweight: false,
            Women_Bantamweight: true,
            Women_Featherweight: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = weightclass => event => {
        this.setState({ [weightclass]: event.currentTarget.checked });
    }

    render() {
        const { Flyweight, Bantamweight, Featherweight, Lightweight, Welterweight, Middleweight, Light_Heavyweight, Heavyweight, Women_Strawweight, Women_Flyweight, Women_Bantamweight, Women_Featherweight } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="menuContent">
                    <FormControl className="menuForm">
                        <ExpansionPanel className="menuExpansionPanel">
                            <ExpansionPanelSummary> Men's Divisions </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Flyweight" checked={Flyweight} onChange={this.handleChange("Flyweight")} />
                                        }
                                        label="Flyweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Bantamweight" checked={Bantamweight} onChange={this.handleChange("Bantamweight")} />
                                        }
                                        label="Bantamweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Featherweight" checked={Featherweight} onChange={this.handleChange("Featherweight")} />
                                        }
                                        label="Featherweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Lightweight" checked={Lightweight} onChange={this.handleChange("Lightweight")} />
                                        }
                                        label="Lightweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Welterweight" checked={Welterweight} onChange={this.handleChange("Welterweight")} />
                                        }
                                        label="Welterweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Middleweight" checked={Middleweight} onChange={this.handleChange("Middleweight")} />
                                        }
                                        label="Middleweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Light_Heavyweight" checked={Light_Heavyweight} onChange={this.handleChange("Light_Heavyweight")} />
                                        }
                                        label="Light Heavyweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Heavyweight" checked={Heavyweight} onChange={this.handleChange("Heavyweight")} />
                                        }
                                        label="Heavyweight">
                                    </FormControlLabel>
                                </FormGroup>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary> Women's Divisions </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Women_Strawweight" checked={Women_Strawweight} onChange={this.handleChange("Women_Strawweight")} />
                                        }
                                        label="Strawweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Women_Flyweight" checked={Women_Flyweight} onChange={this.handleChange("Women_Flyweight")} />
                                        }
                                        label="Flyweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Women_Bantamweight" checked={Women_Bantamweight} onChange={this.handleChange("Women_Bantamweight")} />
                                        }
                                        label="Bantamweight">
                                    </FormControlLabel>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="Women_Featherweight" checked={Women_Featherweight} onChange={this.handleChange("Women_Featherweight")} />
                                        }
                                        label="Featherweight">
                                    </FormControlLabel>
                                </FormGroup>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </FormControl>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default HeatmapSettingsMenu;