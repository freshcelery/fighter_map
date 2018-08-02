/// <reference path='../typings/Menu.d.ts' />
import * as React from 'react';

class MenuButton extends React.Component<MenuButtonProps>{
    render(){
        return(
            <button id="menu_button" onMouseDown={this.props.handleMouseDown}></button>
        )
    }
}

export default MenuButton;