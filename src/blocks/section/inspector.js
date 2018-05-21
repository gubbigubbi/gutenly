/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { ColorPalette } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, PanelColor, TextControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: { verticalPadding, horizontalPadding },
			onChangeHorizontalPadding,
			onChangeVerticalPadding,
		} = this.props;
		return (
			<InspectorControls key="inspector">
				<PanelBody title={__('Section Spacings')}>
					<PanelRow>
						<TextControl
							label={__('Vertical padding (rem)')}
							value={verticalPadding}
							onChange={onChangeVerticalPadding}
						/>
						<TextControl
							label={__('Horizontal padding (rem)')}
							value={horizontalPadding}
							onChange={onChangeHorizontalPadding}
							name="horizontalPadding"
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Top Margin (rem)')}
							value={this.props.attributes.topMargin}
							onChange={this.props.onChangeMarginTop}
						/>
						<TextControl
							label={__('Bottom Margin (rem)')}
							value={this.props.attributes.bottomMargin}
							onChange={this.props.onChangeMarginBottom}
						/>
					</PanelRow>

					<PanelColor
						title={__('Section Background Color')}
						colorValue={this.props.attributes.sectionBackgroundColor}
					>
						<ColorPalette
							value={this.props.attributes.sectionBackgroundColor}
							onChange={this.props.onChangeSectionBackgroundColor}
						/>
					</PanelColor>

					<PanelRow>
						<TextControl
							label={__('Section ID')}
							value={this.props.attributes.id}
							onChange={this.props.onChangeSectionID}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
