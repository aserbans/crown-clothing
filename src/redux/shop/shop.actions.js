import ShopActionTypes from './shop.types.js';

export const  updateCollection = collectionMap => ({
	type: ShopActionTypes.UPDATE_COLLECTION,
	payload:collectionMap
});