import React from 'react';
import './Celebrity.css';
import face from './face.jpg';
import hugh from './hugh.jpg';
import 'tachyons';

const Celebrity = ({ onCelebCardSbmt, onFaceBtnSbmt }) => {
  return (
<div class="center " id="grid-cust">   
<main class="grid ">
  <article>
  <div className="grow shadow-5 ov" >
    <img src={hugh}alt="Sample"/>
    </div>
    <div class="text">
      <h3>Celebrity</h3>
      <p>Identify celebrities that closely resemble detected faces</p>
      <button  onClick={onCelebCardSbmt}>Click Here</button>
    </div>
  </article>
  <article>
  <div className="grow shadow-5">
    <img src={face} alt="Sample"/>
    </div>
    <div class="text">
      <h3>Face Detection</h3>
      <p>Detect the presence and location of human faces with a bounding box</p>
      <button onClick={onFaceBtnSbmt}>Click Here</button>
    </div>
  </article>
  <div style={{paddingBottom: 1+'em' }}></div>
  </main>
  </div>
);
}

export default Celebrity;