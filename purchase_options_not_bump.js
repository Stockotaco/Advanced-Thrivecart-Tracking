var products = [];
customerFullName = _thrive_order.customer.name;
customerEmail = _thrive_order.customer.email;
function atq(product) {
	products.push(product), (window.dataLayer = window.dataLayer || []);
	window.dataLayer.push({
		event: 'purchase',
		id: product.id,
		name: product.name,
		price: product.price,
		type: product.category,
		quantity: product.quantity,
		capi_event_id: product.capi_event_id,
		currency: _thrive_order.order.currency,
		fullName: customerFullName,
		first_name: customerFullName.split(' ').slice(0, -1).join(' '),
		last_name: customerFullName.split(' ').slice(-1).join(' '),
		email: customerEmail,
	});
}
if (_thrive_order.order.bump) {
	var bump = {
		id: 'bump-' + _thrive_order.order.bump.id,
		name: _thrive_order.order.bump.name,
		price: _thrive_order.order.bump.total,
		quantity: _thrive_order.order.bump.quantity,
		capi_event_id:
			_thrive_order.order.id + '-' + 'bump' + '-' + _thrive_order.order.bump.id,
		category: 'bump',
	};
	atq(bump);
}
if (_thrive_order.order.product) {
	var product = {
		id: 'product-' + _thrive_order.order.product.id,
		name: _thrive_order.order.product.name,
		price: _thrive_order.order.product.total,
		quantity: _thrive_order.order.product.quantity,
		capi_event_id:
			_thrive_order.order.id +
			'-' +
			'product' +
			'-' +
			_thrive_order.order.product.id,
		category: 'product',
	};
	atq(product);
}
if (_thrive_order.order.upsells) {
	for (keys in _thrive_order.order.upsells) {
		var product = {
			id: 'upsell-' + _thrive_order.order.upsells[keys].id,
			name: _thrive_order.order.upsells[keys].name,
			price: _thrive_order.order.upsells[keys].total,
			quantity: _thrive_order.order.upsells[keys].quantity,
			capi_event_id:
				_thrive_order.order.id +
				'-' +
				'upsell' +
				'-' +
				_thrive_order.order.upsells[keys].id,
			category: 'upsell',
		};
		atq(product);
	}
}
if (_thrive_order.order.downsells) {
	for (keys in _thrive_order.order.downsells) {
		var product = {
			id: 'downsell-' + _thrive_order.order.downsells[keys].id,
			name: _thrive_order.order.downsells[keys].name,
			price: _thrive_order.order.downsells[keys].total,
			quantity: _thrive_order.order.downsells[keys].quantity,
			capi_event_id:
				_thrive_order.order.id +
				'-' +
				'downsell' +
				'-' +
				_thrive_order.order.downsells[keys].id,
			category: 'downsell',
		};
		atq(product);
	}
}
window.dataLayer = window.dataLayer || [];
dataLayer.push({
	event: 'eec.transactionComplete',
	ecommerce: {
		currencyCode: _thrive_order.order.currency,
		purchase: {
			actionField: {
				id: _thrive_order.order.id,
				affiliation: '',
				revenue: _thrive_order.order.total,
				tax: _thrive_order.order.tax,
				shipping: _thrive_order.order.shipping,
				discount: '0.00',
				coupon: '',
			},
			products: products,
		},
	},
});
