import React from 'react';
import './Episode.scss';
import ClampText from 'react-clamp-text';
import { Highlight } from 'react-instantsearch-dom';
export default function Episode({hit}) {
	const {  image, number, link, season, _highlightResult} = hit;
	const {title: {value: title}, plot: {value: plot}} = _highlightResult;
	return (
		<a href={link} target="_blank" rel="noopener noreferrer" className="episode">
			<img src={`/img/${image}`} alt={title} width='33%' height='auto' />
			<div className="episode-content">
				<h3><Highlight attribute="title" hit={hit} /></h3>
				<ClampText className="plot" line={3} showMore={false}><Highlight attribute="plot" hit={hit} /></ClampText>
			</div>
		</a>
	)
}
