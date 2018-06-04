/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
import classnames from 'classnames';
/**
 * Create an Inspector Controls wrapper Component
 */
export default class ListBlockOutput extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			attributes: {
				blockAlignment,
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

		return (
			<div
				style={ {
					color: textColor,
				} }
			>
				<div className="featured__image-wrapper">
					<img className="image--circle" src={ imgURL } alt={ imgAlt } />
				</div>

				<div className="feature__content">
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
		);
	}
}
