import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";


function Linking() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Linking;