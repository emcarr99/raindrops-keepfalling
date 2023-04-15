$(document).ready(function () {
  // function that prevents just empty page on load
 let currentDay = dayjs().format('MMM DD, YYYY')
//  console.log(currentDay); <- logged the current day

// function to have default city load 
function defaultC() {
  cityName = "Austin"
  findCity();
}
defaultC();

let cityHistory = JSON.parse(localStorage)



});
