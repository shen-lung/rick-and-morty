export const getEpisodesRowStruct = (episodesData) => {
    return episodesData.map((episode, index) => (
        {
            id: index,
            col1: episode.episode,
            col2: episode.name,
            col3: episode.air_date,
        }
    ))
}
