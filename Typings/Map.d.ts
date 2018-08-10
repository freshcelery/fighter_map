interface MapProps{
    data: any;
    heatmapState: any;
    fighterState: any;
}

interface MapState{
    heatmapVisibility?: boolean;
    projection: any;
    viewbox: any;
}