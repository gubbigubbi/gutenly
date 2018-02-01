/**
 * BLOCK: Team Member
 *
 * A simple block to feature a team member
 */
import icons from "../icons";
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, Editable, MediaUpload, BlockControls } = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE
const { Button, Toolbar, Tooltip, Dashicon } = wp.components;
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
registerBlockType("cgb/block-team-member", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Team Member", "CGB"), // Block title.
	icon: "image-flip-horizontal", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("team"), __("Team Member")],
	attributes: {
		title: {
			type: "string",
			source: "children",
			selector: "h3"
		},
		description: {
			type: "array",
			source: "children",
			selector: ".team-member__description"
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
			const image = new wp.api.models.Media( {id: img.id} ).fetch().done(res => {
				const thumb = res.media_details.sizes['square-thumb-small'];

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

		return <div className={props.className}>
				<div className="team-member__img">
					{!attributes.imgID ? <MediaUpload onSelect={onSelectImage} type="image" value={attributes.imgID} render={({ open }) => <Button className="components-button button button-large" onClick={open}>
									Open Media Library
								</Button>} /> : <div className="position-relative">
							<img className="image--circle" src={attributes.imgURL} alt={attributes.imgAlt} />
							{props.focus ? <Button className="remove-image" onClick={onRemoveImage}>
									{icons.remove}
								</Button> : null}
						</div>}
				</div>
				<div className="team-member__content">
					
						<Editable tagName="h3" placeholder={__("Add a title for the team member")} onChange={onChangeTitle} value={attributes.title} focus={focusedEditable === "title"} onFocus={onFocusTitle} />
				
					<div className="team-member__description">
						<Editable tagName="div" multiline="p" placeholder={__("Add a description for the team member")} onChange={onChangeDescription} value={attributes.description} focus={focusedEditable === "description"} onFocus={onFocusDescription} />
					</div>
				</div>
			</div>;
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		return (
			<div className={props.className}>
				<div className="team-member__img">
					<div>
					<img className="image--circle" src={props.attributes.imgURL} alt={props.attributes.imgAlt} />
					</div>
				</div>
				<div className="team-member__content">
					<h3 className="team-member__title">{props.attributes.title}</h3>
					<div className="team-member__description">
						{props.attributes.description}
					</div>
				</div>
			</div>
		);
	}
});
