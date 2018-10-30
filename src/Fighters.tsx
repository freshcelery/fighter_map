import * as d3 from 'd3';
import * as React from 'react';
import { observer } from 'mobx-react';

interface FighterProps {
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

    componentDidMount() {
        this.plotFighterData();
    }

    componentDidUpdate() {
        this.plotFighterData();
    }

    fighter_onclick_event() {
        let click = (d) => {
            let fighterInfo = document.getElementsByClassName('FighterInfo')[0] as HTMLElement;
            if (!this.props.fighterInfoState.showFighterInfo) {
                this.props.fighterInfoState.toggleFighterInfo();
            }
            // Hide name div
            let tooltip = document.getElementById('tooltip');
            tooltip.style.visibility = 'hidden';
            this.props.fighterInfoState.currentFighterData = d;
            //Add 5 pixels so the info doesn't appear directly on top of point
            this.props.fighterInfoState.fighterLeft = (d3.event.pageX + 5) + 'px';
            this.props.fighterInfoState.fighterTop = (d3.event.pageY + 5) + 'px';
        }

        return click
    }

    fighter_mouseover_event() {
        let hover = function (d) {
            // Update circle size
            let test = d3.select(this);
            d3.select(this.parentNode).select('.fighter').transition().ease(d3.easeCircle).duration(250).attr('r', Number(test.attr('r')));

            // Show name div
            let tooltip = document.getElementById('tooltip');
            tooltip.style.left = d3.event.pageX + 'px';
            tooltip.style.top = d3.event.pageY + 'px';
            tooltip.innerHTML = d.name
            tooltip.style.visibility = 'visible';
        }

        return hover
    }

    fighter_mouseout_event() {
        let hover = function (d) {
            // Reset circle size
            let test = d3.select(this);
            d3.select(this.parentNode).select('.fighter').transition().ease(d3.easeCircle).duration(250).attr('r', Number(test.attr('r')) / 2);

            // Hide name div
            let tooltip = document.getElementById('tooltip');
            tooltip.style.visibility = 'hidden';
        }

        return hover
    }

    plotFighterData() {
        // Remove all existing nodes on update
        d3.select(this.node).selectAll('g').remove();
        
        let outerRadius = 10;
        // Check if map is zoomed in when redrawing data
        if(document.getElementsByClassName('zoomed').length > 0){
            outerRadius = 5;
        }
        let data = JSON.parse(this.filterData());
        let fighterPoints = d3.select(this.node).selectAll('circle').data(data);
        let g = fighterPoints.enter()
            .append('g')
            .attr("transform", (d: any) => { return "translate(" + this.props.projection([d.longitude, d.latitude])[0] + "," + this.props.projection([d.longitude, d.latitude])[1] + ")" })

        // Create outer circle for ease of click
        let outerCircle = g.append('circle')
            .attr('r', outerRadius)
            .attr('class', 'fighterBorder')
            .on('click', this.fighter_onclick_event())
            .on('mouseover', this.fighter_mouseover_event())
            .on('mouseout', this.fighter_mouseout_event())

        // Create inner circle for visualization
        let innerCircle = g.append('circle')
                .attr('r', outerRadius/2)
                .attr('fill', '#21a9de')
                .attr('class', 'fighter');

        fighterPoints.exit().remove();
    }


    render() {
        let visibility = "hidden";

        if (this.props.state.visible) {
            visibility = "visible"
        }

        let enabledWeightclasses = this.getEnabledWeightclasses();
        let weightclassAttr = { 'weightclasses': enabledWeightclasses.join(' ') };

        return (
            <g ref={node => this.node = node} id='fighterData' className={visibility} {...weightclassAttr} />
        )
    }

    filterData() {
        let data = this.props.data;
        let filteredData = [];
        let weightclasses = this.getEnabledWeightclasses();
        console.log(weightclasses);
        for (let fighter of data) {
            if (weightclasses.indexOf(fighter.weightclass) > -1) {
                filteredData.push(fighter);
            }
        }
        console.log(filteredData);
        return JSON.stringify(filteredData);
    }

    getEnabledWeightclasses() {
        const { weightclasses } = this.props.state;
        let weightclassArray = []
        for (let weightclass in weightclasses) {
            if (weightclasses[weightclass]) {
                weightclassArray.push(weightclass)
            }
        }

        return weightclassArray;
    }

    
}

export default Fighters