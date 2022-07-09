import { AppActionType } from '../types'

export const AppState = {
  collapsed: false
}

export default (state = AppState, action: { type: AppActionType }) => {
  switch (action.type) {
    case AppActionType.CHANGE:
      return {
        ...state,
        collapsed: !state.collapsed
      }
    default:
      return state
  }
}
