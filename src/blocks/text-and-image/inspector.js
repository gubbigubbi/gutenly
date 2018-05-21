/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, RangeControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {
			attributes: { columnWidth, imgExtension },
			onChangeColumnWidth,
			onChangeImgExtension,
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title={__('Column Width (%)')}>
					<PanelRow>
						<RangeControl
							value={columnWidth}
							onChange={onChangeColumnWidth}
							min={10}
							max={90}
							step={10}
							allowReset="true"
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody title={__('Image Options')}>
					<PanelRow>
						<ToggleControl
							label={__('Extend image to edge')}
							checked={imgExtension}
							onChange={onChangeImgExtension}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
