import React from 'react';
import './counter.css';

const counterData = [
  {
    number: '350+',
    text: 'Companies',
  },
  {
    number: '1K+',
    text: 'Recruiters',
  },
  {
    number: '5K+',
    text: 'Job Seekers',
  },
];

const Counter = () => {
  return (
    <section className="counter" id="projects">
      <div className="counter_container">
        <div className="counter__wrapper">
          {counterData.map((item, index) => (
            <div className="counter__item" key={index}>
              <h3 className="counter__number">{item.number}</h3>
              <h4 className="counter__title">{item.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
