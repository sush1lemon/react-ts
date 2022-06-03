import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Login from "./pages/Login";
import RouteGuard from "./components/RouteGuard";
import Page404 from "./components/Page404";
import PersistLogin from "./components/PersistLogin";
import RedirectWhenAuthenticated from "./components/RedirectWhenAuthenticated";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/layouts/Main.layout";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {useLocalStorage} from "@mantine/hooks";
import {Home, SubRedditHome} from "./pages";
import {SubRedditLayout} from "./components/layouts/SubReddit.layout";
import {SubRedditSubmit} from "./pages/SubRedditSubmit";
import {Submit} from "./pages/Submit";
import {PostPage} from "./pages/PostPage";

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<PersistLogin/>}>
          <Route element={<RedirectWhenAuthenticated/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
          </Route>

          <Route element={<RouteGuard/>}>

            <Route element={<MainLayout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="/submit" element={<Submit/>}/>
              <Route path="/r/:name/" element={<SubRedditLayout/>}>
                <Route path="" element={<SubRedditHome/>}/>
                <Route path="submit" element={<SubRedditSubmit/>}/>
                <Route path="comments/:postId" element={<PostPage/>}/>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Page404/>}/>
      </Routes>
    </Router>
  );
}


function MantineWrapper() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider
      theme={{ colorScheme }}
      emotionOptions={{key: 'mantine', prepend: false}}
      withGlobalStyles
      withNormalizeCSS
    >
      <App/>
    </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MantineWrapper;
