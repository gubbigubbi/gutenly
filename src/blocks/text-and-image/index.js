/**
 * BLOCK: Text and Image
 *
 * A simple layout block to show and image and some text side by side
 */
import icons from "../icons";
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	Editable,
	MediaUpload,
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
registerBlockType("cgb/block-text-and-image", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Text & Image", "CGB"), // Block title.
	icon: "image-flip-horizontal", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("text-and-image — CGB Block"), __("Text and Image")],
	attributes: {
		message: {
			type: "array",
			source: "children",
			selector: ".message-body"
		},
		imgURL: {
			type: "string",
			source: "attribute",
			attribute: "src",
			selector: "img"
		},
		imgID: {
			type: "number"
		},
		imgAlt: {
			type: "string",
			source: "attribute",
			attribute: "alt",
			selector: "img"
		},
		textFirstAlignment: {
			type: "boolean",
			default: false
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const onChangeMessage = value => {
			props.setAttributes({ message: value });
		};
		const onSelectImage = img => {
			props.setAttributes({
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt
			});
		};
		const onRemoveImage = () => {
			props.setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null
			});
		};
		const toggleTextFirstAlignment = () => {
			props.setAttributes({
				textFirstAlignment: !props.attributes.textFirstAlignment
			});
		};
		return (
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
					<div className="col-6 message-body">
						<InnerBlocks />
					</div>
					<div className="col-6">
						{!props.attributes.imgID ? (
							<MediaUpload
								onSelect={onSelectImage}
								type="image"
								value={props.attributes.imgID}
								render={({ open }) => (
									<Button
										className="components-button button button-large"
										onClick={open}
									>
										Open Media Library
									</Button>
								)}
							/>
						) : (
							<div className="position-relative">
								<img
									src={props.attributes.imgURL}
									alt={props.attributes.imgAlt}
								/>
								{props.focus ? (
									<Button className="remove-image" onClick={onRemoveImage}>
										{icons.remove}
									</Button>
								) : null}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		const colOrder = props.attributes.textFirstAlignment
			? "row-reverse"
			: "row";
		return (
			<div className={props.className}>
				<div className="flex row" style={{ flexDirection: colOrder }}>
					<div className="col-6 message-body">
						<InnerBlocks.Content />
					</div>
					<div className="col-6">
						<img src={props.attributes.imgURL} alt={props.attributes.imgAlt} />
					</div>
				</div>
			</div>
		);
	}
});
