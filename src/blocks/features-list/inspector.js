/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
} = wp.blocks;
const {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const { attributes: { link, buttonText, circularImg }, onChangeLink, onChangeButtonText, onChangeImgType } = this.props;
		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Link Options' ) }>
					<PanelRow>
						<TextControl
							label={ __( 'Link URL' ) }
							value={ link }
							onChange={ onChangeLink }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __( 'Link Text' ) }
							value={ buttonText }
							onChange={ onChangeButtonText }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={ __('Image Options') }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Circular Image' ) }
							checked={ !!circularImg }
							onChange={ onChangeImgType }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
