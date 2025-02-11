import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Editor from './Editor';

const App = () => {
  // useEffect(() => {
  //   // Disable Right Click
  //   const disableRightClick = (event) => event.preventDefault();
  //   document.addEventListener("contextmenu", disableRightClick);

  //   // Disable Ctrl+Shift+I (DevTools)
  //   const disableDevTools = (event) => {
  //     if (event.ctrlKey && event.shiftKey && event.key === 'I') {
  //       event.preventDefault();
  //     }
  //   };
  //   document.addEventListener("keydown", disableDevTools);

  //   // Force Full Screen
  //   const enterFullScreen = () => {
  //     if (!document.fullscreenElement) {
  //       document.documentElement.requestFullscreen().catch(console.log);
  //     }
  //   };
  //   document.addEventListener("click", enterFullScreen);

  //   return () => {
  //     document.removeEventListener("contextmenu", disableRightClick);
  //     document.removeEventListener("keydown", disableDevTools);
  //     document.removeEventListener("click", enterFullScreen);
  //   };
  // }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Editor} />
        <Route path="/editor" component={Editor} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
