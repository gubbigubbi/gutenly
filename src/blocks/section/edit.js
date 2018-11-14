const { Component } = wp.element;
import classnames from 'classnames';
import ResizableBox from 're-resizable';

const {
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	ColorPalette,
} = wp.editor;

const { PanelBody, TextControl, RangeControl } = wp.components;

const { __ } = wp.i18n;

export default class SectionEdit extends Component {
	render() {
		const onChangeVerticalPadding = value => {
			this.props.setAttributes( { verticalPadding: value } );
		};

		const onChangeHorizontalPadding = value => {
			this.props.setAttributes( { horizontalPadding: value } );
		};

		const onChangeMarginTop = value => {
			this.props.setAttributes( { topMargin: value } );
		};

		const onChangeMarginBottom = value => {
			this.props.setAttributes( { bottomMargin: value } );
		};

		const onChangeSectionID = value => {
			this.props.setAttributes( { id: value } );
		};

		const updateAlignment = nextAlign => {
			this.props.setAttributes( {
				alignment: nextAlign,
			} );
		};

		const onChangeMaxWidth = maxWidth => {
			this.props.setAttributes( { maxWidth } );
		};

		const classes = classnames( 'transition-all', this.props.className );

		const {
			attributes: {
				alignment,
				sectionBackgroundColor,
				verticalPadding,
				horizontalPadding,
				topMargin,
				bottomMargin,
				maxWidth,
				id,
			},
			setAttributes,
			toggleSelection,
		} = this.props;

		return (
			<div className={ classes }>
				<InspectorControls key="inspector">
					<PanelBody title={ __( 'Section Spacings' ) }>
						<TextControl
							label={ __( 'Vertical padding (rem)' ) }
							value={ verticalPadding }
							onChange={ onChangeVerticalPadding }
						/>
						<TextControl
							label={ __( 'Horizontal padding (rem)' ) }
							value={ horizontalPadding }
							onChange={ onChangeHorizontalPadding }
							name="horizontalPadding"
						/>

						<TextControl
							label={ __( 'Top Margin (rem)' ) }
							value={ topMargin }
							onChange={ onChangeMarginTop }
						/>
						<TextControl
							label={ __( 'Bottom Margin (rem)' ) }
							value={ bottomMargin }
							onChange={ onChangeMarginBottom }
						/>

						<RangeControl
							label={ __( 'Content Width (%)' ) }
							value={ maxWidth }
							min={ 15 }
							max={ 100 }
							onChange={ onChangeMaxWidth }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Section Colors' ) }>
						<ColorPalette
							value={ sectionBackgroundColor }
							onChange={ sectionBackgroundColor =>
								setAttributes( { sectionBackgroundColor } )
							}
						/>
					</PanelBody>

					<PanelBody title={ __( 'Other Settings' ) }>
						<TextControl
							label={ __( 'Section ID' ) }
							value={ id }
							onChange={ onChangeSectionID }
						/>
					</PanelBody>
				</InspectorControls>

				<BlockControls>
					<BlockAlignmentToolbar
						value={ alignment }
						onChange={ updateAlignment }
						controls={ [ 'wide', 'full' ] }
					/>
				</BlockControls>

				<div
					className={ classes }
					style={ {
						backgroundColor: sectionBackgroundColor,
						paddingTop: verticalPadding + 'rem',
						paddingBottom: verticalPadding + 'rem',
						paddingLeft: horizontalPadding + 'rem',
						paddingRight: horizontalPadding + 'rem',
						marginTop: topMargin + 'rem',
						marginBottom: bottomMargin + 'rem',
					} }
				>
					<ResizableBox
						size={ { width: maxWidth + '%' } }
						minWidth="15%"
						enable={ {
							top: false,
							right: true,
							bottom: false,
							left: true,
							topRight: false,
							bottomRight: false,
							bottomLeft: false,
							topLeft: false,
						} }
						handleClasses={ {
							left: 'section-block__resize-handler-left',
							right: 'section-block__resize-handler-right',
						} }
						onResizeStop={ ( event, direction, elt ) => {
							setAttributes( {
								maxWidth: Math.round(
									parseInt( elt.style.width.replace( '%', '' ) )
								),
							} );

							toggleSelection( true );
						} }
						onResizeStart={ () => {
							toggleSelection( false );
						} }
					>
						<InnerBlocks />
					</ResizableBox>
				</div>
			</div>
		);
	}
}
