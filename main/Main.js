import './Main.css';

export default class Main {
  constructor() {
    let item = document.getElementById('zoetrope');

    item.addEventListener('mouseenter', function(event) {
      // console.log('mouseenter');
    }, false);

    item.addEventListener('mouseleave', function(event) {
      // console.log('mouseleave');
    }, false);

    item.addEventListener('mousemove', function(event) {
      // console.log('mousemove');
      // console.log(event.clientX);
      this.calcMouseXPercentage(event.clientX);
      this.calcMouseYPercentage(event.clientY);
    }.bind(this), false);
  }

  calcMouseXPercentage(clientX) {
    let viewportWidth = document.documentElement.clientWidth;
    let percentage = Math.round(clientX / (viewportWidth / 100));

    console.log('x: ' + percentage + '%');
  }

  calcMouseYPercentage(clientY) {
    let viewportHeight = document.documentElement.clientHeight;
    let percentage = Math.round(clientY / (viewportHeight / 100));

    console.log('y: ' + percentage + '%');
  }
}

new Main();
