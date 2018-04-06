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
	RangeControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const { attributes: { columnWidth }, onChangeColumnWidth } = this.props;

		return (
			<InspectorControls>
				<PanelBody
					title={ __( 'Column Width (%)' ) }
				>
					<PanelRow>

						<RangeControl
							value={ columnWidth }
							onChange={ onChangeColumnWidth }
							min={ 10 }
							max={ 90 }
							step={ 10 }
							allowReset="true"
						/>

					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
