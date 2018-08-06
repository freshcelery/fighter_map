/// <reference path='../typings/Heatmap.d.ts' />

import * as simpleheat from "simpleheat";
import * as React from 'react';

export class Heatmap extends React.Component<HeatmapProps, HeatmapState>{
    private canvas;
    readonly POINT_RADIUS = 10;
    readonly BLUR_RADIUS = 25;

    constructor(props: HeatmapProps) {
        super(props);
    }

    render(){
        let visibility = "hidden";

        if(this.props.visible){
            visibility = "visible"
        }

        return(
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} id='heatmap' className={visibility}></canvas>
        );
        
    }


    componentDidMount() {
        this.buildHeatMap();
    }

    buildHeatMap() {
        let array = [];
        for (let fighter in this.props.data) {
            let cx = this.props.projection([this.props.data[fighter].longitude, this.props.data[fighter].latitude])[0]
            let cy = this.props.projection([this.props.data[fighter].longitude, this.props.data[fighter].latitude])[1]
            let weightclass = this.props.data[fighter].weightclass;
            let value = 0;
            if (weightclass == "Welterweight") {
                value = 1;
            }
            array.push([cx, cy, value])

        }
        this.canvas = this.refs.canvas as any;
        let heat = simpleheat(this.canvas);
        heat.data(array);
        heat.max(1);
        heat.radius(this.POINT_RADIUS, this.BLUR_RADIUS);
        heat.draw(0.05);
    }
}

export default Heatmap