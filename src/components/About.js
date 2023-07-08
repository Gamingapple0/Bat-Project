import { useEffect } from 'react';
import './About.css'


function About(){

    useEffect(() => {
        const observer = new IntersectionObserver(entries =>{
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    entry.target.classList.add('slidefade');   
                    entry.target.classList.add('animate-slidefade');   
                    return;
                }
                entry.target.classList.remove('slidefade');   
                entry.target.classList.remove('animate-slidefade');   
            })
    
        });
    
        observer.observe(document.querySelector('.about-us'));
    }, [])




    return (
        <div className="about-us">
            <h1 className="about-title slogan">About The Project</h1>
            <div className="about-container">
            <div className="about-image">
            <img className="bat-img" src='https://1.bp.blogspot.com/-tBeTROyi7tM/X3LAzQQLUiI/AAAAAAAADIU/avZyvVknn_0dFogbXjEIDJQKY5J-le7QQCNcBGAsYHQ/w919-h516-p-k-no-nu/the-batman-2021-logo-uhdpaper.com-4K-3.2948-wp.thumbnail.jpg'/>
            </div>
            <div className="about-text">
                <div className="about-line-text-wrapper">
                    <div className="about-line red-background"></div>
                    <div>

                    <h2 className="about-small-text">
                        Looking To Be
                    </h2>
                
                <h1 className='about-big-text'>
                    The Next <span className='red-text'>Dark Knight?</span>
                </h1>
                <h3>In That Case, Welcome To <span className='red-text'>The Batman Project </span>, The Crucible That Will Shape You Into The Formidable Force That Is <span className='red-text'>The Arkham Knight</span></h3>
                    </div>
                    </div>
            </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default About;