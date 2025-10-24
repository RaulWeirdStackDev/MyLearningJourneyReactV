import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PieController
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

export const Entry = () => {
  const [selectedActivities, setSelectedActivities] = useState({
    Listening: false,
    Reading: false,
    Speaking: false,
    Writing: false,
    Grammar: false
  });

  const [formData, setFormData] = useState({
    activityDescription: '',
    emotion: 'choose',
    emotionalExperience: '',
    difficulty: 'choose',
    challenges: '',
    differences: ''
  });

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Efecto para crear el gráfico solo una vez al montar el componente
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'pie',
        data: {
          labels: ['Listening', 'Reading', 'Speaking', 'Writing', 'Grammar'],
          datasets: [{
            label: 'Activities Completed',
            data: [0, 0, 0, 0, 0], // Datos iniciales
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: {
            duration: 800, // Duración de la animación en ms para mayor fluidez
            easing: 'easeInOutQuart' // Easing más suave para transiciones fluidas
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw + ' activities';
                }
              }
            }
          }
        }
      });
    }

    // Cleanup al desmontar
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []); // Dependencia vacía: se ejecuta solo al montar

  // Efecto para actualizar los datos del gráfico cuando cambian las actividades seleccionadas
  useEffect(() => {
    if (chartInstanceRef.current) {
      const newData = [
        selectedActivities.Listening ? 1 : 0,
        selectedActivities.Reading ? 1 : 0,
        selectedActivities.Speaking ? 1 : 0,
        selectedActivities.Writing ? 1 : 0,
        selectedActivities.Grammar ? 1 : 0
      ];

      // Actualizar los datos sin recrear el gráfico
      chartInstanceRef.current.data.datasets[0].data = newData;
      chartInstanceRef.current.update(); // Esto activa la animación suave
    }
  }, [selectedActivities]);

  const handleCheckboxChange = (activity) => {
    setSelectedActivities(prev => ({
      ...prev,
      [activity]: !prev[activity]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const entry = {
      activities: Object.keys(selectedActivities).filter(key => selectedActivities[key]),
      ...formData,
      timestamp: new Date().toISOString()
    };
    console.log('Journal Entry:', entry);
    alert('Entry submitted! Check console for details.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar con gráfico */}
        <aside className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">What is your progress today?</h2>
          <div className="flex justify-center">
            <canvas ref={chartRef} className="max-w-full"></canvas>
          </div>
        </aside>

        {/* Formulario principal */}
        <main className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-6">
          
          {/* Checkboxes de actividades */}
          <section>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {Object.keys(selectedActivities).map(activity => (
                <div key={activity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${activity}Input`}
                    checked={selectedActivities[activity]}
                    onChange={() => handleCheckboxChange(activity)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label 
                    htmlFor={`${activity}Input`} 
                    className="ml-2 text-gray-700 cursor-pointer"
                  >
                    {activity === 'Grammar' ? 'Grammar and Vocabulary' : activity}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Actividades seleccionadas */}
          {Object.entries(selectedActivities).some(([_, v]) => v) && (
            <div className="space-y-1">
              {Object.entries(selectedActivities).map(([activity, isSelected]) => 
                isSelected && (
                  <p key={activity} className="text-blue-600 font-medium">
                    You did a {activity} activity
                  </p>
                )
              )}
            </div>
          )}

          {/* Descripción de actividad */}
          <section className="space-y-2">
            <label htmlFor="activityDescription" className="block font-bold text-gray-700">
              What did you do?
            </label>
            <textarea
              id="activityDescription"
              rows="5"
              value={formData.activityDescription}
              onChange={(e) => handleInputChange('activityDescription', e.target.value)}
              placeholder="Describe your learning activity..."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>

          {/* Experiencia emocional */}
          <section className="space-y-2">
            <label htmlFor="emotionalExperience" className="block font-bold text-gray-700">
              How did you feel while doing it?
            </label>
            <select
              id="emotionsSelect"
              value={formData.emotion}
              onChange={(e) => handleInputChange('emotion', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="choose">Choose one:</option>
              <option value="happy">😊 Happy</option>
              <option value="proud">😎 Proud</option>
              <option value="nervous">😭 Nervous</option>
              <option value="tired">😩 Tired</option>
              <option value="neutral">😐 Neutral</option>
            </select>
            <textarea
              id="emotionalExperience"
              rows="5"
              value={formData.emotionalExperience}
              onChange={(e) => handleInputChange('emotionalExperience', e.target.value)}
              placeholder="Describe your emotional experience..."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>

          {/* Desafíos */}
          <section className="space-y-2">
            <label htmlFor="challenges" className="block font-bold text-gray-700">
              What were the most challenging parts?
            </label>
            <select
              id="difficultySelect"
              value={formData.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="choose">How difficult was it?</option>
              <option value="very easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="neutral">Neutral</option>
              <option value="difficult">Difficult</option>
              <option value="very difficult">Very Difficult</option>
            </select>
            <textarea
              id="challenges"
              rows="5"
              value={formData.challenges}
              onChange={(e) => handleInputChange('challenges', e.target.value)}
              placeholder="Describe your challenges..."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>

          {/* Mejoras futuras */}
          <section className="space-y-2">
            <label htmlFor="differences" className="block font-bold text-gray-700">
              What would you do differently next time?
            </label>
            <textarea
              id="differences"
              rows="5"
              value={formData.differences}
              onChange={(e) => handleInputChange('differences', e.target.value)}
              placeholder="Describe what you would do differently..."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </section>

          {/* Botón de envío */}
          <button
            onClick={handleSubmit}
            className="block mx-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 max-w-xs"
          >
            Submit your entry to the Learning Journal
          </button>
        </main>
      </div>
    </div>
  );
}