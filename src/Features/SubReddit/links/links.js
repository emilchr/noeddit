

export const subRedditLinks = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() < 0.00001) {
				// 0.010% chance to reject
				reject(new Error('Failed to load subReddit links'));
			} else {
				resolve([
					{
						title: 'Popular',
						id: 0,
						url: `/`,
					},
					{
						title: 'React',
						id: 1,
						
					},
					{
						title: 'Javascript',
						id: 2,
						
					},
					{
						title: 'Norge',
						id: 3,
						
					},
					{
						title: 'Warhammer40k',
						id: 4,
					
					},
					{
						title: 'SmartThings',
						id: 5,
						
					},
					{
						title: 'Minipainting',
						id: 6,
						
					},
					{
						title: 'SWGOH',
						id: 7,
						
					},
					{
						title: 'space',
						id: 8,
						
					},
					{
						title: 'ProgrammerHumor',
						id: 9,
						
					},
					
				]);
			}
		}, 100);
	});
};
