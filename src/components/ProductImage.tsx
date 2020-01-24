import * as React from 'react';
import sneakersImg from "../assets/sneakers.png";

const ProductImage: React.FC = () => {
  return(
    <div className="display-flex justify-center bg-londan-square w-660 h-550 rounded-26">
      <img src={sneakersImg} alt="shoe" className="align-center" />
    </div>
  );
}

export default ProductImage;
