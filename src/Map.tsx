import * as React from 'react';
import * as d3 from 'd3';
import Heatmap from './Heatmap';
import Fighters from './Fighters';
import FighterInfo from './FighterInfo';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { observer } from 'mobx-react';

interface MapProps {
    data: any;
    heatmapState: any;
    fighterState: any;
    fighterInfoState: any;
}

interface MapState {
    heatmapVisibility?: boolean;
    projection: any;
    viewbox: any;
}

@observer
class Map extends React.Component<MapProps, MapState>{
    private centered: any;
    private node = this.node;
    private geoID = (d) => {
        return 'c' + d.id
    }

    constructor(props) {
        super(props);
        this.state = {
            heatmapVisibility: true,
            projection: undefined,
            viewbox: "0 0 " + window.innerWidth + " " + window.innerHeight
        };

        this.mapClickHandler = this.mapClickHandler.bind(this);
        this.createMap = this.createMap.bind(this);
    }


    componentDidMount() {
        this.createMap();
    }

    render() {
        let viewbox = "0 0 " + window.innerWidth + " " + window.innerHeight;
        return (
            <div className='container'>
                <FighterInfo fighterInfoState={this.props.fighterInfoState} />
                {this.state.projection && <Heatmap projection={this.state.projection} data={this.props.data} state={this.props.heatmapState} />}
                <svg viewBox={this.state.viewbox}>
                    <g ref={node => this.node = node} className='boundary' >
                        {this.state.projection && <Fighters projection={this.state.projection} data={this.props.data} state={this.props.fighterState} fighterInfoState={this.props.fighterInfoState} />}
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
                let s = .95 / Math.max((b[1][0] - b[0][0]) / window.innerWidth, (b[1][1] - b[0][1]) / window.innerHeight);
                let t: [number, number] = [(window.innerWidth - s * (b[1][0] + b[0][0])) / 2, (window.innerHeight - s * (b[1][1] + b[0][1])) / 2];
                countryProjection.scale(s).translate(t);
                this.setState({ projection: countryProjection })
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
            } else {
                x = window.innerWidth / 2;
                y = window.innerHeight / 2;
                k = 1;
                this.centered = null;
            }

            // If map is zoomed, hide heatmap
            if (d === this.centered) {
                this.props.heatmapState.disableHeatmap();
                d3.select(this.node).selectAll(".fighterBorder").attr('r', 5);
                d3.select(this.node).selectAll(".fighter").attr('r', 2.5);
            } else {
                this.props.heatmapState.disableHeatmap();
                d3.select(this.node).selectAll(".fighterBorder").attr('r', 10);
                d3.select(this.node).selectAll(".fighter").attr('r', 5);
            }
            d3.select(this.node).selectAll("path")
                .classed("active", (d) => { return d === this.centered });

            d3.select(this.node)
                .transition()
                .duration(750)
                .attr("transform", "translate(" + window.innerWidth / 2 + "," + window.innerHeight / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

        return click;
    }
}

export default Map