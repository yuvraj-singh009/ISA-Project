import SpaceEventsCalendar from '../components/Calendar/SpaceEventsCalendar'

const Events = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Space Events Calendar
        </h1>
        <SpaceEventsCalendar />
      </div>
    </div>
  )
}

export default Events