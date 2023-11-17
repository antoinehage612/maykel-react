import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu/menu";
import Footer from "./components/Footer/Footer";
import AdminPage from "./components/Admin/AdminPage";
import "./App.css";
 
// git add .
// git commit -m "eseml commit"
// git push
const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Menu />} />

          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
