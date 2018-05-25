/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { MediaUpload, RichText, InnerBlocks } = wp.editor;
const { Button } = wp.components;
import classnames from 'classnames';
import icons from '../../icons';
/**
 * Create an Inspector Controls wrapper Component
 */
export default class FeatureBlock extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	hexToRgbA( color = '#fff' ) {
		const hex = color.replace( '#', '' );
		const r = parseInt( hex.substring( 0, 2 ), 16 );
		const g = parseInt( hex.substring( 2, 4 ), 16 );
		const b = parseInt( hex.substring( 4, 6 ), 16 );

		const result =
			'rgba(' +
			r +
			',' +
			g +
			',' +
			b +
			',' +
			this.props.attributes.imgDimness / 100 +
			')';
		return result;
	}

	render() {
		const {
			attributes: {
				imgID,
				imgURL,
				imgAlt,
				title,
				description,
				showButton,
				link,
				buttonText,
				textColor,
				backgroundColor,
			},
			onSelectImage,
			onRemoveImage,
			onChangeTitle,
			onChangeDescription,
			isSelected,
		} = this.props;

		const contentClass = classnames(
			'feature__content',
			imgID ? 'has-image' : null
		);

		return (
			<div className="position-relative overflow-hidden">
				<figure className="image-wrapper position-relative">
					{ ! imgID ? (
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ imgID }
							render={ ( { open } ) => (
								<Button
									className="components-button button button-large"
									onClick={ open }
								>
									Open Media Library
								</Button>
							) }
						/>
					) : (
						<div className="position-relative">
							<img src={ imgURL } alt={ imgAlt } />
							{ isSelected ? (
								<Button className="remove-image" onClick={ onRemoveImage }>
									{ icons.remove }
								</Button>
							) : null }
						</div>
					) }
				</figure>

				<div
					className={ contentClass }
					style={ {
						color: textColor,
						backgroundColor:
							backgroundColor !== 'transparent' ?
								this.hexToRgbA( backgroundColor ) :
								'transparent',
					} }
				>
					<RichText
						tagName="h3"
						placeholder={ __( 'Feature title' ) }
						onChange={ onChangeTitle }
						value={ title }
					/>

					<div className="feature__description">
						<RichText
							tagName="div"
							multiline="p"
							placeholder={ __( 'Feature description' ) }
							onChange={ onChangeDescription }
							value={ description }
						/>
						<InnerBlocks />
						{ showButton ? (
							<a href={ link } className="button w100 button--primary">
								{ buttonText }
							</a>
						) : null }
					</div>
				</div>
			</div>
		);
	}
}
