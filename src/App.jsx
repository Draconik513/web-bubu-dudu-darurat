// // import { useState, useEffect } from 'react'
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // import HomePage from './pages/HomePage'
// // import BirthdayCountdown from './pages/BirthdayCountdown'
// // import SpecialWishes from './pages/SpecialWishes'
// // import Memories from './pages/Memories'
// // import CakeCelebration from './pages/CakeCelebration'
// // import GiftWrapper from './pages/GiftWrapper'
// // import Navigation from './components/Navigation'
// // import PageTransition from './components/PageTransition'

// // function App() {
// //   const [countdownFinished, setCountdownFinished] = useState(false)

// //   const checkCountdown = () => {
// //     const targetDate = new Date('2024-08-10T00:00:00')
// //     const now = new Date()
// //     if (now >= targetDate) {
// //       setCountdownFinished(true)
// //     }
// //   }

// //   useEffect(() => {
// //     checkCountdown()
// //     const timer = setInterval(checkCountdown, 1000)
// //     return () => clearInterval(timer)
// //   }, [])

// //   return (
// //     <Router>
// //       <div className="min-h-screen font-sans pb-24"> {/* ✅ Padding bottom ditambahkan */}
// //         <Navigation />
// //         <Routes>
// //           <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
// //           <Route path="/countdown" element={<PageTransition><BirthdayCountdown /></PageTransition>} />
// //           <Route path="/wishes" element={<PageTransition><SpecialWishes /></PageTransition>} />
// //           <Route path="/memories" element={<PageTransition><Memories /></PageTransition>} />
// //           <Route
// //             path="/gift"
// //             element={
// //               <PageTransition><GiftWrapper /></PageTransition>
// //             }
// //           />
// //           <Route
// //             path="/celebration"
// //             element={
// //               countdownFinished ?
// //               <PageTransition><CakeCelebration /></PageTransition> :
// //               <PageTransition><BirthdayCountdown showMessage={true} /></PageTransition>
// //             }
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   )
// // }

// // export default App

// import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import BirthdayCountdown from './pages/BirthdayCountdown'
// import SpecialWishes from './pages/SpecialWishes'
// import Memories from './pages/Memories'
// import CakeCelebration from './pages/CakeCelebration'
// import GiftWrapper from './pages/GiftWrapper'
// import ReplyPage from './pages/ReplyPage'
// import Navigation from './components/Navigation'
// import PageTransition from './components/PageTransition'

// function App() {
//   const [countdownFinished, setCountdownFinished] = useState(false)
//   const [isIOS, setIsIOS] = useState(false)

//   useEffect(() => {
//     // Check if device is iOS
//     setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) ||
//              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

//     // Check if countdown is finished
//     const checkCountdown = () => {
//       const targetDate = new Date('2025-09-01T00:00:00')
//       const now = new Date()
//       if (now >= targetDate) {
//         setCountdownFinished(true)
//       }
//     }

//     checkCountdown()
//     const timer = setInterval(checkCountdown, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <Router>
//       <div className={`min-h-screen font-sans pb-24 ${isIOS ? 'ios-device' : ''}`}>
//         <Navigation />
//         <Routes>
//           <Route path="/" element={<PageTransition><HomePage isIOS={isIOS} /></PageTransition>} />
//           <Route path="/countdown" element={<PageTransition><BirthdayCountdown isIOS={isIOS} /></PageTransition>} />
//           <Route path="/wishes" element={<PageTransition><SpecialWishes isIOS={isIOS} /></PageTransition>} />
//           <Route path="/memories" element={<PageTransition><Memories isIOS={isIOS} /></PageTransition>} />
//           <Route path="/gift" element={<PageTransition><GiftWrapper isIOS={isIOS} /></PageTransition>} />
//           <Route path="/reply" element={<PageTransition><ReplyPage isIOS={isIOS} /></PageTransition>} />
//           <Route
//             path="/celebration"
//             element={
//               countdownFinished ?
//               <PageTransition><CakeCelebration isIOS={isIOS} /></PageTransition> :
//               <PageTransition><BirthdayCountdown isIOS={isIOS} /></PageTransition>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BirthdayCountdown from "./pages/BirthdayCountdown";
import SpecialWishes from "./pages/SpecialWishes";
import Memories from "./pages/Memories";
import CakeCelebration from "./pages/CakeCelebration";
import GiftWrapper from "./pages/GiftWrapper";
import ReplyPage from "./pages/ReplyPage";
import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );

    // Check if countdown is finished
    const checkCountdown = () => {
      const targetDate = new Date("2025-10-04T00:00:00");
      const now = new Date();
      if (now >= targetDate) {
        setCountdownFinished(true);
      }
    };

    checkCountdown();
    const timer = setInterval(checkCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Router>
      <div
        className={`min-h-screen font-sans pb-24 ${isIOS ? "ios-device" : ""}`}
      >
        <BackgroundMusic />
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage isIOS={isIOS} />
              </PageTransition>
            }
          />
          <Route
            path="/countdown"
            element={
              <PageTransition>
                <BirthdayCountdown isIOS={isIOS} />
              </PageTransition>
            }
          />
          <Route
            path="/wishes"
            element={
              <PageTransition>
                <SpecialWishes isIOS={isIOS} />
              </PageTransition>
            }
          />
          <Route
            path="/memories"
            element={
              <PageTransition>
                <Memories isIOS={isIOS} />
              </PageTransition>
            }
          />
          <Route
            path="/gift"
            element={
              <PageTransition>
                <GiftWrapper isIOS={isIOS} />
              </PageTransition>
            }
          />
          <Route
            path="/reply"
            element={
              <PageTransition>
                <ReplyPage isIOS={isIOS} />
              </PageTransition>
            }
          />
          <Route
            path="/celebration"
            element={
              countdownFinished ? (
                <PageTransition>
                  <CakeCelebration isIOS={isIOS} />
                </PageTransition>
              ) : (
                <PageTransition>
                  <BirthdayCountdown isIOS={isIOS} />
                </PageTransition>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
