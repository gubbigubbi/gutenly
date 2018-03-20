/**
 * BLOCK: Before and After
 *
 * A block to show before and after
 */

/**
 * Block Dependencies
 */
import icons from "../icons";
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	MediaUpload,
	BlockControls,
	InnerBlocks,
} = wp.blocks; 
const {
	Button,
	Toolbar,
	Tooltip,
	Dashicon,
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
registerBlockType("cgb/block-before-and-after", {
	
	title: __("Before & After", "CGB"), // Block title.
	icon: "image-flip-horizontal", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("before-and-after — CGB Block"), __("Before & After")],
	attributes: {
		beforeImgURL: {
			type: "string",
		},
		beforeImgID: {
			type: "number"
		},

		afterImgURL: {
			type: "string",
		},
		afterImgID: {
			type: "number"
		},

	},

	// The "edit" property must be a valid function.
	edit: props => {

		const onSelectBeforeImage = img => {
			props.setAttributes({
				beforeImgID: img.id,
				beforeImgURL: img.url,

			});
		};
		const onRemoveBeforeImage = () => {
			props.setAttributes({
				beforeImgID: null,
				beforeImgURL: null,
	
			});
        };
        
		const onSelectAfterImage = img => {
			props.setAttributes({
				afterImgID: img.id,
				afterImgURL: img.url,

			});
		};
		const onRemoveAfterImage = () => {
			props.setAttributes({
				afterImgID: null,
				afterImgURL: null,

			});
		};

		return [
	
			<div className={props.className}>
                <div className="flex align--centre">
					<div style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center'
						}}>
						{!props.attributes.beforeImgID ? (
							<MediaUpload
								onSelect={onSelectBeforeImage}
								type="image"
								value={props.attributes.beforeImgID}
								render={({ open }) => (
									<Button
										className="components-button button button-large"
										onClick={open}
									>
										Set before image
									</Button>
								)}
							/>
						) : (
							<div className="position-relative">
								<img
									src={props.attributes.beforeImgURL}
								/>
								{props.focus ? (
									<Button className="remove-image" onClick={onRemoveBeforeImage}>
										{icons.remove}
									</Button>
								) : null}
							</div>
						)}
					</div>

					<div style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center'
					}}>
						{!props.attributes.afterImgID ? (
							<MediaUpload
								onSelect={onSelectAfterImage}
								type="image"
								value={props.attributes.afterImgID}
								render={({ open }) => (
									<Button
										className="components-button button button-large"
										onClick={open}
									>
										Set after image
									</Button>
								)}
							/>
						) : (
							<div className="position-relative">
								<img
									src={props.attributes.afterImgURL}
								/>
								{props.focus ? (
									<Button className="remove-image" onClick={onRemoveAfterImage}>
										{icons.remove}
									</Button>
								) : null}
							</div>
						)}
					</div>
                </div>
			</div>
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
	
		return (
			<div className={props.className}>
                <div className="be__container">
                    <div id="be__comparison">
                        <figure className="be__figure" style={{
                          backgroundImage: `url( ${props.attributes.beforeImgURL} )`
                        }}>
                            <div className="be__handle"></div>
                            <div className="be__divisor" style={{
                                backgroundImage: `url( ${props.attributes.afterImgURL} )` 
                            }} ></div>
                        </figure>
                        <input type="range" min="0" max="100" value="50" className="be__slider" />
                    </div>
                </div>
			</div>
		);
	}
});