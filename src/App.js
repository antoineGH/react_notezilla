import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './utils/authHook'
import { useDispatch } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import { loadNotes } from './features/note/noteSlice'
import SiderComponent from './components/siderComponent/SiderComponent'
import TopBarComponent from './components/topBarComponent/TopBarComponent'
import AuthApp from './layouts/AuthApp'
import UnAuthApp from './layouts/UnAuthApp'
import backgroundSVG from './assets/bg.svg'
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
      <Router basename="/note">
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
          <Layout
            style={{
              backgroundImage: logged ? 'none' : `url(${backgroundSVG})`,
            }}
          >
            <Content>
              <div className="div-content" style={{ height: '100%' }}>
                {logged ? (
                  <AuthApp runTour={runTour} setRunTour={setRunTour} />
                ) : (
                  <UnAuthApp />
                )}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  )
}

export default App
