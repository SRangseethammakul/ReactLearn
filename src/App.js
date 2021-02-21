import Footer from './components/Footer';
import Header from './components/Header';
import Logo from './components/Logo';
import './App.css';
function App() {
  return (
    <div>
      <Header />
      <Logo />
      <Footer title="Google" site="www.suttipongact.info" postcode={76130} isOpen={true} />
    </div>
  );
}

export default App;
