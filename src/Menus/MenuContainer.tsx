/// <reference path='../../typings/Menu.d.ts' />
import * as React from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import HeatmapSettingsMenu from './HeatmapSettingsMenu';
import onClickOutside from "react-onclickoutside";

class MenuContainer extends React.Component<MenuContainerProps, MenuContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            menuState: 'main'
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }
    handleClickOutside = evt => {
        this.setState({visible: false})
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

    handleViewChange(e) {
        this.setState({ menuState: e.currentTarget.value });

        e.stopPropagation();
    }

    render() {
        if (this.state.menuState === 'Heatmap') {
            return (
                <div>
                    <MenuButton handleMouseDown={this.handleMouseDown} />
                    <HeatmapSettingsMenu handleViewChange={this.handleViewChange} menuVisibility={this.state.visible} />
                </div>
            )
        }
        else if (this.state.menuState === 'Filter') {
            return (
                <div>
                    <MenuButton handleMouseDown={this.handleMouseDown} />
                    <HeatmapSettingsMenu handleViewChange={this.handleViewChange} menuVisibility={this.state.visible}/>
                </div>
            )
        }
        else if (this.state.menuState === 'Contact') {
            return (
                <div>
                    <MenuButton handleMouseDown={this.handleMouseDown} />
                    <HeatmapSettingsMenu handleViewChange={this.handleViewChange} menuVisibility={this.state.visible}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <MenuButton handleMouseDown={this.handleMouseDown} />
                    <Menu handleViewChange={this.handleViewChange}  menuVisibility={this.state.visible} />
                </div>
            )
        }
    }
}

export default onClickOutside(MenuContainer);