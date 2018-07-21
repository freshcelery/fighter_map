import * as simpleheat from "simpleheat";
import * as d3 from 'd3';
import { geoMercator } from 'd3-geo';

export default class Heatmap {
    private context;
    private canvas;
    constructor() {
        let div = d3.select('#map')
        let canvasLayer = div.append('canvas')
            .attr('id', 'heatmap')
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);
        this.canvas = canvasLayer.node() as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
    }

    buildHeatMap(data: JSON, projection) {
        let array = [];
        for (let fighter in data) {
            let cx = projection([data[fighter].longitude, data[fighter].latitude])[0]
            let cy = projection([data[fighter].longitude, data[fighter].latitude])[1]
            array.push([cx, cy])
        }
        console.log(array);
        let heat = simpleheat(this.canvas);
        heat.data(array);
        heat.radius(5, 5);
        heat.draw(0.05);
        heat.resize();
    }

    hideHeatmap(bool) {
        let heatmap = d3.select("#heatmap");
        if (bool) {
            heatmap.transition().style("display", "none");
        }
        else {
            heatmap.transition().delay(1000).style("display", "block");
        }
    }
}