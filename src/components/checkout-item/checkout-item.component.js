import React from 'react';
import { connect } from 'react-redux';
import { clearItemFromCart,addItem,removeItem } from '../../redux/cart/cart.actions';



import './checkout-item.style.scss';

const CheckoutItem = ({cartItem,clearItemFromCart,addItemInCart,removeItemFromCart}) => {
	const {imageUrl,name,quantity,price} = cartItem;
	return(
		<div className='checkout-item'>
			<div className='image-container'>
				<img src={imageUrl} alt='item' />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<div className='arrow' onClick={() => removeItemFromCart(cartItem) }>&#10094;</div>
					<span className='value'>{quantity}</span>
				<div className='arrow' onClick={() => addItemInCart(cartItem) }>&#10095;</div>
			</span>
			<span className='price'>${price}</span>
			<div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>

		</div>
	);	
};

const mapDispatchToProps = dispatch => ({
	clearItemFromCart:item => dispatch(clearItemFromCart(item)),
	addItemInCart:item => dispatch(addItem(item)),
	removeItemFromCart:item => dispatch(removeItem(item))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);