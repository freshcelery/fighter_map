// import Axios from "axios";
// import { Fighter } from "./fighter";
// import { json } from "d3";
import Map from "./map";

let map = new Map();
map.create_map();
// console.log("Hello World!")
// let data = new Array();
// Axios.get("http://127.0.0.1:8000/fighters/")
//     .then(function (response) {
//         for (let fighter_data of response.data.results) {
//             let fighter = new Fighter(fighter_data.name, fighter_data.birthplace, fighter_data.age, fighter_data.height, fighter_data.weight, fighter_data.reach, fighter_data.record, fighter_data.weightclass, fighter_data.latitude, fighter_data.longitude);
//             data.push(fighter)
//         }
//     })

// let data_2 = JSON.stringify(data)
// let projection = geoMercator();
// let path = geoPath().projection(projection);

// let svg = d3.select("body").append("svg").attr("width", 900)
// .attr("height", 600);

// let g = svg.append("g");

// d3.json('colombia.geo.json', (error, data: data.fighter) {
//     var features = mapData.features;

  
//     // Draw each province as a path
//     g.selectAll('path')
//         .data(features)
//       .enter().append('path')
//         .attr('d', path)
//         .attr('vector-effect', 'non-scaling-stroke')
//   });