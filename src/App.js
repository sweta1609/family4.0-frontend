
import { LinkedInPage } from "./LinkedInPage";



function App() {
  return (
    <div className="App">
         <div>
           <input type="text" placeholder="username"/>
           <input type="text" placeholder="password"/>
           <button>Login</button>
         </div>
         <p>Or</p>
         <div>
          Google
         </div>
         <div>
          <h1>Login with LinkedIn</h1>
          <LinkedInPage/>

         </div>
    </div>
  );
}

export default App;



