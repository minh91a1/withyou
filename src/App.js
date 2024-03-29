import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RealHome from "./pages/RealHome"
import Login from "./pages/Login"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import config from "./config"
import Diary from "./pages/Diary"
import DiaryDetail from "./pages/DiaryDetail"
import CreateEditDiary from "./pages/CreateEditDiary"
import Quotes from "./pages/Quotes"

const queryClient = new QueryClient()

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/withyou">
        <Routes>
          <Route
            path={config.BASE_PATH}
            element={<RealHome isAuth={isAuth} setIsAuth={setIsAuth} />}
          />
          <Route
            path={config.BASE_PATH + "/quotes"}
            element={<Quotes isAuth={isAuth} setIsAuth={setIsAuth} />}
          ></Route>
          <Route
            path={config.BASE_PATH + "/diary"}
            element={<Diary isAuth={isAuth} setIsAuth={setIsAuth} />}
          ></Route>
          <Route
            path={config.BASE_PATH + "/diary/create"}
            element={<CreateEditDiary isAuth={isAuth} setIsAuth={setIsAuth} />}
          ></Route>
          <Route
            path={config.BASE_PATH + "/diary/edit/:postId"}
            element={<CreateEditDiary isAuth={isAuth} setIsAuth={setIsAuth} />}
          ></Route>
          <Route
            path={config.BASE_PATH + "/diary/:postId"}
            element={<DiaryDetail isAuth={isAuth} setIsAuth={setIsAuth} />}
          ></Route>
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
