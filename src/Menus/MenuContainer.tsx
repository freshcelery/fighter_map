/// <reference path='../../typings/Menu.d.ts' />
import * as React from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import HeatmapSettingsMenu from './HeatmapSettingsMenu';
import onClickOutside from "react-onclickoutside";
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

class MenuContainer extends React.Component<MenuContainerProps, MenuContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            menuState: 0,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }
    handleClickOutside = evt => {
        this.setState({ visible: false })
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    handleMouseDown(e) {
        this.toggleMenu();

        e.stopPropagation();
    }

    handleViewChange = (event, value) =>{
        this.setState({ menuState: value});
    }

    handleViewIndex = index => {
        this.setState({ menuState: index });
      };

    render() {
        var visibility = "hide";
        if (this.state.visible) {
            visibility = "show";
        }

        return (
                <div>
                    <MenuButton handleMouseDown={this.handleMouseDown} />
                    <Paper id="flyoutMenu" className={visibility}>
                        <AppBar position="static">
                            <Tabs value={this.state.menuState} onChange={this.handleViewChange} fullWidth={true}>
                                <Tab label="Filter" style={{minWidth: 60}} />
                                <Tab label="Heatmap" style={{minWidth: 60}} />
                                <Tab label="Contact" style={{minWidth: 60}} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews index={this.state.menuState} onChangeIndex={this.handleViewIndex} >
                            <Menu />
                            <HeatmapSettingsMenu />
                        </SwipeableViews>
                    </Paper>
                </div>
        );
    }
}

export default onClickOutside(MenuContainer);