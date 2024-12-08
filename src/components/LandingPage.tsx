


export function LandingPage() {
    return (
        <div className="welcomeDiv">
            <h1 className="welcomeTitle">Welcome to the Enonic <span className="titleSpan">HMDB</span> page!</h1>
            <div className="landingGraphicsField">
            <img className="welcomeImage" src="https://i.imgur.com/nx5aHA8.png" alt="Welcome Image" width="100%" height="100%"/>
            <img className="welcomeImage2" src="https://i.imgur.com/bxRtdbs.png" alt="Welcome Image" width="100%" height="100%"/>
            </div>
            <p className="welcomeSubTitle">Check out our awesome collection of movies and actors!</p>
        </div>
    );
}