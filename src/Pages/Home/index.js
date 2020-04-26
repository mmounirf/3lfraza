import React from "react";
import "./Home.scss";
import hero from "../../assets/hero_bg.png";
import Typical from "react-typical";


const Home = (props) => {
  return (
    <div className="home">
      <div className="home__container" style={{ backgroundImage: `url(${hero})` }}>
        <div className="animated">
          <Typical
            steps={["اعملها...", 3000, "اشتريها...", 3000, "حضرها...", 3000, "وصلها...", 3000]}
            loop={Infinity}
            wrapper="h2"
          />
          <h1> عالفرّازة</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
