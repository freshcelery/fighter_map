import * as React from 'react';

interface MenuButtonProps {
    handleMouseDown: any;
}

class MenuButton extends React.Component<MenuButtonProps>{
    render(){
        return(
            <button id="menu-button" onMouseDown={this.props.handleMouseDown}></button>
        )
    }
}

export default MenuButton;