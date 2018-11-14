/**
 * BLOCK: Section
 *
 * Wrap another block in a section
 */
import classnames from 'classnames';
import { attributes } from './attributes';

import { default as edit } from './edit';
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE

const { InnerBlocks } = wp.editor;

const validAlignments = [ 'wide', 'full' ];

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
registerBlockType( 'cgb/block-section', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Section' ), // Block title.
	icon: 'editor-table', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'Section' ) ],
	attributes,

	edit,

	getEditWrapperProps( attributes ) {
		const { alignment } = attributes;

		if ( -1 !== validAlignments.indexOf( alignment ) ) {
			return { 'data-align': alignment };
		}
	},

	// The "save" property must be specified and must be a valid function.
	save: props => {
		const classes = classnames(
			'transition-all',
			props.attributes.alignment ? `align${ props.attributes.alignment }` : null
		);

		// if it is wide or full show a container
		const innerClasses = classnames(
			props.attributes.alignment == 'wide' ? 'container' : null
		);

		const {
			attributes: {
				id,
				sectionBackgroundColor,
				verticalPadding,
				horizontalPadding,
				topMargin,
				bottomMargin,
				maxWidth,
			},
		} = props;

		return (
			<div
				id={ id }
				className={ classes }
				style={ {
					backgroundColor: sectionBackgroundColor,
					paddingTop: verticalPadding + 'rem',
					paddingBottom: verticalPadding + 'rem',
					paddingLeft: horizontalPadding + 'rem',
					paddingRight: horizontalPadding + 'rem',
					marginTop: topMargin + 'rem',
					marginBottom: bottomMargin + 'rem',
				} }
			>
				<div
					className={ innerClasses }
					style={ {
						maxWidth: maxWidth + '%', // note this will need to be overriden in the style
						width: '100%',
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: [
		{
			attributes,

			save: props => {
				const classes = classnames(
					'transition-all',
					props.attributes.alignment ?
						`align${ props.attributes.alignment }` :
						null
				);

				// if it is wide or full show a container

				const innerClasses = classnames(
					props.attributes.alignment == 'wide' ? 'container' : null
				);

				const {
					attributes: {
						id,
						sectionBackgroundColor,
						verticalPadding,
						horizontalPadding,
						topMargin,
						bottomMargin,
					},
				} = props;

				return (
					<div
						id={ id }
						className={ classes }
						style={ {
							backgroundColor: sectionBackgroundColor,
							paddingTop: verticalPadding + 'rem',
							paddingBottom: verticalPadding + 'rem',
							paddingLeft: horizontalPadding + 'rem',
							paddingRight: horizontalPadding + 'rem',
							marginTop: topMargin + 'rem',
							marginBottom: bottomMargin + 'rem',
						} }
					>
						<div className={ innerClasses }>
							<InnerBlocks.Content />
						</div>
					</div>
				);
			},
		},
		{
			attributes,
			save: props => {
				const classes = classnames(
					'transition-all',
					props.attributes.alignment ?
						`align${ props.attributes.alignment }` :
						null
				);

				const innerClasses = classnames(
					props.attributes.alignment == 'wide' ? 'container' : null
				);

				const {
					attributes: {
						id,
						sectionBackgroundColor,
						verticalPadding,
						horizontalPadding,
						topMargin,
						bottomMargin,
					},
				} = props;

				return (
					<div
						id={ id }
						className={ classes }
						style={ {
							backgroundColor: sectionBackgroundColor,
							paddingTop: verticalPadding + 'rem',
							paddingBottom: verticalPadding + 'rem',
							paddingLeft: horizontalPadding + 'rem',
							paddingRight: horizontalPadding + 'rem',
							marginTop: topMargin + 'rem',
							marginBottom: bottomMargin + 'rem',
						} }
					>
						<div className={ innerClasses }>
							<InnerBlocks.Content />
						</div>
					</div>
				);
			},
		},
	],
} );
