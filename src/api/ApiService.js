import React from 'react'
import axios from 'axios'

import { EPISODES_API_URL } from './apiConstants'

export const getEpisodes = async (nextLink) => {
    const link = nextLink ? nextLink : EPISODES_API_URL

    return await axios
        .get(link)
        .then(res => {
            return res.data
        })
        .catch(error => console.log('GET EPISODES error =>', error))
}
