import Banner from '../components/Banner/Banner';
import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Posts from '../components/Posts/Posts';


function Home (){
  const [refresh , setRefresh] =useState(false)

  return(
    <div className="homeParentDiv">
    <Header  refresh={refresh}/>
    <Banner />
    <Posts/>
    <Footer/>
 
  </div>
  )
}
export default Home