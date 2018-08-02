/// <reference path='../typings/Map.d.ts' />

import { geoMercator, geoPath } from 'd3-geo';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import Heatmap from './Heatmap';
import Fighters from './Fighters';
import * as React from 'react';

class Map extends React.Component<MapProps, MapState>{
    private height = window.innerHeight;
    private width = window.innerWidth;
    private centered: any;
    private node = this.node;
    private geoID = (d) => {
        return 'c' + d.id
    }

    constructor(props) {
        super(props);
        this.state = {
            heatmapVisibility: true,
            projection: null
        };

        this.mapClickHandler = this.mapClickHandler.bind(this);
    }
    componentDidMount(){
        this.createMap();
    }
    render(){
        return(
            <div className='container'>
                {this.state.projection && <Heatmap projection={this.state.projection} visible={this.state.heatmapVisibility} data={this.props.data}/>}
                <svg width={this.width} height={this.height}>
                    <g ref={node => this.node = node} className='boundary'>
                        {this.state.projection && <Fighters projection={this.state.projection} data={this.props.data} />}
                    </g>
                </svg>
                <div id='tooltip'></div>
            </div>
        );
    }

    /*
    * Function used to create the initial world map
    */
    createMap() {
        d3.json('data/world.json')
            .then((data: any) => {
                let countries = feature(data, data.objects.countries);
                let countryProjection = geoMercator();
                let path = geoPath().projection(countryProjection);
                countryProjection.scale(1).translate([0, 0]);
                let b = path.bounds(countries as any);
                let s = .95 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height);
                let t: [number, number] = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];
                countryProjection.scale(s).translate(t);
                this.setState({projection: countryProjection})
                let world = d3.select(this.node).selectAll('path').data(countries.features);
                world.enter().insert('path', ':first-child')
                    .attr('d', path)
                    .attr('id', this.geoID)
                    .attr('class', 'country')
                    .on('click', this.mapClickHandler(path));
                //Exit
                world.exit().remove();
            },
                (error) => {
                    return;
                })
    }

    mapClickHandler(path) {
        let click = (d) => {
            let x, y, k;
            if (d && this.centered !== d) {
                let centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 2;
                this.centered = d;
                console.log(this.centered);
            } else {
                x = this.width / 2;
                y = this.height / 2;
                k = 1;
                this.centered = null;
            }

            if (d === this.centered) {
                this.setState({
                    heatmapVisibility: false
                });
                d3.select(this.node).selectAll("circle").attr('r', 1);
            } else {
                this.setState({
                    heatmapVisibility: true
                });
                d3.select(this.node).selectAll("circle").attr('r', 5);
            }
            d3.select(this.node).selectAll("path")
                .classed("active", (d) => { return d === this.centered });

            d3.select(this.node)
                .transition()
                .duration(750)
                .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

        return click;
    }
}

export default Map