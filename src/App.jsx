import { Web5 } from '@web5/api/browser';
import HowItWorks from './components/HowItWorks';
import Mentor from './components/Mentor';
import Journey from './components/Journey';
import Footer from './components/Footer';
console.log(Web5)
export default function App() {
  return (
    <>
      <div>
    <HowItWorks />
    <Mentor />
    <Journey />
    <Footer />
      </div>
    </>
  )
}