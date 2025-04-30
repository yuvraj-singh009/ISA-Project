import { useState, useEffect } from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './SpaceEventsCalendar.css';

const SpaceEventsCalendar = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState('dayGridMonth')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30')
        const data = res.data.results

        const formatted = data.map(event => ({
          id: event.id,
          title: event.name,
          start: event.net,
          end: event.net,
          allDay: false,
          extendedProps: {
            description: `${event.mission?.description || 'No mission details available.'}\n\nLocation: ${event.pad?.location?.name}`,
            location: event.pad?.name || 'Unknown Launch Pad',
          },
        }))

        setEvents(formatted)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch space events. Please try again later.')
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) return (
    <div className="events-calendar">
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  )

  if (error) return (
    <div className="events-calendar">
      <div className="error-message">
        {error}
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
        >
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className="events-calendar">
      <div className="events-header">
        <h1 className="calendar-title">🚀 Space Launch Calendar</h1>
        <div className="time-range-toggle">
          <button 
            className={`time-range-btn ${view === 'dayGridMonth' ? 'active' : ''}`}
            onClick={() => setView('dayGridMonth')}
          >
            Month
          </button>
          <button 
            className={`time-range-btn ${view === 'timeGridWeek' ? 'active' : ''}`}
            onClick={() => setView('timeGridWeek')}
          >
            Week
          </button>
          <button 
            className={`time-range-btn ${view === 'timeGridDay' ? 'active' : ''}`}
            onClick={() => setView('timeGridDay')}
          >
            Day
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={(info) => {
          alert(`${info.event.title}\n\n${info.event.extendedProps.description}`)
        }}
        height="auto"
        nowIndicator={true}
        eventDisplay="block"
      />
    </div>
  )
}

export default SpaceEventsCalendar
