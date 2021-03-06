import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { useAuth } from './utils/authHook'
import { useDispatch } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import { loadNotes } from './features/note/noteSlice'
import SiderComponent from './components/siderComponent/SiderComponent'
import TopBarComponent from './components/topBarComponent/TopBarComponent'
import AuthApp from './layouts/AuthApp'
import UnAuthApp from './layouts/UnAuthApp'
import { Layout, Grid } from 'antd'
import get from 'lodash/get'
import './App.css'

function App() {
  const [logged] = useAuth()
  const [runTour, setRunTour] = useState(false)
  const { Content } = Layout
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const lg = get(screens, 'lg')

  const dispatch = useDispatch()
  useEffect(() => {
    if (logged) {
      dispatch(loadUser())
      dispatch(loadNotes())
    }
  }, [dispatch, logged])

  return (
    <div className="App">
      <BrowserRouter>
        {!lg && (
          <TopBarComponent
            className="topbarcomponent"
            logged={logged}
            runTour={runTour}
            setRunTour={setRunTour}
          />
        )}
        <Layout>
          <SiderComponent
            logged={logged}
            runTour={runTour}
            setRunTour={setRunTour}
          />
          <Layout>
            <Content>
              <div className="div-content">
                <Switch>
                  {logged ? (
                    <AuthApp runTour={runTour} setRunTour={setRunTour} />
                  ) : (
                    <UnAuthApp />
                  )}
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
