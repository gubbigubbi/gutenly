/**
 * BLOCK: Features
 *
 * A simple block to show a feature
 */
import classnames from 'classnames';
import icons from '../icons';

/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks;
const { BlockControls, InnerBlocks, BlockAlignmentToolbar } = wp.editor;
const { Button, Toolbar, Tooltip, Dashicon } = wp.components;

/*
* Block Components
*/
import Inspector from './editor/inspector';
import FeatureBlock from './editor/featureBlock';
import ListBlock from './editor/listBlock';
import * as constants from './constants';
/**
 * Register: aa Gutenberg Block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-feature', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Feature' ), // Block title.
	icon: 'heart', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'feature' ), __( 'Feature List' ) ],
	attributes: constants.attributes,

	getEditWrapperProps( attributes ) {
		const { blockAlignment } = attributes;
		if (
			'left' === blockAlignment ||
			'right' === blockAlignment ||
			'full' === blockAlignment
		) {
			return { 'data-align': blockAlignment };
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const {
			attributes: {
				blockAlignment,
				imgID,
				imgURL,
				imgAlt,
				showButton,
				buttonText,
				title,
				description,
				link,
				circularImg,
				type,
				imgDimness,
			},
			className,
			setAttributes,
			isSelected,
		} = props;

		const onChangeTitle = title => {
			setAttributes( { title } );
		};

		const onChangeDescription = description => {
			setAttributes( { description } );
		};

		const onSelectImage = img => {
			let thumb = img.url;

			setAttributes( {
				imgID: img.id,
				imgAlt: img.alt,
			} );

			if ( circularImg ) {
				const image = new wp.api.models.Media( { id: img.id } )
					.fetch()
					.done( res => {
						thumb = res.media_details.sizes.thumbnail.source_url;
						setAttributes( {
							imgURL: thumb,
						} );
					} );
			} else {
				setAttributes( {
					imgURL: img.url,
				} );
			}
		};

		const onRemoveImage = () => {
			setAttributes( {
				imgID: null,
				imgURL: null,
				imgAlt: null,
			} );
		};

		const onChangeLink = value => {
			setAttributes( { link: value } );
		};

		const onChangeButtonText = value => {
			setAttributes( { buttonText: value } );
		};

		const onChangeBackgroundColor = backgroundColor => {
			setAttributes( { backgroundColor } );
		};

		const onChangeTextColor = textColor => {
			console.log(textColor);
			setAttributes( { textColor } );
		};

		const updateAlignment = nextAlign => {
			setAttributes( {
				blockAlignment: nextAlign,
			} );
		};

		const onChangeImgType = circularImg => {
			setAttributes( { circularImg } );
		};

		const onToggleButton = () => {
			setAttributes( { showButton: ! showButton } );
		};

		const onChangeImgDimness = imgDimness => {
			setAttributes( { imgDimness } );
		};

		const imgClasses = classnames(
			'center-block',
			circularImg ? 'image--circle' : null
		);

		const blockClasses = classnames( className, type );

		return [
			<div key="first">
				<Inspector
					{ ...{
						onChangeLink,
						onChangeButtonText,
						onChangeImgType,
						onToggleButton,
						onChangeBackgroundColor,
						onChangeTextColor,
						onChangeImgDimness,
						...props,
					} }
				/>

				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ updateAlignment }
						controls={ [ 'left', 'right', 'center' ] }
					/>
					<Toolbar className="components-toolbar">
						<Tooltip text={ __( 'List Type' ) }>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': type === 'list' }
								) }
								onClick={ () => setAttributes( { type: 'list' } ) }
							>
								<Dashicon icon="text" />
							</Button>
						</Tooltip>
						<Tooltip text={ __( 'Block Type' ) }>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': type === 'block' }
								) }
								onClick={ () =>
									setAttributes( { type: 'block', circularImg: false } )
								}
							>
								<Dashicon icon="format-image" />
							</Button>
						</Tooltip>
					</Toolbar>
				</BlockControls>

				<div className={ blockClasses } style={ { textAlign: blockAlignment } }>
					{ type === 'list' ? (
						<ListBlock
							{ ...{
								onSelectImage,
								onRemoveImage,
								onChangeTitle,
								onChangeDescription,
								imgClasses,
								...props,
							} }
						/>
					) : (
						<FeatureBlock
							{ ...{
								onSelectImage,
								onRemoveImage,
								onChangeTitle,
								onChangeDescription,
								imgClasses,
								...props,
							} }
						/>
					) }
				</div>
			</div>,
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function( props ) {
		const {
			attributes: {
				blockAlignment,
				imgURL,
				imgAlt,
				title,
				description,
				buttonText,
				link,
				showButton,
			},
			classNames,
		} = props;

		const classes = classnames(
			classNames,
			blockAlignment ? `flex--align${ blockAlignment }` : null
		);

		return (
			<div className={ classes } style={ { textAlign: blockAlignment } }>
				<div className="featured__image-wrapper">
					<img className="image--circle" src={ imgURL } alt={ imgAlt } />
				</div>

				<div className="feature__content">
					<h3 className="feature__title">{ title }</h3>
					<div className="feature__description">{ description }</div>
					<InnerBlocks.Content />
					{ showButton ? (
						<a href={ link } className="button button--primary">
							{ buttonText }
						</a>
					) : null }
				</div>
			</div>
		);
	},

	deprecated: [
		{
			attributes: constants.attributes,
			save: function( props ) {
				const {
					attributes: {
						blockAlignment,
						imgURL,
						imgAlt,
						title,
						description,
						buttonText,
						link,
						showButton,
					},
					classNames,
				} = props;

				const classes = classnames(
					classNames,
					blockAlignment ? `flex--align${ blockAlignment }` : null
				);

				return (
					<div className={ classes } style={ { textAlign: blockAlignment } }>
						<div className="featured__image-wrapper">
							<img className="image--circle" src={ imgURL } alt={ imgAlt } />
						</div>

						<div className="feature__content">
							<h3 className="feature__title">{ title }</h3>
							<div className="feature__description">{ description }</div>
							<InnerBlocks.Content />
							{ showButton ? (
								<a href={ link } className="button button--primary">
									{ buttonText }
								</a>
							) : null }
						</div>
					</div>
				);
			},
		},
	],
} );
