import Footer from './components/Footer';
import Header from './components/Header';
import Logo from './components/Logo';
import './App.css';
import Sidebar from './components/Sidebar';
import Menu from './components/Menu';
function App() {
  return (
    <div>
      <Header />
      <Logo />
      <Footer title="Google" site="www.suttipongact.info" postcode={76130} isOpen={true} />
      <Sidebar />
      <Menu />
    </div>
  );
}

export default App;
