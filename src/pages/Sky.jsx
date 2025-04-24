import NightSkyViewer from '../components/SkyViewer/NightSky'

const Sky = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Interactive Night Sky
        </h1>
        <div className="mb-8">
          <p className="text-gray-400 mb-4">
            View the night sky from your current location. The visualization shows stars, 
            constellations, and other celestial objects visible in your area.
          </p>
        </div>
        <NightSkyViewer />
      </div>
    </div>
  )
}

export default Sky