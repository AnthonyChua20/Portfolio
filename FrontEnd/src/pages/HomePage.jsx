import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUI'
import { data } from 'react-router';
import axios from "axios"

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, SetNotes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchNotes = async() =>{
      try {
        const res = await axios.get("http://localhost:5001/api/notes")
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching notes")
      }
    }
  },[])

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUi />}
      </div>
  )
}

export default HomePage