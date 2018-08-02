/// <reference path='../typings/Menu.d.ts' />
import * as React from "react";

class HeatmapSettingsMenu extends React.Component<HeatmapMenuProps> {

    render() {

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