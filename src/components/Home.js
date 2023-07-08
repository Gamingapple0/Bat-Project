import './Home.css'
import LandingPage from './LandingPage';
import Footer from './Footer';
import About from './About';

function Home(props){
    props.setLocation('/')
    return (
        <>
            <LandingPage></LandingPage>
           <About></About>
           <Footer></Footer>
        </>
    )
}

export default Home;