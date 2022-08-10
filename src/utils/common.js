import config from "../config"

const common = {
  path: {
    resolve: (api) => config.BASE_PATH + api,
  },

  tempStorage: {
    save(id, data) {
      localStorage.setItem("temp_" + id, data)
    },
    load(id) {
      return localStorage.getItem("temp_" + id)
    },
    clear(id) {
      localStorage.setItem("temp_" + id, "")
    },
  },
}

export default common
