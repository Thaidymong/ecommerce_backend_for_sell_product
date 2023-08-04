# ================= ReactJS ===================
* Init React project
    > node -v (ok/not(install naode))
    > npx create-react-app project_name // (need internet)
    > cd project_name
    > npm start  // run project

=> delete node_modules
    > npm install // re get node_modules in project



# ================= Node js ===================



# ================= MySQL ===================





======================================
everything (html file) write in App.js-> function-> 
    return{} need main container <div classNama="App">

inline style in ReactJs  --->  <h1 style={{paddingLeft:40, color:"red"}}>Thai Dymong</h1>


--->react-route-dom // for configure react route
npm install react-router-dom  or npm i react-router-dom
(use for link to many page )
==================================\
install react icons
    > npm install react-icons --save
    import{AiFillHome} from "react-icons/ai" 
    <AiFillHome/> (write in function return page)




====================================
#Configure React Project
    - has node in pc
        > node -v // checj version node
    - create react project
        > npx create-react-app ecm_backend_react
        > cd ecm_backend_react
        > npm start
        - go to browser: http://localhost:3000
    - Try modify in App.js
        - test all element HTML
    - React Style
        - inline style
        - external style
    - Project Structure
        - create folder (page, component, util)
    - Understand Main page in React
        // import
        import "./HomePage.css"
        
        // define main function
        function HomePage(){
            return (
                <div className="home-container">
                    <h1>HomePage</h1>
                </div>
            );
        }
        // export default function
        export default HomePage;
    - Understand default Customer file(.js , .css, .png)

# Re install node_modules folder
    - goto root
        > npm install // re download node_module folder from online to our project
        >npm start // to running project
# Configure Route
    - install library : react-router-dom
        > npm install react-router-dom // check in App.js
    - Create Master Page(layoutOne.js)

# React Icons
    - reference : https://react-icons.github.io/react-icons/search?q=user
    - install library
        > npm install react-icons
    - Usage
        import {iconsName} from "react-icons/group_name"
    Example
        import {AiFillHome} from "react-icons/ai"
        return(
            <div>
                <AiFillHome/>
            <div/>
        )