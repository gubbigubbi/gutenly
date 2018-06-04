/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { MediaUpload, RichText, InnerBlocks } = wp.editor;
const { Button } = wp.components;
import icons from '../../icons';

export default class ListBlock extends Component {
	constructor( props ) {
		super( ...arguments );
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
			},
			imgClasses,
			onSelectImage,
			onRemoveImage,
			onChangeTitle,
			onChangeDescription,
			isSelected,
			children,
		} = this.props;

		return (
			<Fragment>
				<div className="feature__img mb1">
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
						<div className="position--relative">
							<img className={ imgClasses } src={ imgURL } alt={ imgAlt } />
							{ isSelected ? (
								<Button className="remove-image" onClick={ onRemoveImage }>
									{ icons.remove }
								</Button>
							) : null }
						</div>
					) }
				</div>

				<div className="feature__content">
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
						{ children }
						{ showButton ? (
							<a href={ link } className="button w100 button--primary">
								{ buttonText }
							</a>
						) : null }
					</div>
				</div>
			</Fragment>
		);
	}
}
