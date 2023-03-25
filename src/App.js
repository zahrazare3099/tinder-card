import CardsPage from "./components/CardsPage";
import "./App.css";
function App() {
  return (
    <div className="App root>div w-100 m-0 p-0 d-flex flex-column">
      <h1 className="text-center m-0 w-100 header-title py-3 text-white">
        tinder app swipe cards
      </h1>
      <CardsPage />
    </div>
  );
}

export default App;
