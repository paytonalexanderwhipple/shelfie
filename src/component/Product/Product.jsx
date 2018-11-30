import React from 'react';
import {Link} from 'react-router-dom';
import './Product.css'

function Product(props) {
    return (
    <div className='product'>
        <img 
            src={props.product.image_url ? props.product.image_url : 'data:image/jpeg;base64,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'} 
            alt="its a product" 
            className='product-img'/>
        <div className='product-info'>
            <div className='product-name'>
                {props.product.name}
            </div>
            <div className='product-price'>
                {`$${(props.product.price/100).toFixed(2)}`}
            </div>
            <div className="product-buttons">
                <button 
                    onClick={() => {props.deleteProduct(props.product.product_id)}}
                    className='product-button'>
                    Delete
                </button>
                <Link to={`/admin/${props.product.product_id}`}>
                    <button className='product-button'>Edit</button>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default Product;