import Header from "./conponents/Header"
import TopSection from "./conponents/TopSection";
import ContactSection from "./conponents/ContactSection";
import Write from "./conponents/Write";
import AboutSection from "./conponents/AboutSection";
import "./App.css";
import LastSection from "./conponents/LastSection";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Recipes from "./conponents/Recipes";
import WriteFoods from "./conponents/WriteFoods";
import SignUp from "./conponents/SignUp";
import Login from "./conponents/Login";
import AfterLogin from "./conponents/AfterLogin";
import Header2 from "./conponents/Header2";
import { UserProvider } from "./contexts/UserContext";
import ShowRecipe from "./conponents/ShowRecipe";
import UserProfile from "./conponents/UserProfile";
import FullRecipes from "./conponents/FullRecipes";
import EditProfile from "./conponents/EditProfile";
import MyRecipes from "./conponents/MyRecipes";
import Recipe2 from "./conponents/Recipe2";


const App = () => {

  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<TopSection/>}/>
              <Route path="/recipes" element={<Recipes/>}/>
              <Route path="/write" element={<Write/>}/>
              <Route path="/contact" element={<ContactSection/>}/>
              <Route path="/about" element={<AboutSection/>}/>
              <Route path="/write-recipes" element={<WriteFoods />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/afterlogin" element={<AfterLogin />}/>
              <Route path="/header2" element={<Header2/>}/>
              <Route path="/showrecipe/:recipeId" element={<ShowRecipe/>} />
              <Route path="/userprofile" element={<UserProfile/>}/>
              <Route path="/fullrecipes" element={<FullRecipes/>}/>
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/myrecipes" element={<MyRecipes />} />
              <Route path="/recipe2" element={<Recipe2/>} />
            </Routes>
        </BrowserRouter>
        {/* <LastSection/> */}
      </UserProvider>
    </div>
  )
}

export default App;