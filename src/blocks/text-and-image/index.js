/**
 * BLOCK: Text and Image
 *
 * A simple layout block to show and image and some text side by side
 */

/**
 * Block Dependencies
 */
import icons from '../icons';
import Inspector from './inspector';
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;

const { MediaUpload, BlockControls, InnerBlocks } = wp.editor;

const { Button, Toolbar, Tooltip, Dashicon } = wp.components;

const attributes = {
	message: {
		type: 'array',
		source: 'children',
		selector: '.message-body',
	},
	verticalAlignCentre: {
		type: 'boolean',
		default: true,
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
	textFirstAlignment: {
		type: 'boolean',
		default: false,
	},
	columnWidth: {
		type: 'number',
		default: 50,
	},
	imgExtension: {
		type: 'boolean',
		default: false,
	},
};
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
registerBlockType( 'cgb/block-text-and-image', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Text & Image' ), // Block title.
	icon: 'id', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'text-and-image — CGB Block' ), __( 'Text and Image' ) ],
	attributes,

	// The "edit" property must be a valid function.
	edit: props => {
		const {
			attributes: {
				imgID,
				imgURL,
				imgAlt,
				textFirstAlignment,
				imgExtension,
				columnWidth,
				verticalAlignCentre,
			},
			className,
			setAttributes,
			isSelected,
		} = props;

		const onSelectImage = img => {
			setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};
		const onRemoveImage = () => {
			setAttributes( {
				imgID: null,
				imgURL: null,
				imgAlt: null,
			} );
		};
		const toggleTextFirstAlignment = () => {
			setAttributes( {
				textFirstAlignment: ! textFirstAlignment,
			} );
		};
		const onChangeColumnWidth = value => {
			setAttributes( {
				columnWidth: value,
			} );
		};

		const onChangeImgExtension = value => {
			setAttributes( { imgExtension: value } );
		};

		const onChangeVerticalAlign = value => {
			setAttributes( { verticalAlignCentre: value } );
		};

		return [
			<div key="first">
				<Inspector
					{ ...{
						onChangeColumnWidth,
						onChangeImgExtension,
						onChangeVerticalAlign,
						...props,
					} }
				/>

				<div className={ className }>
					<BlockControls key="custom-controls">
						<Toolbar className="components-toolbar">
							<Tooltip text={ __( 'Switch image/text alignment' ) }>
								<Button
									className="components-button components-icon-button components-toolbar__control"
									onClick={ toggleTextFirstAlignment }
								>
									<Dashicon icon="image-flip-horizontal" />
								</Button>
							</Tooltip>
						</Toolbar>
					</BlockControls>

					<div
						className="flex row"
						style={ {
							flexDirection: textFirstAlignment ? 'row-reverse' : 'row',
							alignItems: verticalAlignCentre ? 'center' : 'start',
						} }
					>
						<div
							className="message-body"
							style={ {
								width: columnWidth + '%',
							} }
						>
							<InnerBlocks />
						</div>
						<div
							style={ {
								flex: 1,
							} }
						>
							{ ! imgID ? (
								<MediaUpload
									onSelect={ onSelectImage }
									type="image"
									value={ imgID }
									render={ ( { open } ) => (
										<Button
											className="components-button button button-large"
											onClick={ open }
										>
											Open Media Library
										</Button>
									) }
								/>
							) : (
								<div
									className="position-relative"
									style={ {
										marginRight:
											imgExtension && ! textFirstAlignment ?
												'calc(50% - 50vw)' :
												'',
										marginLeft:
											imgExtension && textFirstAlignment ?
												'calc(50% - 50vw)' :
												'',
									} }
								>
									<img src={ imgURL } alt={ imgAlt } />

									{ isSelected ? (
										<Button className="remove-image" onClick={ onRemoveImage }>
											{ icons.remove }
										</Button>
									) : null }
								</div>
							) }
						</div>
					</div>
				</div>
			</div>,
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function( props ) {
		const colOrder = props.attributes.textFirstAlignment ?
			'row-reverse' :
			'row';

		const {
			attributes: {
				columnWidth,
				imgExtension,
				textFirstAlignment,
				imgURL,
				imgAlt,
				verticalAlignCentre,
			},
			className,
		} = props;

		return (
			<div className={ className }>
				<div
					className="flex row"
					style={ {
						flexDirection: colOrder,
						alignItems: verticalAlignCentre ? 'center' : 'start',
					} }
				>
					<div
						className="message-body"
						style={ {
							width: columnWidth + '%',
						} }
					>
						<InnerBlocks.Content />
					</div>
					<div
						className="image-wrapper"
						style={ {
							flex: 1,

							marginRight:
								imgExtension && ! textFirstAlignment ? 'calc(50% - 50vw)' : '',
							paddingRight: imgExtension && ! textFirstAlignment ? '0' : '',
							marginLeft:
								imgExtension && textFirstAlignment ? 'calc(50% - 50vw)' : '',
							paddingLeft: imgExtension && textFirstAlignment ? '0' : '',
						} }
					>
						<img src={ imgURL } alt={ imgAlt } />
					</div>
				</div>
			</div>
		);
	},

	deprecated: [
		{
			attributes,
			save: function( props ) {
				const colOrder = props.attributes.textFirstAlignment ?
					'row-reverse' :
					'row';
				return (
					<div className={ props.className }>
						<div className="flex row" style={ { flexDirection: colOrder } }>
							<div
								className="message-body"
								style={ {
									width: props.attributes.columnWidth + '%',
								} }
							>
								<InnerBlocks.Content />
							</div>
							<div
								className="image-wrapper"
								style={ {
									flex: 1,
								} }
							>
								<img
									src={ props.attributes.imgURL }
									alt={ props.attributes.imgAlt }
								/>
							</div>
						</div>
					</div>
				);
			},
		},
	],
} );
