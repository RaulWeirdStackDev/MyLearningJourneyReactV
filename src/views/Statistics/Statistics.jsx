import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BarChart3,
  Activity,
  Heart,
  Zap,
} from "lucide-react";

export const Statistics = () => {
  const [activeView, setActiveView] = useState("stats");
  const [activeChart, setActiveChart] = useState("activities");
  const [entries, setEntries] = useState([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockEntries = [
      {
        id: 1,
        entry_date: "2024-10-26",
        activities: ["Listening", "Speaking"],
        activity_description:
          "Practiced conversation with a language partner for 30 minutes. Discussed daily routines and weekend plans.",
        emotion: "happy",
        emotional_experience:
          "Felt confident and enjoyed the natural flow of conversation.",
        difficulty: "easy",
        challenges:
          "Had some trouble with past tense verbs, but overall it went smoothly.",
        differences:
          "Would prepare more vocabulary related to specific topics beforehand.",
        created_at: "2024-10-26T10:30:00Z",
      },
      {
        id: 2,
        entry_date: "2024-10-25",
        activities: ["Reading", "Grammar"],
        activity_description:
          "Read a short article about climate change and completed grammar exercises on conditionals.",
        emotion: "proud",
        emotional_experience:
          "Proud of understanding complex sentences without translating.",
        difficulty: "difficult",
        challenges: "The conditional structures were confusing at first.",
        differences: "Would do more examples before attempting the exercises.",
        created_at: "2024-10-25T15:45:00Z",
      },
      {
        id: 3,
        entry_date: "2024-10-24",
        activities: ["Writing"],
        activity_description: "Wrote a short essay about my favorite hobby.",
        emotion: "neutral",
        emotional_experience:
          "It was okay, not particularly exciting but productive.",
        difficulty: "neutral",
        challenges: "Struggled with organizing my ideas coherently.",
        differences: "Would create an outline first next time.",
        created_at: "2024-10-24T18:20:00Z",
      },
      {
        id: 4,
        entry_date: "2024-10-23",
        activities: ["Listening", "Reading"],
        activity_description:
          "Listened to a podcast and read the transcript afterwards.",
        emotion: "tired",
        emotional_experience: "Was tired but pushed through the session.",
        difficulty: "very difficult",
        challenges: "The speakers talked very fast and used a lot of idioms.",
        differences: "Would choose easier content when tired.",
        created_at: "2024-10-23T20:00:00Z",
      },
    ];

    const sortedEntries = mockEntries.sort(
      (a, b) => new Date(b.entry_date) - new Date(a.entry_date)
    );

    setEntries(sortedEntries);
    setLoading(false);
  }, []);

  const getStatistics = () => {
    if (entries.length === 0)
      return { activities: [], emotions: [], difficulties: [] };

    const activityCounts = {};
    entries.forEach((entry) => {
      entry.activities.forEach((activity) => {
        activityCounts[activity] = (activityCounts[activity] || 0) + 1;
      });
    });

    const activitiesData = Object.entries(activityCounts).map(
      ([name, count]) => ({
        name,
        count,
      })
    );

    const emotionCounts = {};
    entries.forEach((entry) => {
      if (entry.emotion && entry.emotion !== "choose") {
        emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
      }
    });

    const emotionsData = Object.entries(emotionCounts).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count,
    }));

    const difficultyCounts = {};
    entries.forEach((entry) => {
      if (entry.difficulty && entry.difficulty !== "choose") {
        difficultyCounts[entry.difficulty] =
          (difficultyCounts[entry.difficulty] || 0) + 1;
      }
    });

    const difficultiesData = Object.entries(difficultyCounts).map(
      ([name, count]) => ({
        name: name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        count,
      })
    );

    return {
      activities: activitiesData,
      emotions: emotionsData,
      difficulties: difficultiesData,
    };
  };

  const stats = getStatistics();
  const currentEntry = entries[currentEntryIndex];

  const chartCategories = {
    activities: {
      name: "Activities",
      icon: Activity,
      data: stats.activities,
      color: "#3b82f6",
      description: "Distribution of learning activities",
    },
    emotions: {
      name: "Emotions",
      icon: Heart,
      data: stats.emotions,
      color: "#10b981",
      description: "Your emotional experience while learning",
    },
    difficulties: {
      name: "Difficulty",
      icon: Zap,
      data: stats.difficulties,
      color: "#f59e0b",
      description: "Challenge levels you've encountered",
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getEmotionEmoji = (emotion) => {
    const emojis = {
      happy: "😊",
      proud: "😎",
      nervous: "😭",
      tired: "😩",
      neutral: "😐",
    };
    return emojis[emotion] || "";
  };

  const handlePrevEntry = () => {
    if (currentEntryIndex < entries.length - 1) {
      setCurrentEntryIndex(currentEntryIndex + 1);
    }
  };

  const handleNextEntry = () => {
    if (currentEntryIndex > 0) {
      setCurrentEntryIndex(currentEntryIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading your learning journey...
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">
            No entries yet. Start your learning journey!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Toggle de vistas */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setActiveView("stats")}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeView === "stats"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            Statistics
          </button>
          <button
            onClick={() => setActiveView("journal")}
            className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeView === "journal"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            Journal
          </button>
        </div>

        {/* Vista de Estadísticas */}
        {activeView === "stats" && (
          <div className="space-y-8">
            {/* Resumen general */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your Learning Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {entries.length}
                  </p>
                  <p className="text-gray-600 mt-1">Total Entries</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {entries.reduce((sum, e) => sum + e.activities.length, 0)}
                  </p>
                  <p className="text-gray-600 mt-1">Activities Completed</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.ceil(
                      (new Date(entries[0].entry_date) -
                        new Date(entries[entries.length - 1].entry_date)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </p>
                  <p className="text-gray-600 mt-1">Days of Learning</p>
                </div>
              </div>
            </div>

            {/* Selector de gráficos */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Explore Your Data
              </h3>

              {/* Menú de categorías */}
              <div className="flex flex-wrap gap-3 mb-6">
                {Object.entries(chartCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveChart(key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activeChart === key
                          ? "bg-blue-600 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{category.name}</span>
             
                    </button>
                  );
                })}
              </div>

              {/* Descripción del gráfico actual */}
              <p className="text-sm text-gray-600 mb-4 italic">
                {chartCategories[activeChart].description}
              </p>

              {/* Gráfico */}
              <div className="transition-all duration-300">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartCategories[activeChart].data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill={chartCategories[activeChart].color}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Vista de Diario */}
        {activeView === "journal" && currentEntry && (
          <div className="max-w-4xl mx-auto">
            {/* Contenedor tipo libro */}
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 relative">
              {/* Decoración de libro */}
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 rounded-l-lg"></div>

              {/* Fecha */}
              <div className="border-b-2 border-gray-200 pb-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {formatDate(currentEntry.entry_date)}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Entry {currentEntryIndex + 1} of {entries.length}
                </p>
              </div>

              {/* Actividades */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {currentEntry.activities.map((activity) => (
                    <span
                      key={activity}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">What I Did</h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentEntry.activity_description}
                </p>
              </div>

              {/* Emoción */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">How I Felt</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {getEmotionEmoji(currentEntry.emotion)}
                  </span>
                  <span className="text-gray-600 capitalize">
                    {currentEntry.emotion}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {currentEntry.emotional_experience}
                </p>
              </div>

              {/* Dificultad y desafíos */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">Challenges</h3>
                <p className="text-sm text-gray-500 mb-1">
                  Difficulty:{" "}
                  <span className="capitalize font-medium">
                    {currentEntry.difficulty}
                  </span>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {currentEntry.challenges}
                </p>
              </div>

              {/* Reflexiones */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2">
                  Next Time I Would...
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {currentEntry.differences}
                </p>
              </div>

              {/* Navegación */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
                <button
                  onClick={handleNextEntry}
                  disabled={currentEntryIndex <= 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    currentEntryIndex <= 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  Next
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    {new Date(currentEntry.entry_date).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>

                <button
                  onClick={handlePrevEntry}
                  disabled={currentEntryIndex >= entries.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    currentEntryIndex >= entries.length - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Previous
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
