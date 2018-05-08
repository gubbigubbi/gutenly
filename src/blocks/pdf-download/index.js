/**
 * BLOCK: PDF Download
 *
 * A simple block to show a pdf download link
 */
import icons from "../icons";
import Inspector from './inspector';
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	RichText,
	BlockControls,
} = wp.blocks;
const {
	Button,
	Toolbar,
	Tooltip,
	Dashicon,
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
registerBlockType("cgb/block-pdf-download", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("PDF Download"), // Block title.
	icon: "nametag", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("pdf"), __("PDF Download")],
	attributes: {
		title: {
			type: "string",
			source: "children",
			selector: "h3"
		},
		description: {
			type: "array",
			source: "children",
			selector: ".pdf-download__description"
		},
		// imgURL: {
		// 	type: "string",
		// },
		// imgID: {
		// 	type: "number",
		// },
		// imgAlt: {
		// 	type: "string",
        // },
        url: {
            type: "string"
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
        
        const onChangeUrl = value => {
            props.setAttributes({ url: value })
        }

		// const onSelectImage = img => {
        //     props.setAttributes({
        //         imgID: img.id,
        //         imgURL: img.url,
        //         imgAlt: img.alt,
        //     });
		// };
		// const onRemoveImage = () => {
		// 	props.setAttributes({
		// 		imgID: null,
		// 		imgURL: null,
		// 		imgAlt: null
		// 	});
        // };

		return [
			<div>
				<Inspector
					{ ...{ onChangeUrl, ...props } }
				/>
			
				<div className={props.className}>
					<div className="pdf-download__content">
						<RichText
							tagName="h3"
							placeholder={__("Add a title for the download")}
							onChange={onChangeTitle}
							value={attributes.title}
							focus={focusedEditable === "title"}
							onFocus={onFocusTitle}
						/>

						<div className="pdf-download__description">
							<RichText
								tagName="div"
								multiline="p"
								placeholder={__("Add a description for the pdf")}
								onChange={onChangeDescription}
								value={attributes.description}
								focus={focusedEditable === "description"}
								onFocus={onFocusDescription}
							/>
						</div>
					</div>
				</div>
			</div>
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		return (
			<a href={props.attributes.url} target="_blank" className={props.className}>
				<div className="pdf-download__content">
					<h3 className="pdf-download__title">{props.attributes.title}</h3>
					<div className="pdf-download__description">
						{props.attributes.description}
					</div>
				</div>
			</a>
		);
	}
});
