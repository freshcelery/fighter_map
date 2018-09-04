import * as simpleheat from "simpleheat";
import * as React from 'react';
import { observer } from 'mobx-react';

interface HeatmapProps{
    projection: any;
    data: any;
    state: any;
}

@observer
export class Heatmap extends React.Component<HeatmapProps, any>{
    private canvas;
    private canvasRef;
    readonly POINT_RADIUS = 10;
    readonly BLUR_RADIUS = 25;

    constructor(props: HeatmapProps) {
        super(props);
        this.canvasRef = React.createRef();
    }

    render(){
        const {visible} = this.props.state;

        let visibility = "hidden";

        if(visible){
            visibility = "visible"
        }

        const {disabled} = this.props.state;
        let disabledState = "enabled";
        if(disabled){
            disabledState = "disabled";
        }
        const classes = `${disabledState} ${visibility}`
        let enabledWeightclasses = this.getEnabledWeightclasses();
        let weightclassAttr = {'weightclasses': enabledWeightclasses.join(' ')};

        return(
            <canvas ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} id='heatmap' className={classes} {...weightclassAttr}></canvas>
        );

    }

    componentDidMount(){
        this.buildHeatMap();
    }

    componentDidUpdate(){
        this.buildHeatMap();
    }

    buildHeatMap() {
        let fighterData = [];
        for (let fighter in this.props.data) {
            let cx = this.props.projection([this.props.data[fighter].longitude, this.props.data[fighter].latitude])[0]
            let cy = this.props.projection([this.props.data[fighter].longitude, this.props.data[fighter].latitude])[1]
            let currentWeightclass = this.props.data[fighter].weightclass;
            let enabledWeightclasses = this.getEnabledWeightclasses();
            if (enabledWeightclasses.indexOf(currentWeightclass) > -1){
                fighterData.push([cx, cy])
            }

        }
        this.canvas = this.canvasRef.current;
        let heat = simpleheat(this.canvas);
        heat.data(fighterData);
        heat.radius(this.POINT_RADIUS, this.BLUR_RADIUS);
        heat.draw(0.05);
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

export default Heatmap