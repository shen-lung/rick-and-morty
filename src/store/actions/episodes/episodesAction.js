import { getEpisodes }  from '../../../api/ApiService'

export const GET_EPISODES = 'GET_EPISODES'

const addEpisodes = (payload) => ({
	type: GET_EPISODES,
	payload,
})

const getEpisodesCall = (dispatch, nextLink = '') => {
    getEpisodes(nextLink).then(res => {

        dispatch(addEpisodes(res))

        if (res.info.next) {
            getEpisodesCall(dispatch, res.info.next)
        } else {
            return
        }
    })
}

export const getEpisodesList = () => async (dispatch) => {
	try {
		return getEpisodesCall(dispatch)
	} catch (err) {
		console.log('getEpisodesList =>',err)
	}
}
