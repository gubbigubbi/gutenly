/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, TextControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: { link, buttonText, circularImg, showButton },
			onChangeLink,
			onChangeButtonText,
			onChangeImgType,
			onToggleButton,
		} = this.props;
		return (
			<InspectorControls key="inspector">
				<PanelBody title={__('Button Options')}>
					<PanelRow>
						<ToggleControl
							label={__('Show Button?')}
							checked={!!showButton}
							onChange={onToggleButton}
						/>
					</PanelRow>

					{showButton ? (
						<div>
							<PanelRow key="url">
								<TextControl
									label={__('Button URL')}
									value={link}
									onChange={onChangeLink}
								/>
							</PanelRow>
							<PanelRow key="text">
								<TextControl
									label={__('Button Text')}
									value={buttonText}
									onChange={onChangeButtonText}
								/>
							</PanelRow>
						</div>
					) : null}
				</PanelBody>
				<PanelBody title={__('Image Options')}>
					<PanelRow>
						<ToggleControl
							label={__('Circular Image')}
							checked={!!circularImg}
							onChange={onChangeImgType}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
