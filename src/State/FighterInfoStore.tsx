import { observable, action } from 'mobx';

export default class FighterInfoStore {

    @observable showFighterInfo = false;
    @observable currentFighterData = null;
    @observable fighterTop = null;
    @observable fighterLeft = null;

    @action toggleFighterInfo() {
        console.log('clicked');
        this.showFighterInfo = !this.showFighterInfo;
    }
}
