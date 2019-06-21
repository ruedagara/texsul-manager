//Importar el API
import {getInitialSmallStats} from '../api/firebase'

export  const getSmallStats = () => async (dispatch) => {
    const smallStats = await getInitialSmallStats()
    console.log("GET SMALL STATS",smallStats)
    dispatch({
        type: 'get_small_stats',
        payload: smallStats
    })
}