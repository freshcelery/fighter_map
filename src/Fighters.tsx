import * as d3 from 'd3';
import * as React from 'react';
import { observer } from 'mobx-react';

interface FighterProps{
    data: any;
    projection: any;
    state: any;
    fighterInfoState: any;
}


@observer
class Fighters extends React.Component<FighterProps>{
    private node = this.node;

    constructor(props) {
        super(props);
        this.fighter_onclick_event = this.fighter_onclick_event.bind(this);
    }

    componentDidMount(){
        this.plotFighterData();
    }

    componentDidUpdate(){
        this.plotFighterData();
    }


    fighter_onclick_event(){
        let click = (d) => {
            if(!this.props.fighterInfoState.showFighterInfo){
                this.props.fighterInfoState.toggleFighterInfo();
            }
            this.props.fighterInfoState.currentFighterData = d;
            console.log(this.props.fighterInfoState.currentFighterData.name)
        }

        return click
    }

    fighter_mouseover_event() {
        let hover = function (d) {
            // Update circle size
            let circle_size = d3.select("circle").attr('r');
            d3.select(this).transition().ease(d3.easeCircle).duration(250).attr('r', Number(circle_size) * 2);

            // Show name div
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
            // Reset circle size
            let circle_size = d3.select("circle").attr('r');
            d3.select(this).transition().ease(d3.easeCircle).duration(250).attr('r', Number(circle_size));

            // Hide name div
            let div = document.getElementById('tooltip');
            div.style.visibility = 'hidden';
        }
 
        return hover
    }

    plotFighterData() {
        let data = JSON.parse(this.filterData());
        let fighterPoints = d3.select(this.node).selectAll('circle').data(data);
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
            .on('mouseout', this.fighter_mouseout_event())
            .on('click', this.fighter_onclick_event());
            this.applyGlow();
        
            fighterPoints.exit().remove();
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
        let visibility = "hidden";

        if(this.props.state.visible){
            visibility = "visible"
        }

        let enabledWeightclasses = this.getEnabledWeightclasses();
        let weightclassAttr = {'weightclasses': enabledWeightclasses.join(' ')};

        return (
            <g ref={node => this.node = node} id='fighterData' className={visibility} {...weightclassAttr} />
        )
    }

    filterData(){
        let data = this.props.data;
        let filteredData = [];
        let weightclasses = this.getEnabledWeightclasses();
        for (let fighter of data){
            if (weightclasses.indexOf(fighter.weightclass) > -1){
                filteredData.push(fighter);
            }
        }
        return JSON.stringify(filteredData);
    }

    getEnabledWeightclasses(){
        const { weightclasses } = this.props.state;
        let weightclassArray = []
        for (let weightclass in weightclasses){
            if(weightclasses[weightclass]){
               weightclassArray.push(weightclass)
            }
        }

        return weightclassArray;
    }
}

export default Fighters