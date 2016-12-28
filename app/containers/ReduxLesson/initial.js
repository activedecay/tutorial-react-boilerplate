import { fromJS } from 'immutable'
const initialState = fromJS({ // now the state is more like a database
  byId: {}, // these todos won't be duplicated around the app
  ids: [], // todos are accessed through this array of ids
})
export default initialState
