import './App.css';
import SearchBar from './Components/SearchBar';
import Logo from './Images/Ceeit.png';

function App() {
  return (
<div className='App'>
  <img src={Logo} width ="382" height="206"></img>
  <SearchBar placeholder='Search here'/></div>
  );
}

export default App;
