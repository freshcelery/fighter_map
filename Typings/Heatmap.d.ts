interface HeatmapProps{
    projection: any;
    visible: boolean;
    data: any;
    state: any;
}

interface HeatmapState{
    Flyweight?: boolean;
    Bantamweight?: boolean;
    Featherweight?: boolean;
    Lightweight?: boolean;
    Welterweight?: boolean;
    Middleweight?: boolean;
    Light_Heavyweight?: boolean;
    Heavyweight?: boolean;
    Women_Strawweight?: boolean;
    Women_Flyweight?: boolean;
    Women_Bantamweight?: boolean;
    Women_Featherweight?: boolean;
}