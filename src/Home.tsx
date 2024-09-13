import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
