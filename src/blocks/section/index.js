/**
 * BLOCK: Section
 *
 * Wrap another block in a section
 */
import classnames from "classnames";
import icons from "../icons";
import Inspector from './inspector';

/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockDescription,
	BlockAlignmentToolbar
} = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE
const {
	TextControl,
	Dashicon
} = wp.components;
const validAlignments = ["wide", "full"];
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
registerBlockType("cgb/block-section", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Section"), // Block title.
	icon: "editor-table", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("team"), __("Section")],
	attributes: {
		verticalPadding: {
			type: "number",
			default: 1
		},
		topMargin: {
			type: "number",
			default: 0
		},
		bottomMargin: {
			type: "number",
			default: 1
		},
		sectionBackgroundColor: {
			type: "string",
			default: "transparent"
		},
		alignment: {
			type: "string"
		},
		id: {
			type: "string"
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const onChangePadding = value => {
			props.setAttributes({ verticalPadding: value });
		};

		const onChangeMarginTop = value => {
			props.setAttributes({ topMargin: value });
		};

		const onChangeMarginBottom = value => {
			props.setAttributes({ bottomMargin: value });
		};

		const onChangeSectionBackgroundColor = value => {
			props.setAttributes({ sectionBackgroundColor: value });
		};

		const updateAlignment = nextAlign => {
			props.setAttributes({
				alignment: nextAlign
			});
		};

		const onChangeSectionID = value => {
			props.setAttributes({
				id: value
			})
		};

		return [
			!!props.focus && (
				<Inspector
				  { ...{ 
					  onChangePadding, 
					  onChangeMarginTop, 
					  onChangeMarginBottom, 
					  onChangeSectionBackgroundColor, 
					  onChangeSectionID,
					...props } }
				/>
			),
			!!props.focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={props.attributes.alignment}
						onChange={updateAlignment}
						controls={["full"]}
					/>
				</BlockControls>
			),
			<div
				className="transition-all"
				style={{
					backgroundColor: props.attributes.sectionBackgroundColor,
					paddingTop: props.attributes.verticalPadding + "rem",
					paddingBottom: props.attributes.verticalPadding + "rem",
					marginTop: props.attributes.topMargin + "rem",
					marginBottom: props.attributes.bottomMargin + "rem"
				}}
			>
				<div>
					<InnerBlocks />
				</div>
			</div>
		];
	},

	getEditWrapperProps(attributes) {
		const { alignment } = attributes;

		if (-1 !== validAlignments.indexOf(alignment)) {
			return { "data-align": alignment };
		}
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		const classes = classnames(
			"transition-all",
			props.attributes.alignment ? `align${props.attributes.alignment}` : null
		);

		const innerClasses = classnames(
			props.attributes.alignment == "full" ? "container container-bd" : null
		);

		return (
			<div
				id={props.attributes.id}
				className={classes}
				style={{
					backgroundColor: props.attributes.sectionBackgroundColor,
					paddingTop: props.attributes.verticalPadding + "rem",
					paddingBottom: props.attributes.verticalPadding + "rem",
					marginTop: props.attributes.topMargin + "rem",
					marginBottom: props.attributes.bottomMargin + "rem"
				}}
			>
				<div className={innerClasses}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});
