import React, { useState } from "react";
import { objs } from "./dataCards";
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import "./cardStyle.css";
function CardsPage() {
  // declare total number of cards as array
  const cards = [1, 2, 3, 4, 5];
  // declare variable of react-spring for cards => start as to
  const to = (i) => ({
    x: 0,
    y: i * 10,
    scale: 1,
    rot: -10 + Math.random() * 10, //rotation -10 + Math.random() * 20 =>1
    delay: i * 100,
  });
  // declare variable of react-spring for cards => end as from
  const from = (i) => ({ rot: 0, scale: 1.5, y: -1000 });
  // declare transform for cards //?perspective(1500px)
  const trans = (r, s) =>
    ` rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;
  // declare Set Object as gone card    //?array
  const [gone] = useState(() => new Set());
  // roud of moving cards
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  // Gesture
  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); //rotate
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );
  // main return
  return (
    <div className="CardsPage w-100 pt-2 d-flex flex-column align-items-center">
      <div className="cardPlace d-flex w-100 justify-content-center">
        {props.map(({ x, y, rot, scale }, i) => (
          <Card
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            trans={trans}
            cards={cards}
            objs={objs}
            bind={bind}
          />
        ))}
      </div>
      
    </div>
  );
}

export default CardsPage;
