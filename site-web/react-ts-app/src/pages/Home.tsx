import Navigation from "../components/Navigation";
import BarreLaterale from "../components/BarreLaterale";
import * as utils from "../Utils";
import sklearn from "../assets/sklearn.png"
import github from "../assets/github.png"
import githubL from "../assets/githubLight.png"
import linkedIn from "../assets/linkedin.png"
import linkedInL from "../assets/linkedinLight.png"
import python from "../assets/python.png"
import react from "../assets/react.png"
import typescript from "../assets/typescript.png"
const Home = () =>  {
    window.onload= () =>{
        const search = window.location.search; // returns the URL query String
        const params = new URLSearchParams(search); 
        let status = params.get('status');
        if(status==="disconnected"){
            utils.default.doAlert("info","You have been disconnected !");
        }else if(status==="connected"){
            utils.default.doAlert("success","You are connected !");
        }
    }
    let sourcelinkedIn:string;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourcelinkedIn = linkedIn}else{sourcelinkedIn = linkedInL}
    let sourceGit:string;
    if(!localStorage.getItem("theme") || localStorage.getItem("theme")==='dark'){sourceGit = github}else{sourceGit = githubL}

    return (
        
        <div className="home">
            
            <div id="view" className="view">
                <h1 className="title">Home page</h1>
                    <table>
                        <tr>
                            <td>Ralph EL CHALFOUN</td>
                            <td>Jérémy HIRTH DAUMAS</td>
                            <td>Nicolas DEMOLIN</td>
                            <td>Christel RALALASOA</td>
                        </tr>
                        <tr>
                            <td>
                                <td><a href="https://www.linkedin.com/in/ralph-el-chalfoun-642312188/"><img className="iconeLinkedIn" alt="" src={sourcelinkedIn}/></a></td>
                                <td><a href="https://github.com/iBananos"><img className="iconeGitHub" alt="" src={sourceGit}/></a></td>
                            </td>
                            <td>
                                <td><a href="https://www.linkedin.com/in/jeremy-hirth/"><img className="iconeLinkedIn" alt="" src={sourcelinkedIn}/></a></td>
                                <td><a href="https://github.com/jer0622"><img className="iconeGitHub" alt="" src={sourceGit}/></a></td>
                            </td>
                            <td>
                                <td><a href="https://www.linkedin.com/in/nicolas-demolin-5694b8159/"><img className="iconeLinkedIn" alt="" src={sourcelinkedIn}/></a></td>
                                <td><a href="https://github.com/NicolasDemolin"><img className="iconeGitHub" alt="" src={sourceGit}/></a></td>
                            </td>
                            <td>
                                <td><a href="https://www.linkedin.com/in/christelralalasoa519/"><img className="iconeLinkedIn" alt="" src={sourcelinkedIn}/></a></td>
                                <td><a href="https://github.com/christelralalasoa"><img className="iconeGitHub" alt="" src={sourceGit}/></a></td>
                            </td>
                        </tr>
                        
                    </table>
                    Powered by <br /> React, Typescript, Python and Sklearn
                    
                    
                    <table>
                        <tr>
                        <td><a href="https://github.com/christelralalasoa"><img className="iconeReact" alt="React" src={react}/></a></td>
                            <td><a href="https://github.com/christelralalasoa"><img className="iconeTypescript" alt="" src={typescript}/></a></td>
                            <td><a href="https://github.com/christelralalasoa"><img className="iconePython" alt="" src={python}/></a></td>
                            <td><a href="https://github.com/christelralalasoa"><img className="iconeSklearn" alt="" src={sklearn}/></a></td>
                            
                        </tr>
                        
                    </table>
            </div>
            <BarreLaterale />
            <Navigation />
        </div>
    )
}

export default Home;