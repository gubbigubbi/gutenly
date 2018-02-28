/**
 * BLOCK: Features
 *
 * A simple block to show a feature
 */
import icons from "../icons";
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, InnerBlocks } = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE
const { Heading } = wp.components;
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
registerBlockType("cgb/block-fancy-heading", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("fancy-heading", "CGB"), // Block title.
	icon: "heart", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("Fancy heading")],
	attributes: {
		title: {
			type: "string",
			source: "children",
			selector: "h3"
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		return (
			<div className={props.className}>
				<Heading />
			</div>
		);
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		return <div className={props.className} />;
	}
});
