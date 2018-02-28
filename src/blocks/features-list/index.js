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
registerBlockType("cgb/block-feature", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Feature", "CGB"), // Block title.
	icon: "heart", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("feature"), __("Feature List")],
	attributes: {
		title: {
			type: "string",
			source: "children",
			selector: "h3"
		},
		description: {
			type: "array",
			source: "children",
			selector: ".feature__description"
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
		link: {
			type: "string",
			default: "/contact"
		},
		buttonText: {
			type: "string",
			default: "Find out more"
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		// This control which editable will be focused and falls back to the title editable
		const focusedEditable = props.focus
			? props.focus.editable || "title"
			: null;
		const attributes = props.attributes;

		const onChangeTitle = value => {
			props.setAttributes({ title: value });
		};
		const onFocusTitle = focus => {
			props.setFocus(_.extend({}, focus, { editable: "title" }));
		};

		const onChangeDescription = value => {
			props.setAttributes({ description: value });
		};
		const onFocusDescription = focus => {
			props.setFocus(_.extend({}, focus, { editable: "description" }));
		};

		const onSelectImage = img => {
			// fetch the thumb details
			const image = new wp.api.models.Media({ id: img.id })
				.fetch()
				.done(res => {
					const thumb = res.media_details.sizes["square-thumb-small"];
					props.setAttributes({
						imgID: img.id,
						imgURL: thumb.source_url,
						imgAlt: img.alt
					});
				});
		};
		const onRemoveImage = () => {
			props.setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null
			});
		};

		const onChangeLink = value => {
			props.setAttributes({ link: value });
		};

		const onChangeButtonText = value => {
			props.setAttributes({ buttonText: value });
		};

		return [
			!!props.focus && (
				<InspectorControls key="inspector">
					<PanelBody title={__("Link Options")}>
						<PanelRow>
							<TextControl
								label={__("Link URL")}
								value={props.attributes.link}
								onChange={onChangeLink}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__("Link Text")}
								value={props.attributes.buttonText}
								onChange={onChangeButtonText}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
			),
			<div className={props.className}>
				<div className="feature__img mb1">
					{!attributes.imgID ? (
						<MediaUpload
							onSelect={onSelectImage}
							type="image"
							value={attributes.imgID}
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
						<div class="position--relative">
							<img
								class="center-block image--circle"
								src={attributes.imgURL}
								alt={attributes.imgAlt}
							/>
							{props.focus ? (
								<Button className="remove-image" onClick={onRemoveImage}>
									{icons.remove}
								</Button>
							) : null}
						</div>
					)}
				</div>
				<div className="feature__content text-center">
					<Editable
						tagName="h3"
						placeholder={__("Feature title")}
						onChange={onChangeTitle}
						value={attributes.title}
						focus={focusedEditable === "title"}
						onFocus={onFocusTitle}
					/>

					<div className="feature__description">
						<Editable
							tagName="div"
							multiline="p"
							placeholder={__("Feature description")}
							onChange={onChangeDescription}
							value={attributes.description}
							focus={focusedEditable === "description"}
							onFocus={onFocusDescription}
						/>
						<InnerBlocks />
						<a href={props.attributes.link} class="button w100 button--primary">
							{props.attributes.buttonText}
						</a>
					</div>
				</div>
			</div>
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		return (
			<div className={props.className}>
				<img
					class="image--circle center-block"
					src={props.attributes.imgURL}
					alt={props.attributes.imgAlt}
				/>

				<div className="feature__content center-xs">
					<h3 className="feature__title">{props.attributes.title}</h3>
					<div className="feature__description">
						{props.attributes.description}
					</div>
					<InnerBlocks.Content />
					<a href={props.attributes.link} class="button button--primary">
						{props.attributes.buttonText}
					</a>
				</div>
			</div>
		);
	}
});
