interface MenuProps {
    menuVisibility: boolean;
    handleMouseDown(event: any): void;
    handleViewChange(event: any): void;
}

interface MenuContainerProps {
    heatmapState: any;
    fighterState: any;
}

interface MenuContainerState {
    visible: boolean;
    menuState: number;
}

interface MenuButtonProps {
    handleMouseDown: any
}

interface HeatmapMenuState {
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