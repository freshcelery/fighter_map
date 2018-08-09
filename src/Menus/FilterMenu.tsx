/// <reference path='../../typings/Menu.d.ts' />
import * as React from "react";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from '../Theme';

class FilterMenu extends React.Component<any> {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default FilterMenu;