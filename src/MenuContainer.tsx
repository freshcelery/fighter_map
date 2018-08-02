/// <reference path='../typings/Menu.d.ts' />
import * as React from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';

class MenuContainer extends React.Component<MenuContainerProps, MenuContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
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

    render() {
        return (
            <div>
                <MenuButton handleMouseDown={this.handleMouseDown} />
                <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible} />
            </div>
        )
    }
}

export default MenuContainer;