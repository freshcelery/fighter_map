/// <reference path='../typings/Fighters.d.ts' />
import * as d3 from 'd3';
import * as React from 'react';

class Fighters extends React.Component<FighterProps>{
    private node = this.node;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.plotFighterData();
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

    plotFighterData() {
        let fighterPoints = d3.select(this.node).selectAll('circle').data(this.props.data);
        fighterPoints.enter()
            .append('circle')
            .attr('cx', (d: any) => {
                return this.props.projection([d.longitude, d.latitude])[0]
            })
            .attr('cy', (d: any) => {
                return this.props.projection([d.longitude, d.latitude])[1]
            })
            .attr('r', 5)
            .attr('fill', '#21a9de')
            .attr('class', 'fighter')
            .on('mouseover', this.fighter_mouseover_event())
            .on('mouseout', this.fighter_mouseout_event());
            this.applyGlow();
    }

    applyGlow(){
        let defs = d3.select(this.node).append("defs");
        let filter = defs.append('filter')
            .attr('id', 'glow')
        filter.append('feGaussianBlur')
            .attr("stdDeviation", "2")
            .attr("result", "coloredBlur");
        let feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        d3.selectAll('.fighterData').style('filter', 'url(#glow)');
    }

    render() {
        return (
            <g ref={node => this.node = node} className='fighterData' />
        )
    }
}

export default Fighters