/**
 * BLOCK: Features
 *
 * A simple block to show some features
 */
import icons from "../icons";

import { times } from "lodash";
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, Editable, MediaUpload, BlockControls } = wp.blocks;
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
registerBlockType("cgb/block-features-list", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Features", "CGB"), // Block title.
	icon: "heart", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("features"), __("Features")],
	attributes: {
		content: {
			type: "array",
			source: "query",
			selector: ".feature-text",
			query: {
				children: {
					source: "children"
				}
			},
			default: [[], [], [], []]
		},
		columns: {
			type: "number",
			default: 4
		}
	},

	// The "edit" property must be a valid function.
	edit({ attributes, setAttributes, className, focus, setFocus }) {
		const { content, columns } = attributes;

		return (
			<div className={className}>
				<div className="row flex">
					{times(columns, index => (
						<div className="col-3" key={index}>
							<Editable
								tagName="div"
								multiline="p"
								value={content && content[index] && content[index].children}
								onChange={nextContent => {
									setAttributes({
										content: [
											...content.slice(0, index),
											{ children: nextContent },
											...content.slice(index + 1)
										]
									});
								}}
								focus={focus && focus.column === index}
								onFocus={() => setFocus({ column: index })}
								placeholder={__("New Feature")}
							/>
						</div>
					))}
				</div>

				<p>preview</p>
				<div className="row flex">
					{times(columns, index => (
						<div className="wp-block-column col-3" key={`column-${index}`}>
							<div>{content[index].children}</div>
						</div>
					))}
				</div>
			</div>
		);
	},

	// The "save" property must be specified and must be a valid function.
	save({ attributes, className }) {
		const { content, columns } = attributes;
		return (
			<div className={className}>
				<div className="row flex">
					{times(columns, index => (
						<div className="wp-block-column col-3" key={`column-${index}`}>
							<div className="feature-text">{content[index].children}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
});
