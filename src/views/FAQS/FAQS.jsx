import { useState } from 'react';
import { ChevronDown, User, BookOpen, Star, Lightbulb, Shield, Zap } from 'lucide-react';

export const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who am I?",
      icon: User,
      answer: "I'm a passionate fullstack developer and English language teacher dedicated to helping language learners track their progress and stay motivated. This app was born from my own experience learning and teaching the language and understanding the importance of reflection and learner autonomy in the learning process.",
      hasImage: true
    },
    {
      question: "What is My Learning Journey?",
      icon: BookOpen,
      answer: "My Learning Journey is a reflective learning journal designed specifically for language learners. It helps you document your daily learning activities, track your emotional experiences, identify challenges, and celebrate your progress. By maintaining a consistent journal, you create a valuable record of your language learning evolution, while fostering autonomy and motivation."
    },
    {
      question: "What are the benefits of My Learning Journey?",
      icon: Star,
      answer: "Using this journal helps you: (1) Build self-awareness about your learning patterns, (2) Identify what methods work best for you, (3) Track your progress over time with visual statistics, (4) Stay motivated by seeing how far you've come, (5) Recognize and address challenges early, and (6) Develop metacognitive skills that enhance learning ownership and efficiency."
    },
    {
      question: "How do I use this app?",
      icon: Lightbulb,
      answer: "It's simple! Start by creating a new journal entry after any informal language learning experience. You can even add a movie you watched or a book you read! Select the date, check which kind of activities you did (Listening, Reading, Speaking, Writing, or Grammar), describe what you did, share how you felt, note the difficulty level, and reflect on any challenges. Then visit the Statistics page to view your progress through interactive charts and review past entries in the Journal view."
    },
    {
      question: "Is my data private and secure?",
      icon: Shield,
      answer: "Yes! Your learning journal entries are stored securely in our database. We take your privacy seriously and never share your personal learning data with third parties. Your reflections and progress are yours alone."
    },
    {
      question: "What makes this different from other learning apps?",
      icon: Zap,
      answer: "Unlike traditional learning apps that focus solely on lessons or vocabulary, My Learning Journey emphasizes metacognition and self-reflection. It's not about what you're learning, but HOW you're learning. By understanding your learning process, emotions, and challenges, you become a more effective and autonomous learner."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about My Learning Journey
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors duration-200 ${
                      isOpen ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-6 w-6 transition-colors duration-200 ${
                        isOpen ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-14">
                      {faq.hasImage && (
                        <div className="mb-4 flex justify-center">
                          <img 
                            src="/raul.png" 
                            alt="Raul" 
                            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-100"
                          />
                        </div>
                      )}
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            I would d love to hear from you! Feel free to reach out if you need any help or have suggestions.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
            <a href="https://wa.me/56972033734" target="_blank">Contact Me</a>
          </button>
        </div>

      </div>
    </div>
  );
}