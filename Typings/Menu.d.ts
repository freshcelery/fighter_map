interface MenuProps{
    menuVisibility: boolean;
    handleMouseDown(event: any): void;
    handleViewChange(event: any): void;
}

interface MenuContainerProps{
}

interface MenuContainerState{
    visible: boolean;
    menuState: string;
}

interface MenuButtonProps{
    handleMouseDown: any
}