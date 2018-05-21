/**
 * BLOCK: PDF Download
 *
 * A simple block to show a pdf download link
 */
import Inspector from './inspector';
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;

const { RichText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-pdf-download', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('PDF Download'), // Block title.
	icon: 'download', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__('pdf'), __('PDF Download')],
	attributes: {
		title: {
			type: 'string',
			source: 'children',
			selector: 'h3',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.pdf-download__description',
		},
		// imgURL: {
		// 	type: "string",
		// },
		// imgID: {
		// 	type: "number",
		// },
		// imgAlt: {
		// 	type: "string",
		// },
		url: {
			type: 'string',
		},
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const {
			attributes: { title, description },
			className,
			setAttributes,
		} = props;

		const onChangeTitle = title => {
			setAttributes({ title });
		};
		const onChangeDescription = description => {
			setAttributes({ description });
		};

		const onChangeUrl = value => {
			setAttributes({ url: value });
		};

		// const onSelectImage = img => {
		//     props.setAttributes({
		//         imgID: img.id,
		//         imgURL: img.url,
		//         imgAlt: img.alt,
		//     });
		// };
		// const onRemoveImage = () => {
		// 	props.setAttributes({
		// 		imgID: null,
		// 		imgURL: null,
		// 		imgAlt: null
		// 	});
		// };

		return [
			<div key="first" className={className}>
				<Inspector {...{ onChangeUrl, ...props }} />
				<div>
					<div className="pdf-download__content">
						<RichText
							tagName="h3"
							placeholder={__('Add a title for the download')}
							onChange={onChangeTitle}
							value={title}
						/>

						<div className="pdf-download__description">
							<RichText
								tagName="div"
								multiline="p"
								placeholder={__('Add a description for the pdf')}
								onChange={onChangeDescription}
								value={description}
							/>
						</div>
					</div>
				</div>
			</div>,
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		const {
			attributes: { title, description, url },
			className,
		} = props;

		return (
			<a href={url} target="_blank" className={className}>
				<div className="pdf-download__content">
					<h3 className="pdf-download__title">{title}</h3>
					<div className="pdf-download__description">{description}</div>
				</div>
			</a>
		);
	},
});
