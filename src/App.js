import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import AddMentor from "./components/AddMentor/AddMentor";
import AddStudent from "./components/AddStudent/AddStudent";
import AssignStudent from "./components/AssignStudent/AssignStudent";
import ChangeMentor from "./components/ChangeMentor/ChangeMentor";
import ShowAllStudents from "./components/ShowAllStudents/ShowAllStudents";



function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/add-mentor" element={<AddMentor/>}/>
          <Route path="/add-student" element={<AddStudent/>}/>
          <Route path="/assign-student" element={<AssignStudent/>}/>
          <Route path="/change-mentor" element={<ChangeMentor/>}/>
          <Route path="/show-all-students" element={<ShowAllStudents/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
