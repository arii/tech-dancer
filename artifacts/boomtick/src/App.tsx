import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Research from "./pages/Research";
import Gear from "./pages/Gear";
import Export from "./pages/Export";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="research" element={<Research />} />
          <Route path="gear" element={<Gear />} />
          <Route path="export" element={<Export />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
