/// <reference path='../../typings/Menu.d.ts' />
import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Menu extends React.Component<MenuProps> {
    render() {
        var visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return (
            <Paper id="flyoutMenu" className={visibility}>
                <Button value="Filter" onMouseDown={this.props.handleViewChange}>Filter</Button>
                <Button value="Heatmap" onMouseDown={this.props.handleViewChange}>Heatmap Settings</Button>
                <Button value="Contact" onMouseDown={this.props.handleViewChange}>Contact</Button>
            </Paper>
        );
    }
}

export default Menu;