/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
import classnames from 'classnames';
/**
 * Create an Inspector Controls wrapper Component
 */
export default class FeatureBlockOutput extends Component {
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
			children,
		} = this.props;

		const contentClass = classnames(
			'feature__content',
			imgID ? 'has-image' : null
		);

		return (
			<Fragment>
				<div className="position-relative overflow-hidden">
					<figure className="image-wrapper position-relative">
						<img src={ imgURL } alt={ imgAlt } />
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
						<h3 className="feature__title">{ title }</h3>
						<div className="feature__description">{ description }</div>

						{ children }
						{ showButton ? (
							<a href={ link } className="button button--primary">
								{ buttonText }
							</a>
						) : null }
					</div>
				</div>

				<h3 className="feature__title">{ title }</h3>
			</Fragment>
		);
	}
}
