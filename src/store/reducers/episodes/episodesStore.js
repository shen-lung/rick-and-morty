import { GET_EPISODES } from '../../actions/episodes/episodesAction'

const initialState = {
	episodes: [],
}

export const episodesStore = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case GET_EPISODES:
			return { episodes: [...state.episodes, ...payload.results] }
		default:
			return state
	}
}
