/**
 * BLOCK: Features
 *
 * A simple block to show a feature
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
	RichText,
	MediaUpload,
	BlockControls,
	InnerBlocks,
	BlockAlignmentToolbar
} = wp.blocks; 
const {
	Button,
	Toolbar,
	Tooltip,
	Dashicon
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
	title: __("Feature"), // Block title.
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
		circularImg: {
			type: "boolean",
			default: "false",
		},
		link: {
			type: "string",
			default: "/contact"
		},
		buttonText: {
			type: "string",
			default: "Find out more"
		},
		blockAlignment: {
			type: 'string',
			default: 'center'
		},
	},

	getEditWrapperProps( attributes ) {
		const { blockAlignment } = attributes;
		if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
			return { 'data-align': blockAlignment }
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const { attributes: { blockAlignment, imgURL, imgAlt, buttonText, link, circularImg }, className } = props;
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

		const onChangeLink = value => {
			props.setAttributes({ link: value });
		};

		const onChangeButtonText = value => {
			props.setAttributes({ buttonText: value });
		};

		const updateAlignment = nextAlign => {
			props.setAttributes({
				blockAlignment: nextAlign
			});
		};

		const onChangeImgType = value => {
			props.setAttributes({ circularImg: value });
		};

		const imgClasses = classnames(
			'center-block',
			circularImg ? `image--circle` : null
		);

		return [
			!!props.focus && (
				<Inspector
					{ ...{ 
						onChangeLink, 
						onChangeButtonText, 
						onChangeImgType,
					...props } }
				/>
			),
			!!props.focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ blockAlignment }
						onChange={ updateAlignment }
						controls={["left", "right", "center"]}
					/>
				</BlockControls>
			),
			<div className={className}
			style={ { textAlign: blockAlignment } }>
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
								class={imgClasses}
								src={imgURL}
								alt={imgAlt}
							/>
							{props.focus ? (
								<Button className="remove-image" onClick={ onRemoveImage }>
									{icons.remove}
								</Button>
							) : null}
						</div>
					)}
				</div>
				<div className="feature__content">
					<RichText
						tagName="h3"
						placeholder={__("Feature title")}
						onChange={onChangeTitle}
						value={attributes.title}
						focus={focusedEditable === "title"}
						onFocus={onFocusTitle}
					/>

					<div className="feature__description">
						<RichText
							tagName="div"
							multiline="p"
							placeholder={__("Feature description")}
							onChange={onChangeDescription}
							value={attributes.description}
							focus={focusedEditable === "description"}
							onFocus={onFocusDescription}
						/>
						<InnerBlocks />
						<a href={ link } class="button w100 button--primary">
							{ buttonText }
						</a>
					</div>
				</div>
			</div>
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {

		const { attributes: { blockAlignment, imgURL, imgAlt, title, description, buttonText, link }, classNames } = props;

		const classes = classnames(
			classNames,
			blockAlignment ? `flex--align${blockAlignment}` : null
		);

		return (
			<div className={ classes }
			style = { { textAlign: blockAlignment } }>
				<div className="featured__image-wrapper">
					<img
						class="image--circle"
						src={ imgURL }
						alt={ imgAlt }
					/>
				</div>

				<div className="feature__content">
					<h3 className="feature__title">{ title }</h3>
					<div className="feature__description">
						{ description }
					</div>
					<InnerBlocks.Content />
					<a href={ link } class="button button--primary">
						{ buttonText }
					</a>
				</div>
			</div>
		);
	}
});
