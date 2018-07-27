import * as simpleheat from "simpleheat";
import * as d3 from 'd3';
import * as React from 'react';
import { geoMercator, geoPath } from 'd3-geo';

export class Heatmap extends React.Component{
    private canvas;
    private fighterData: JSON;
    private projection = geoMercator();
    readonly POINT_RADIUS = 10;
    readonly BLUR_RADIUS = 25;
    private node = this.node;
    constructor(props) {
        super(props);
        // this.buildHeatMap();
    }

    render(){
        return(
            <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight} id='heatmap'></canvas>
        );
        
    }

    buildHeatMap() {
        let array = [];
        for (let fighter in this.fighterData) {
            let cx = this.projection([this.fighterData[fighter].longitude, this.fighterData[fighter].latitude])[0]
            let cy = this.projection([this.fighterData[fighter].longitude, this.fighterData[fighter].latitude])[1]
            let weightclass = this.fighterData[fighter].weightclass;
            let value = 0;
            if (weightclass == "Welterweight") {
                value = 1;
            }
            array.push([cx, cy, value])

        }
        let heat = simpleheat(this.canvas);
        heat.data(array);
        heat.max(1);
        heat.radius(this.POINT_RADIUS, this.BLUR_RADIUS);
        heat.draw(0.05);
    }

    filterByWeightclass(weightclassIn) {
        let heatmapData = []
        console.log("Weightclass = " + weightclassIn)
        for (let fighter in this.fighterData) {
            let cx = this.projection([this.fighterData[fighter].longitude, this.fighterData[fighter].latitude])[0]
            let cy = this.projection([this.fighterData[fighter].longitude, this.fighterData[fighter].latitude])[1]
            let weightclass = this.fighterData[fighter].weightclass;
            let value = 0;
           if(weightclassIn == weightclass){
               value = 1
           }
            heatmapData.push([cx, cy, value])

        }
        console.log(heatmapData)
        let heat = simpleheat(this.canvas);
        heat.data(heatmapData);
        heat.max(1);
        heat.radius(this.POINT_RADIUS, this.BLUR_RADIUS);
        heat.draw(0.05);
        heat.resize();
    }

    toggleHeatmap() {
        let heatmap = d3.select("#heatmap");
        console.log(heatmap.style("display"));
        console.log(heatmap.style("display") == "block");
        if (heatmap.style("display") == "block") {
            heatmap.transition().style("display", "none");
        }
        else {
            heatmap.transition().delay(1000).style("display", "block");
        }
    }
}