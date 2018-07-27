import { geoMercator, geoPath } from 'd3-geo';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import Axios from 'axios';
import { Heatmap } from './Heatmap.tsx';
//import Toolbar from './toolbar';
import * as React from 'react';

declare const API_PASSWORD: string;
declare const API_USERNAME: string;

export class Map extends React.Component {
    private height = window.innerHeight;
    private width = window.innerWidth;
    private projection = geoMercator()
    public path = geoPath().projection(this.projection);
    private centered: any;
    private node = this.node;
    private geoID = (d) => {
        return 'c' + d.id
    }

    constructor(props) {
        super(props);
        this.create_map();
        this.get_fighter_data();
    }

    render(){
        return(
            <div className='container'>
                <Heatmap />
                <svg width={this.width} height={this.height}>
                    <g ref={node => this.node = node} className='boundary' />
                </svg>
                <div id='tooltip'></div>
            </div>
        );
    }

    /*
    * Function used to create the initial world map
    */
    create_map() {
        d3.json('data/world.json')
            .then((data: any) => {
                let countries = feature(data, data.objects.countries);
                this.projection.scale(1).translate([0, 0]);
                let b = this.path.bounds(countries as any);
                let s = .95 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height);
                let t: [number, number] = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];
                this.projection.scale(s).translate(t);
                let world = d3.select(this.node).selectAll('path').data(countries.features);
                world.enter()
                    .append('path')
                    .attr('d', this.path)
                    .attr('id', this.geoID)
                    .attr('class', 'country')
                    .on('click', this.click_to_zoom());
                //Exit
                world.exit().remove();
            },
                (error) => {
                    return;
                })
    }

    world_map_click_handler() {
        let click = (d) => {
            d3.selectAll('path').attr('fill-opacity', 0.2);
            d3.select('#' + this.geoID(d)).attr('fill-opacity', 1);
        }

        return click;
    }

    fighter_mouseover_event() {
        let hover = function (d) {
            let circle_size = d3.select("circle").attr('r');
            d3.select(this).transition().ease(d3.easeCircle).duration(250).attr('r', Number(circle_size) * 2);
            let div = document.getElementById('tooltip');
            div.style.left = d3.event.pageX + 'px';
            div.style.top = d3.event.pageY + 'px';
            div.innerHTML = d.name
            div.style.visibility = 'visible';
        }

        return hover
    }

    fighter_mouseout_event() {
        let hover = function (d) {
            let circle_size = d3.select("circle").attr('r');
            d3.select(this).transition().ease(d3.easeCircle).duration(250).attr('r', Number(circle_size));
            let div = document.getElementById('tooltip');
            div.style.visibility = 'hidden';
        }

        return hover
    }

    get_fighter_data() {
        Axios({
            method: 'get',
            url: 'http://www.api.freshcelery.ca/fighters/',
            auth: {
                username: API_USERNAME,
                password: API_PASSWORD
            }
        }
        ).then((response) => {
            // this.heatmap = new Heatmap(response.data.results, this.projection);
            // this.heatmap.buildHeatMap();
            // let toolbar = new Toolbar(this.heatmap);
            this.fighters(response.data.results);
            console.log(response);
            //this.loading_overlay_hide();
        });


    }

    loading_overlay_hide() {
        let loading_element = document.getElementsByClassName('loading_overlay');
        loading_element[0].setAttribute('style', 'display: none')
    }

    fighters(fightData) {
        let fighterPoints = d3.select(this.node).selectAll('circle').data(fightData);
        let fighterText = d3.select(this.node).selectAll('text').data(fightData);
        fighterPoints.enter()
            .append('circle')
            .attr('cx', (d: any) => {
                return this.projection([d.longitude, d.latitude])[0]
            })
            .attr('cy', (d: any) => {
                return this.projection([d.longitude, d.latitude])[1]
            })
            .attr('r', 5)
            .attr('fill', 'white')
            .attr('class', 'fighter')
            .on('mouseover', this.fighter_mouseover_event())
            .on('mouseout', this.fighter_mouseout_event());
    }

    click_to_zoom() {
        let click = (d) => {
            let x, y, k;
            if (d && this.centered !== d) {
                let centroid = this.path.centroid(d);
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
                // this.heatmap.toggleHeatmap();
                d3.select(this.node).selectAll("circle").attr('r', 1)
            } else {
                // this.heatmap.toggleHeatmap();
                d3.select(this.node).selectAll("circle").attr('r', 5)
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