import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div>
      <h1 className="text-3xl text-slate-400">Home</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
