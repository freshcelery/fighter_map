import {observable, action} from 'mobx';

export default class FighterStore {
    @observable weightclasses = {
        Flyweight: true,
        Bantamweight: false,
        Featherweight: false,
        Lightweight: false,
        Welterweight: false,
        Middleweight: false,
        Light_Heavyweight: false,
        Heavyweight: true,
        Women_Strawweight: false,
        Women_Flyweight: false,
        Women_Bantamweight: true,
        Women_Featherweight: false
    };

    @observable visible = true;

    @action toggleWeightclass(weightclass){
        this.weightclasses[weightclass] = !this.weightclasses[weightclass];
    }

    @action toggleVisibility(){
        this.visible = !this.visible;
    }
}
