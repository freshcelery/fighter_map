import { geoMercator, geoPath } from 'd3-geo';
import * as d3 from 'd3';
import { request } from 'd3-request';
import { feature } from 'topojson-client';
import Axios from 'axios';
import Fighter from './fighter';

declare const API_PASSWORD: string;
declare const API_USERNAME: string;

export default class Map {
    private height = window.innerHeight;
    private width = window.innerWidth;
    private projection = geoMercator();
    private path = geoPath().projection(this.projection);
    private svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
    private fighter: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
    private map: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
    private geoID = (d) => {
        return 'c' + d.id
    }

    constructor() {
        this.svg = d3.select('#map')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('class', 'world_map');

        this.map = this.svg.append('g').attr('class', 'boundary');
        this.fighter = this.svg.append('g').attr('class', 'fighter');
        // Commented due to bug
        // this.svg.append('rect')
        //             .attr('class', 'overlay')
        //             .attr('width', this.width)
        //             .attr('height', this.height)
        //             .call(this.zoom(this.map, this.fighter))
    }

    /*
    * Function used to create the initial world map
    */
    create_map() {
        d3.json('data/world.json')
            .then((unparseddata) => {
                let data = unparseddata as any;
                let countries = feature(data, data.objects.countries);
                let t: [number, number];
                this.projection.scale(1).translate([0, 0]);
                let b = this.path.bounds(countries);
                let s = .95 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height);
                t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];
                this.projection.scale(s).translate(t);

                let world = this.map.selectAll('path').data(countries.features);
                world.enter()
                    .append('path')
                    .attr('d', this.path)
                    .attr('id', this.geoID)
                    .attr('class', 'country');

                //Exit
                world.exit().remove();
                this.get_fighter_data();
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
        let hover = function(d) {
            d3.select(this).transition().ease(d3.easeCircle).duration(250).attr('r', 10);
            let div = document.getElementById('tooltip');
            div.style.left = d3.event.pageX + 'px';
            div.style.top = d3.event.pageY + 'px';
            div.innerHTML = d.name
            div.style.visibility = 'visible';
        }

        return hover
    }

    fighter_mouseout_event() {
        let hover = function(d) {
            d3.select(this).transition().ease(d3.easeCircle).duration(250).attr('r', 5);
            let div = document.getElementById('tooltip');
            div.style.visibility = 'hidden'; 
        }

        return hover
    }
    country_names(projection, svg) {
        d3.csv('data/cities.csv').then((cities) => {
            let country = svg.append('g').attr('class', 'country');
            let countryPoints = country.selectAll('circle').data(cities);
            let countryText = country.selectAll('text').data(cities);
            countryPoints.enter()
                .append('circle')
                .attr('cx', (d) => {
                    return projection([d.lon, d.lat])[0]
                })
                .attr('cy', (d) => {
                    return projection([d.lon, d.lat])[1]
                })
                .attr('r', 4)
                .attr('fill', 'white');
        });
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
            this.fighters(response.data.results);
            this.loading_overlay_hide();
        });


    }

    loading_overlay_hide() {
        let loading_element = document.getElementsByClassName('loading_overlay');
        loading_element[0].setAttribute('style', 'display: none')
    }

    fighters(fightData) {
        let fighterPoints: d3.Selection<d3.BaseType, {}, d3.BaseType, {}>;
        fighterPoints = this.fighter.selectAll('circle').data(fightData);
        let fighterText = this.fighter.selectAll('text').data(fightData);
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
            .on('mouseover', this.fighter_mouseover_event())
            .on('mouseout', this.fighter_mouseout_event());
        
        // fighterText.enter()
        //         .append('text')
        //         .attr('x', (d: any) => {
        //             return this.projection([d.longitude, d.latitude])[0]
        //         })
        //         .attr('y', (d: any) => {
        //             return this.projection([d.longitude, d.latitude])[1]
        //         })
        //         .text((d: any) => {
        //             return d.name;
        //         });
    }

    zoom(map, fighter) {
        let zoomed = function () {
            console.log('Zoomies');
            map.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ')scale(' + d3.event.transform.k + ')');
            fighter.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ')scale(' + d3.event.transform.k + ')');
        };

        let zoom = d3.zoom() // todo change behavior.zoom() to its equivalent in d3v4
            .scaleExtent([1, 8])
            .on('zoom', zoomed);

        return zoom;
    }
}