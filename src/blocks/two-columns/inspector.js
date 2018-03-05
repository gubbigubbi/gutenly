/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
  InspectorControls,
  BlockDescription,
} = wp.blocks;
const {
  Toolbar,
  Button,
  PanelBody,
  PanelRow,
  RangeControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

  constructor( props ) {
    super( ...arguments );
  }

  render() {
    return (
      <InspectorControls key="inspector">

        <BlockDescription>
          <p>{ __( 'Block settings' ) }</p>
        </BlockDescription>

        <PanelBody
          title={ __( 'Column Width (%)' ) }
        >
          <PanelRow>

            <RangeControl
                value={ this.props.attributes.columnWidth }
                onChange={ this.props.onChangeColumnWidth }
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