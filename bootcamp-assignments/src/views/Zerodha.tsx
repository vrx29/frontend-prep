import Header from "../components/zerodha/Header";
import landing from "../assets/landing.svg";

export default function Zerodha() {
  return (
    <>
      <Header />
      <main className="m-[8vh]">
        <img src={landing} />
        <div className="text-center">
          <h2 className="text-3xl mt-10">Invest in everything</h2>
          <p className="m-4">
            Online platform to invest in stocks, derivatives, mutual funds,
            ETFs, bonds, and more.
          </p>
          <button className="bg-[#387ed1] text-white px-9 py-3 rounded-sm mt-6">Sign up for free</button>
        </div>
      </main>
    </>
  );
}
