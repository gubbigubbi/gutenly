export const attributes = {
	title: {
		type: 'string',
		source: 'children',
		selector: 'h3',
	},
	textColor: {
		type: 'string',
		default: 'transparent',
	},
	backgroundColor: {
		type: 'string',
		default: 'transparent',
	},
	imgDimness: {
		type: 'number',
		default: '50',
	},
	description: {
		type: 'array',
		source: 'children',
		selector: '.feature__description',
	},
	imgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	imgID: {
		type: 'number',
	},
	imgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	circularImg: {
		type: 'boolean',
		default: 'false',
	},
	link: {
		type: 'string',
		default: '/contact',
	},
	showButton: {
		type: 'boolean',
		default: true,
	},
	buttonText: {
		type: 'string',
		default: 'Find out more',
	},
	blockAlignment: {
		type: 'string',
		default: 'center',
	},
	type: {
		type: 'string',
		default: 'list',
	},
};
