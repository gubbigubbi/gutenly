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
  TextControl
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
            <PanelBody title={__("Link Options")}>
                <PanelRow>
                    <TextControl
                        label={__("Link URL")}
                        value={this.props.attributes.link}
                        onChange={this.props.onChangeLink}
                    />
                </PanelRow>
                <PanelRow>
                    <TextControl
                        label={__("Link Text")}
                        value={this.props.attributes.buttonText}
                        onChange={this.onChangeButtonText}
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
  }

}