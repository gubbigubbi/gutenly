/**
 * BLOCK: Two Columns
 *
 * A temporary block to show 2 columns until the native columns block improves
 */

/**
 * Block Dependencies
 */
import icons from "../icons";
import Inspector from './inspector';
import { times } from 'lodash';
import memoize from 'memize';
/**
 * Internal block libraries
 */

const { __, sprintf } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	BlockControls,
	InnerBlocks,
	InspectorControls
} = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE
const {
	Button,
	Toolbar,
	Tooltip,
	Dashicon,
	PanelBody,
	PanelRow,
	TextControl
} = wp.components;

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getColumnLayouts = memoize( ( columns ) => {
	return times( columns, ( n ) => ( {
		name: `column-${ n + 1 }`,
		label: sprintf( __( 'Column %d' ), n + 1 ),
		icon: 'columns',
	} ) );
} );

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
registerBlockType("cgb/block-two-columns", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Two Columns", "CGB"), // Block title.
	icon: "dashicons-screenoptions", // Block icon from Dashicons
	category: "layout", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("two-columns — CGB Block"), __("Two Columns")],
	attributes: {
		columns: {
			type: 'number',
			default: 2,
		},
		textFirstAlignment: {
			type: "boolean",
			default: false
		},
		columnWidth: {
			type: "number",
			default: 50,
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {

		const toggleTextFirstAlignment = () => {
			props.setAttributes({
				textFirstAlignment: !props.attributes.textFirstAlignment
			});
		};
		const onChangeColumnWidth = value => {
			props.setAttributes({
				columnWidth: value
			})
		};
		return [
			!! props.focus && (
				<Inspector
				  { ...{ onChangeColumnWidth, ...props } }
				/>
	  		),
			<div className={props.className}>
				{!!props.focus && (
					<BlockControls key="custom-controls">
						<Toolbar className="components-toolbar">
							<Tooltip text={__("Switch image/text alignment")}>
								<Button
									className="components-button components-icon-button components-toolbar__control"
									onClick={toggleTextFirstAlignment}
								>
									<Dashicon icon="image-flip-horizontal" />
								</Button>
							</Tooltip>
						</Toolbar>
					</BlockControls>
				)}

				<div
					className="flex row"
					style={{
						flexDirection: props.attributes.textFirstAlignment
							? "row-reverse"
							: "row"
					}}
				>
					<div className="col-1" key="container" style={{
						width: props.attributes.columnWidth	+ '%'
					}}>
						<InnerBlocks layouts={ getColumnLayouts( props.attributes.columns ) }/>
					</div>
					<div class="col-2" key="container" style={{
						flex: 1,	
					}}>
						<InnerBlocks layouts={ getColumnLayouts( props.attributes.columns ) }/>
					</div>
				</div>
			</div>
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		const colOrder = props.attributes.textFirstAlignment
			? "row-reverse"
			: "row";
		return (
			<div className={props.className}>
				<div className="flex row" style={{ flexDirection: colOrder }}>
					<div className="col-1" style={{
						width: props.attributes.columnWidth	+ '%'
					}}>
						<InnerBlocks.Content />
					</div>
					<div className="col-2" style={{
						flex: 1,	
					}}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	}
});
