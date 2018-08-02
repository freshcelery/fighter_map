/// <reference path='../typings/Menu.d.ts' />
import * as React from "react";

class Menu extends React.Component<MenuProps> {

    render() {
        var visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return (
            <div id="flyoutMenu"
                onMouseDown={this.props.handleMouseDown}
                className={visibility}>
                <h2><a href="#">Filter</a></h2>
                <h2><a href="#">Heatmap Settings</a></h2>
                <h2><a href="#">Contact</a></h2>
            </div>
        );
    }
}

export default Menu;