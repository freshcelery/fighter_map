require('../../styles/menu.scss');
import * as React from 'react';
import MenuButton from './MenuButton';
import FilterMenu from './FilterMenu';
import ContactMenu from './ContactMenu';
import HeatmapSettingsMenu from './HeatmapSettingsMenu';
import onClickOutside from "react-onclickoutside";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views'
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from '../Theme';

interface MenuContainerProps {
    heatmapState: any;
    fighterState: any;
}

interface MenuContainerState {
    visible: boolean;
    menuState: number;
}


class MenuContainer extends React.Component<MenuContainerProps, MenuContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            menuState: 0,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }

    //Closes menu when you click outside
    handleClickOutside = evt => {
        this.setState({ visible: false })
    }

    // Toggles menu open/close on button click
    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    handleMenuButtonClick(e) {
        this.toggleMenu();

        e.stopPropagation();
    }

    // Handles changing of current active view in menu
    handleViewChange = (event, value) => {
        this.setState({ menuState: value });
    }

    handleViewIndex = index => {
        this.setState({ menuState: index });
    };

    render() {
        var visibility = "hide";
        if (this.state.visible) {
            visibility = "show";
        }

        const tabStyle = {minWidth: '60px', width: '33%'};

        return(
            <MuiThemeProvider theme={theme}>
                <div>
                    <MenuButton handleMouseDown={this.handleMenuButtonClick} />
                    <div id="flyout-menu" className={visibility}>
                        <AppBar position="static">
                            <Tabs value={this.state.menuState} onChange={this.handleViewChange}>
                            <Tab label="Filter" style={tabStyle} />
                            <Tab label="Heatmap" style={tabStyle} />
                            <Tab label="Contact" style={tabStyle} />
                        </Tabs>
                        </AppBar>
                    <SwipeableViews index={this.state.menuState} onChangeIndex={this.handleViewIndex} >
                        <FilterMenu state={this.props.fighterState}/>
                        <HeatmapSettingsMenu state={this.props.heatmapState}/>
                        <ContactMenu />
                    </SwipeableViews>
                    </div>
                </div >
            </MuiThemeProvider >
        );
    }
}

export default onClickOutside(MenuContainer);