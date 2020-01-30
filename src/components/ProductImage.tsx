import * as React from 'react';
import artWorkImg from "../assets/artwork.png";

const ProductImage: React.FC = () => {
  return(
    <div className="display-flex justify-center">
      <img src={artWorkImg} alt="shoe" className="align-center w-389 h-388" />
    </div>
  );
}

export default ProductImage;
