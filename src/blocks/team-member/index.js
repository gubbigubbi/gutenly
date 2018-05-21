/**
 * BLOCK: Team Member
 *
 * A simple block to feature a team member
 */
import icons from '../icons';
/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE
const { RichText, MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, PanelRow, TextControl } = wp.components;
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
registerBlockType('cgb/block-team-member', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Team Member'), // Block title.
	icon: 'nametag', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__('team'), __('Team Member')],
	attributes: {
		title: {
			type: 'string',
			source: 'children',
			selector: 'h3',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.team-member__description',
		},
		email: {
			type: 'string',
			default: 'test@test.com',
		},
		phone: {
			type: 'string',
			default: '0400 000 000',
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		textFirstAlignment: {
			type: 'boolean',
			default: false,
		},
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const {
			attributes: { title, email, phone, description, imgID, imgURL, imgAlt },
			setAttributes,
			className,
			isSelected,
		} = props;

		const onChangeTitle = value => {
			setAttributes({ title: value });
		};

		const onChangeEmail = value => {
			setAttributes({ email: value });
		};

		const onChangePhone = value => {
			setAttributes({ phone: value });
		};

		const onChangeDescription = value => {
			setAttributes({ description: value });
		};

		const onSelectImage = img => {
			// fetch the thumb details
			const image = new wp.api.models.Media({ id: img.id })
				.fetch()
				.done(res => {
					const thumb = res.media_details.sizes['thumbnail'];
					setAttributes({
						imgID: img.id,
						imgURL: thumb.source_url,
						imgAlt: img.alt,
					});
				});
		};
		const onRemoveImage = () => {
			setAttributes({
				imgID: null,
				imgURL: null,
				imgAlt: null,
			});
		};

		return [
			<div key="first">
				<InspectorControls key="inspector">
					<PanelBody title={__('Contact Details')}>
						<PanelRow>
							<TextControl
								label={__('Email address')}
								value={email}
								onChange={onChangeEmail}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__('Phone number')}
								value={phone}
								onChange={onChangePhone}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div className={className}>
					<div className="team-member__img">
						{!imgID ? (
							<MediaUpload
								onSelect={onSelectImage}
								type="image"
								value={imgID}
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
								<img className="image--circle" src={imgURL} alt={imgAlt} />
								{isSelected ? (
									<Button className="remove-image" onClick={onRemoveImage}>
										{icons.remove}
									</Button>
								) : null}
							</div>
						)}
					</div>
					<div className="team-member__content">
						<RichText
							tagName="h3"
							placeholder={__('Add a title for the team member')}
							onChange={onChangeTitle}
							value={title}
						/>

						<div className="team-member__description">
							<RichText
								tagName="div"
								multiline="p"
								placeholder={__('Add a description for the team member')}
								onChange={onChangeDescription}
							/>
							<div class="row">
								<div class="col-12 team-member__email">{email}</div>
								<div class="col-12 team-member__phone">{phone}</div>
							</div>
						</div>
					</div>
				</div>
			</div>,
		];
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		return (
			<div className={props.className}>
				<div className="team-member__img">
					<div>
						<img
							className="image--circle"
							src={props.attributes.imgURL}
							alt={props.attributes.imgAlt}
						/>
					</div>
				</div>
				<div className="team-member__content">
					<h3 className="team-member__title">{props.attributes.title}</h3>
					<div className="team-member__description">
						{props.attributes.description}
					</div>
					<div class="row">
						<div class="col-xs-12 col-md-6 team-member__email">
							<a
								className="ga-trigger"
								href={'mailto:' + props.attributes.email}
							>
								<i class="icon icon-left fw ion-ios-email-outline" />
								Email
							</a>
						</div>
						<div class="col-xs-12 col-md-6 team-member__phone">
							<a className="ga-trigger" href={'tel:' + props.attributes.email}>
								<i class="icon icon-left fw ion-ios-telephone-outline" />
								Call
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
