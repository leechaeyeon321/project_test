
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import PageNotFound from './components/views/PageNotFound'

function App() {
  //어드민 페이지는 adminRoute = null 이 true가 되면 됨.
  // const AuthenticPage1 = Auth(<LandingPage/>, null, null);
  // const AuthenticPage2 = Auth(<LoginPage/>, false, null);
  // const AuthenticPage3 = Auth(<RegisterPage/>, false, null);
  return (
    <Router>
      <div>
        {/* <Routes>
          <Route exact path="/" element={AuthenticPage1}>
          </Route>
          <Route exact path="/login" element={AuthenticPage2}>
          </Route>
          <Route exact path="/Register" element={AuthenticPage3}>
          </Route>
          <Route exact path="*" element={<PageNotFound/>}>
          </Route>
        </Routes> */}

        {/* <Routes>
          <Route exact path="/" element={Auth(<LandingPage/>, null)}>
          </Route>
          <Route exact path="/login" element={Auth(<LoginPage/>, false)}>
          </Route>
          <Route exact path="/Register" element={Auth(<RegisterPage/>, false)}>
          </Route>
          <Route exact path="*" element={<PageNotFound/>}>
          </Route>
        </Routes> */}

        <Routes>
          <Route exact path="/" element={<LandingPage/>}>
          </Route>
          <Route exact path="/login" element={<LoginPage/>}>
          </Route>
          <Route exact path="/Register" element={<RegisterPage/>}>
          </Route>
          <Route exact path="*" element={<PageNotFound/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
