import React from 'react';
import './ImageLinkFormCeleb.css';

const ImageLinkFormCeleb = ({ onInputChangeCeleb, onButtonSubmitCeleb }) => {
  return (
    <div>
      <p className='f3'>
        {'Enter Image URL to Detect Celebrity.'}
      </p>
      <div className='center'>
        <div className='center cust pa4 br3 shadow-5'>
         
          <input className='f4 pa2 w-70 center' type='text' onChange={onInputChangeCeleb}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmitCeleb}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkFormCeleb;