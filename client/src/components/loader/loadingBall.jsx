import "./ballLoader.css";

const LoadingBall = () => {
  return (
    <div className="loader">
      <ul className="wave">
        <li className="ball"></li>
        <li className="ball"></li>
        <li className="ball"></li>
      </ul>
    </div>
  );
};

export default LoadingBall;
