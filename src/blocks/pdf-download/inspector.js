/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
	MediaUpload,
	UrlInput,
} = wp.blocks;
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
} = wp.components;

import icons from '../icons';

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const { attributes: { url }, onChangeUrl } = this.props;
		return (
			
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'PDF Options' ) }>
					<PanelRow>

						<UrlInput
							className="url"
							value={ url }
							onChange={ onChangeUrl }
						/>

	{ /* {!this.props.attributes.imgID ? (
                        <MediaUpload
                            onSelect={this.props.onSelectImage}
                            type="image"
                            value={this.props.attributes.imgID}
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
						<div class="position-relative">
							<img
								class="center-block"
								src={this.props.attributes.imgURL}
								alt={this.props.attributes.imgAlt}
							/>
							{this.props.focus ? (
								<Button className="remove-image" onClick={this.props.onRemoveImage}>
									{icons.remove}
								</Button>
							) : null}
						</div>
					)} */ }

					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
