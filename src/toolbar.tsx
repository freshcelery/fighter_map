// import Heatmap from "./heatmap";
// import * as React from 'react';

// export class Toolbar extends React.Component{
//     private heatmap;

//     constructor(props, heatmap){
//         super(props);
//         this.state = {
//             enabled: true,
//             weightclass: 'Flyweight'
//         }
//         this.heatmap = heatmap;

//         this.toolbarExpandButtonEvent()
//         this.toggleHeatmapEvent();
//         this.filterHeatMapByWeight("Flyweight");
//         this.filterHeatMapByWeight("Bantamweight");
//         this.filterHeatMapByWeight("Featherweight");
//         this.filterHeatMapByWeight("Lightweight");
//         this.filterHeatMapByWeight("Welterweight");
//         this.filterHeatMapByWeight("Middleweight");
//         this.filterHeatMapByWeight("Light_Heavyweight");
//         this.filterHeatMapByWeight("Heavyweight");
//         this.filterHeatMapByWeight("Women_Strawweight");
//         this.filterHeatMapByWeight("Women_Flyweight");
//         this.filterHeatMapByWeight("Women_Bantamweight");
//         this.filterHeatMapByWeight("Women_Featherweight");
//     }

//     render(){
//         return(
//             <div></div>
//         );
//     }

//     toolbarExpandButtonEvent(){
//         let expandButton = <HTMLElement>document.getElementsByClassName("toggle-toolbar-button")[0];
//         expandButton.addEventListener('click', () => {
//             let toolbar = <HTMLElement>document.getElementsByClassName("toolbar")[0];
//             if (toolbar.style.display == "flex"){
//                 toolbar.style.display = "none";
//             }
//             else{
//                 toolbar.style.display = "flex";
//             }
//         })
//     }

//     toggleHeatmapEvent(){
//         let heatmapButton = <HTMLElement>document.getElementById("heatmap-button");

//         heatmapButton.addEventListener('click', () => {
//             this.heatmap.toggleHeatmap();
//         });
//     }

//     filterHeatMapByWeight(weightclass){

//         let weightclassButton = <HTMLElement>document.getElementById(weightclass + "_button");
//         console.log(weightclass);
//         weightclassButton.addEventListener('click', () => {
//             this.heatmap.filterByWeightclass(weightclass);
//         })
//     }

// }