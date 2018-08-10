/// <reference path='../../typings/Menu.d.ts' />
import * as React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../Theme';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { observer } from 'mobx-react';

@observer
class FilterMenu extends React.Component<any> {

    constructor(props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    handleChange = weightclass => event => {
        this.props.state.toggleWeightclass(weightclass);
    }

    handleVisibilityChange() {
        this.props.state.toggleVisibility();
    }

    render() {
        const { visible } = this.props.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="menuContent">
                    <FormControl className="menuForm">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox value="Visible" checked={visible} onChange={this.handleVisibilityChange} />
                                }
                                label="Visible">
                            </FormControlLabel>
                        </FormGroup>
                    </FormControl>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default FilterMenu;