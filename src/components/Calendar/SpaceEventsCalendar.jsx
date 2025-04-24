import { useState, useEffect } from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
// import './calendarStyles.css'
import './SpaceEventsCalendar.css';

const SpaceEventsCalendar = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30')
        const data = res.data.results

        const formatted = data.map(event => ({
          id: event.id,
          title: event.name,
          start: event.net, // net = No Earlier Than (launch datetime)
          extendedProps: {
            description: `${event.mission?.description || 'No mission details available.'}\n\nLocation: ${event.pad?.location?.name}`,
            location: event.pad?.name || 'Unknown Launch Pad',
          },
        }))

        setEvents(formatted)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch space events.')
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return <div className="text-center p-8">Loading...</div>
  if (error) return <div className="text-red-500 p-4">{error}</div>

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">🚀 Space Launch Calendar</h2> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          alert(`${info.event.title}\n\n${info.event.extendedProps.description}`)
        }}
        height="auto"
      />
    </div>
  )
}

export default SpaceEventsCalendar
