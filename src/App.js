import {useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=238f6d4a';

const App = () => {

    const [movies, setMovies]= useState([]);// movies değerini sadece setMovies ile değiştirebiliriz
    const [searchMovieT, setsearchMovieT] = useState('');

    const searchMovies = async (title)=>{
        console.log("sa")
        const response = await fetch(`${API_URL}&s=${title}`);//await'in anlamı işlemleri sırayla yapmak ilk önce üstteki await sonra alttaki
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('WWA');//başlangıç değeri gibi kullandık burda
    }, []);

    return(
        <div className='app'>
            <h1>fuckin movie app</h1>
            <div className='search'>
                <input
                    placeholder="Search the movie"
                    value={searchMovieT}
                    onChange={(e)=>{setsearchMovieT(e.target.value)}}//input değiştikçe searchmovieT de değişiyor
                />
                <img
                    src={SearchIcon}
                    onClick={()=>{searchMovies(searchMovieT)}}// arama çubuğuna tıklanınca searchMovies fonskiyonu inputa girilen değeri parametre alarak çalışıyor.
                    alt="searching"
                />
            </div>

            {
                movies?.length>0 ?
                (
                <div className='container'>
                    {movies.map((movie) => <MovieCard movie1={movie} />)}{/*.map ile arrayde geziyoruz */}
                </div>

                ) :
                (
                <div className='empty'>
                    <p>movie not found</p>
                </div>
                )
            }
        </div>
        
    )
}
export default App;