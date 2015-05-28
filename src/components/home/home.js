export class HomeCtrl {
	$title = 'Home';

	$fab = {
		label: 'Add',
		icon: 'add',
		click: this.fabClick.bind(this)
	}

	$actions = [
		{
			label: 'More',
			icon: 'more_vert',
			menu: [
				{
					label: 'An item',
					click: function() {
						console.log('item clicked');
					}.bind(this)
				}
			]
		}
	];

	items = ['A', 'B', 'C', 'D', 'E'];

	static $inject = [];
	constructor() {
	}

	actionClick(e) {
		console.log('action clicked');
	}

	fabClick() {
		console.log('fab clicked');
	}
}