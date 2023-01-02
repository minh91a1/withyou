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

export const tools = {
  getMonth: function (d) {
    return ("0" + (d.getMonth() + 1)).slice(-2)
  },
  shortDate: function (d) {
    return (
      ("0" + d.getDate()).slice(-2) +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      d.getFullYear()
    )
  },
  fullDate: function (d) {
    return (
      ("0" + d.getDate()).slice(-2) +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      d.getFullYear() +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2)
    )
  },
}

export default common
