import config from "../config"

const common = {
  path: {
    resolve: (api) => config.BASE_PATH + api,
  },
}

export default common
