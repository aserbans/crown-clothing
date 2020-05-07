import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import {Route} from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import {updateCollection } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	state = {
		isLoading : true
	};

	unsubscribeFromSnapshot = null;

	componentDidMount(){
		const {updateCollection} = this.props;
		const collectionRef = firestore.collection('collections');

		collectionRef.onSnapshot(async snapshot => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
				updateCollection(collectionsMap);
				this.setState({isLoading:false});
		});
	}

	render(){
		const { match } = this.props;
		const { isLoading } = this.state;
		return(
			<div className='shop-page'>
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />} />
				<Route  path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />} />
			</div>
		);
	}
}	

const mapDispatchToProps = dispatch => ({
	updateCollection: collectionMap => dispatch(updateCollection(collectionMap))
}
);

export default connect(null,mapDispatchToProps)(ShopPage);						

				 


	

			


