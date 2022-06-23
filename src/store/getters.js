const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  setList: state => state.task.taskSetList,
  mail: state => state.user.mail
}
export default getters
