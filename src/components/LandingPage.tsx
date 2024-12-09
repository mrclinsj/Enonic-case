import { LandingInfo } from "./landingInfo";


export function LandingPage() {
    return (
        <div className="welcomeDiv">
            <h1 className="welcomeTitle">Welcome to the Enonic <span className="titleSpan">HMDB</span> page!</h1>
            <div className="landingGraphicsField">
            <img className="welcomeImage" src="https://i.imgur.com/nx5aHA8.png" alt="Welcome Image" width="100%" height="100%"/>

            <div className="videoContainer">
            <video
              className="maskedVideo"
              src="https://i.imgur.com/e6RepzD.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
            <img
              className="welcomeMask mask"
              src="https://i.imgur.com/8Nnrwoo.png"
              alt="Welcome Mask"
            />
          </div>


            </div>
            <p className="welcomeSubTitle">Check out our awesome collection of movies and actors.</p>


            <LandingInfo/>




        </div>
    );
}