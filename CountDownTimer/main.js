const dayEl = document.getElementById("day-inner");
const hourEl = document.getElementById("hour-inner");
const minuteEl = document.getElementById("minute-inner");
const secondEl = document.getElementById("second-inner");

const currentTime = new Date();
const arr = ["nhagiao.jpg", "noel.jpg", "tet.jpg"];
const nhagiao = "20 Nov 2024";
const chris = "25 Dec 2024";
const tet = "1 Jan 2025";
const chrisDate = new Date(chris);
const nhaGiaoDate = new Date(nhagiao);
const tetDate = new Date(tet);
const date = [nhaGiaoDate, chrisDate, tetDate];
let dem2 = 0;
function count(i) {
  //Doi ve Giay
  const totalTime = (Number(date[i]) - currentTime) / 1000;
  const days = Math.floor(totalTime / 3600 / 24);
  const hours = Math.floor(totalTime / 3600 / 60);
  const minutes = Math.floor(totalTime / 3600) % 60;
  const seconds = Math.floor(totalTime) % 60;
  dayEl.innerHTML = days;
  hourEl.innerHTML = format(hours);
  minuteEl.innerHTML = format(minutes);
  secondEl.innerHTML = format(seconds);
}
function format(time) {
  return time < 10 ? `0${time}` : time;
}
//initial call func
let index = 0;
let idx = 0;
setInterval(function () {
  if (index === arr.length - 1 && idx === date.length) {
    index = 0;
    idx = 0;
  }
  document.getElementById(
    "change"
  ).style.backgroundImage = `url(${arr[index]})`;
  if (Number(date[idx]) - currentTime == 0) {
    ++index;
    ++idx;
  }
}, 1000);
// count();
setInterval(function () {
  if (dem2 === date.length - 1) {
    dem2 = 0;
  }
  if (Number(date[dem2]) - currentTime === 0) {
    ++dem2;
  }
  count(dem2);
}, 1000);
// setInterval(count, 1000);
