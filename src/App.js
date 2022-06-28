import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NewHome from "./pages/NewHome"
import NewCreateEditPost from "./pages/NewCreateEditPost"
import Login from "./pages/Login"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import config from "./config"

const queryClient = new QueryClient()

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path={config.BASE_PATH}
            element={<NewHome isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path={config.BASE_PATH + "/createpost"}
            element={<NewCreateEditPost isAuth={isAuth} />}
          />
          <Route
            path={config.BASE_PATH + "/editpost"}
            element={<NewCreateEditPost isAuth={isAuth} />}
          >
            <Route
              path=":postId"
              element={<NewCreateEditPost isAuth={isAuth} />}
            ></Route>
          </Route>
          <Route
            path={config.BASE_PATH + "/login"}
            element={<Login setIsAuth={setIsAuth} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
