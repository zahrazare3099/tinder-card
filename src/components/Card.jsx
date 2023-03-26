import React, { Component } from "react";
import { animated, interpolate } from "react-spring";
import Carousel from "nuka-carousel/lib/carousel";

class Card extends Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, objs } = this.props;
    const { word, wordMeaning, example, translationExample, pics, id } =
      objs[i];

    return (
      <animated.div
        className="d-flex position-absolute bg-gray enonymous-class"
        key={`card${id}`}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          ),
        }}
      >
        <animated.div
          className=""
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans),
          }}
        >
          <div
            key={`card-${id}`}
            className="each-card w-100 p-2 border border-1 border-dark d-flex flex-column align-items-center"
          >
            <h2 className="font-weight-bold pt-1 pb-2 m-0">{word}</h2>
            <Carousel>
              {pics.map((pic) => (
                <img src={pic} alt="profilePicture" />
              ))}
            </Carousel>
            <h4 className="font-weight-bold m-0 py-2">{wordMeaning}</h4>
            <h5 className="font-weight-light m-0 py-1">{example}</h5>
            <h5 className="font-weight-light m-0 pb-2 pt-1">
              
              {translationExample}
            </h5>
          </div>
        </animated.div>
      </animated.div>
    );
  }
}

export default Card;
