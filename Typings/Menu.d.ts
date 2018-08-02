interface MenuProps{
    menuVisibility: boolean;
    handleMouseDown(event: any): void;
}

interface MenuContainerProps{
}

interface MenuContainerState{
    visible: boolean;
}

interface MenuButtonProps{
    handleMouseDown: any
}