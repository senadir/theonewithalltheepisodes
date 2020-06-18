import React from 'react';
import './Episode.scss';
import ClampText from 'react-clamp-text';
export default function Episode({title, image, number, plot, link, season}) {
	console.log(process.env.PUBLIC_URL)
	return (
		<a href={link} target="_blank" rel="noopener noreferrer" className="episode">
			<img src={`/img/${image}`} alt={title} width='33%' height='auto' />
			<div className="episode-content">
				<h3>{title.replace(/the one (where|with) /i, '')}</h3>
				<ClampText className="plot" line={3} showMore={false}>{plot}</ClampText>
			</div>
		</a>
	)
}
