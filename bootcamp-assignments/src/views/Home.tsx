import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../assets/icons/ArrowRightIcon";

export default function Home() {
  return (
    <main className="home-page">
      <h1>Browse Assignments</h1>
      <ul>
        <li>
          <Link to="/zerodha">Zerodha</Link>
        </li>
        <li>
          <Link to="/zerodha">Zerodha</Link>
        </li>
        <li>
          <Link to="/zerodha">Zerodha</Link>
        </li>
        <li>
          <Link to="/zerodha">Zerodha</Link>
        </li>
      </ul>
    </main>
  );
}
