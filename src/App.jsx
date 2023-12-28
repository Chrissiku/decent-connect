import { Web5 } from "@web5/api/browser";
import Home from "./pages/Home";
console.log(Web5);
export default function App() {
  return (
    <>
      <div className="w-full mx-auto flex flex-col items-center justify-center">
        <Home />
      </div>
    </>
  );
}
