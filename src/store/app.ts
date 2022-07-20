import { observable, action, makeObservable } from 'mobx'

class App {
  constructor () {
    makeObservable(this, {
      collapsed: observable,
      changeCollapsed: action.bound
    })
  }

  collapsed = false

  changeCollapsed () {
    this.collapsed = !this.collapsed
  }
}

export default new App()
