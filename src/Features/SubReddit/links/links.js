

export const subRedditLinks = () => {
	const URL = 'https://www.reddit.com/r/';
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
						url: `/popular`,
					},
					{
						title: 'React',
						id: 1,
						url: `/React`,
					},
					{
						title: 'Javascript',
						id: 2,
						url: `/Javascript`,
					},
					{
						title: 'Norge',
						id: 3,
						url: `/Norge`,
					},
					{
						title: 'Warhammer40k',
						id: 4,
						url: `/Warhammer40k`,
					},
					{
						title: 'SmartThings',
						id: 5,
						url: `/SmartThings`,
					},
					{
						title: 'Minipainting',
						id: 6,
						url: `/Minipainting`,
					},
					{
						title: 'SWGOH',
						id: 7,
						url: `/SWGOH`,
					},
					{
						title: 'space',
						id: 8,
						url: `/space`,
					},
					{
						title: 'ProgrammerHumor',
						id: 9,
						url: `${URL}ProgrammerHumor`,
					},
					
				]);
			}
		}, 100);
	});
};
