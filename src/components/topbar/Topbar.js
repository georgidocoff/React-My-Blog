import {Carousel} from 'react-bootstrap';
import './Topbar.css';

const Topbar = ()=>{
    return(
    <Carousel fade>
    <Carousel.Item className="carousel">
    <img
      className="firstSlide"
      src="https://s3.amazonaws.com/pbblogassets/uploads/2012/04/instruments.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Many musical instruments</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img
      className="secondSlide"
      src="https://www.westfalmouthlibrary.org/wp-content/uploads/2015/04/music-notes.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Some notes</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img
      className="thirdSlide"
      src="https://dbclemons.files.wordpress.com/2021/06/sketchd90-4.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Bass guitar technicks</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    );
}

export default Topbar;