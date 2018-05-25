/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, ColorPalette } = wp.editor;
const {
	PanelBody,
	PanelRow,
	PanelColor,
	TextControl,
	ToggleControl,
	RangeControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				link,
				buttonText,
				circularImg,
				showButton,
				type,
				textColor,
				backgroundColor,
				imgDimness,
			},
			onChangeLink,
			onChangeButtonText,
			onChangeImgType,
			onToggleButton,
			onChangeBackgroundColor,
			onChangeTextColor,
			onChangeImgDimness,
		} = this.props;
		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Button Options' ) }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Button?' ) }
							checked={ !! showButton }
							onChange={ onToggleButton }
						/>
					</PanelRow>

					{ showButton ? (
						<div>
							<PanelRow key="url">
								<TextControl
									label={ __( 'Button URL' ) }
									value={ link }
									onChange={ onChangeLink }
								/>
							</PanelRow>
							<PanelRow key="text">
								<TextControl
									label={ __( 'Button Text' ) }
									value={ buttonText }
									onChange={ onChangeButtonText }
								/>
							</PanelRow>
						</div>
					) : null }
				</PanelBody>

				{ type === 'list' ? (
					<PanelBody title={ __( 'Image Options' ) }>
						<PanelRow>
							<ToggleControl
								label={ __( 'Circular Image' ) }
								checked={ !! circularImg }
								onChange={ onChangeImgType }
							/>
						</PanelRow>
					</PanelBody>
				) : (
					<PanelBody title={ __( 'Image Dimness' ) }>
						<PanelRow>
							<RangeControl
								value={ imgDimness }
								onChange={ onChangeImgDimness }
								min={ 0 }
								max={ 100 }
								step={ 10 }
								allowReset="true"
							/>
						</PanelRow>
					</PanelBody>
				) }

				<PanelColor title={ __( 'Text Color' ) } colorValue={ textColor }>
					<ColorPalette value={ textColor } onChange={ onChangeTextColor } />
				</PanelColor>
				<PanelColor title={ __( 'Background Color' ) } colorValue={ backgroundColor }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ onChangeBackgroundColor }
					/>
				</PanelColor>
			</InspectorControls>
		);
	}
}
