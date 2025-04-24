import SpaceEventsCalendar from '../components/Calendar/SpaceEventsCalendar'
import NightSkyViewer from '../components/SkyViewer/NightSky'
import { motion } from 'framer-motion'

import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="home-header mb-6"
      >
        <h1 className="mb-2">ISL-Space View </h1>
        <p className="text-gray-400">
          Explore upcoming space events and view the night sky from your location
        </p>
      </motion.div>

      <div className="home-grid">
        <div>
          <h2 className="mb-4">Upcoming Events</h2>
          <SpaceEventsCalendar />
        </div>
        <div>
          <h2 className="mb-4">Your Night Sky</h2>
          <br />
          <NightSkyViewer />
        </div>
      </div>
    </div>
  )
}

export default Home