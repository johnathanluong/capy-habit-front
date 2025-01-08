import React from 'react';
import PathSVG from './PathSVG';
import Capybara1SVG from './Capybara1SVG';
import Capybara2SVG from './Capybara2SVG';
import Capybara3SVG from './Capybara3SVG';

export default function PathWithCapybaras() {
	return (
		<div className='relative w-full h-[500px] bg-blue-100'>
			<PathSVG />
			<Capybara1SVG />
			<Capybara2SVG />
			<Capybara3SVG />
		</div>
	);
}
