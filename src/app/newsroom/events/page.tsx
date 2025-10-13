'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ExternalLink, ArrowRight, Filter, Search, ChevronRight } from 'lucide-react';

// Sample event data - will be replaced with real data later
const upcomingEvents = [
  {
    id: 1,
    title: 'Climate Innovation Summit 2024',
    date: '2024-03-15',
    time: '09:00 - 17:00',
    location: 'Nairobi Convention Centre, Nairobi',
    type: 'Conference',
    category: 'Innovation',
    attendees: 500,
    featured: true,
    description: 'Join us for the premier climate innovation event bringing together entrepreneurs, investors, and policymakers to showcase cutting-edge climate solutions.',
    image: '/images/events/climate-summit.jpg',
    registration: 'https://events.kcic.org/summit2024',
    speakers: ['Dr. Jane Wanjiru', 'Prof. Michael Ochieng', 'Sarah Kimani'],
    agenda: [
      { time: '09:00', activity: 'Registration & Networking' },
      { time: '10:00', activity: 'Keynote: Future of Climate Innovation' },
      { time: '11:30', activity: 'Panel: Financing Climate Solutions' },
      { time: '14:00', activity: 'Startup Pitch Competition' },
      { time: '16:00', activity: 'Awards & Closing' }
    ]
  },
  {
    id: 2,
    title: 'Renewable Energy Workshop',
    date: '2024-02-20',
    time: '14:00 - 18:00',
    location: 'KCIC Innovation Hub, Nairobi',
    type: 'Workshop',
    category: 'Training',
    attendees: 50,
    featured: false,
    description: 'Hands-on workshop on solar energy system design and implementation for rural communities.',
    image: '/images/events/renewable-workshop.jpg',
    registration: 'https://events.kcic.org/solar-workshop',
    speakers: ['Eng. Peter Munyao', 'Dr. Grace Njoki'],
    agenda: [
      { time: '14:00', activity: 'Introduction to Solar Systems' },
      { time: '15:30', activity: 'Design Principles Workshop' },
      { time: '16:45', activity: 'Installation Demonstration' },
      { time: '17:30', activity: 'Q&A and Networking' }
    ]
  },
  {
    id: 3,
    title: 'AgTech Pitch Day',
    date: '2024-02-28',
    time: '10:00 - 16:00',
    location: 'Strathmore University, Nairobi',
    type: 'Competition',
    category: 'Agriculture',
    attendees: 150,
    featured: true,
    description: 'Agricultural technology startups pitch their solutions to investors and industry experts.',
    image: '/images/events/agtech-pitch.jpg',
    registration: 'https://events.kcic.org/agtech-pitch',
    speakers: ['Dr. Mary Wambui', 'James Kiprotich', 'Prof. David Mwangi'],
    agenda: [
      { time: '10:00', activity: 'Opening & Networking' },
      { time: '10:30', activity: 'Startup Pitches Round 1' },
      { time: '12:00', activity: 'Panel: AgTech Investment Landscape' },
      { time: '14:00', activity: 'Final Pitches' },
      { time: '15:30', activity: 'Awards Ceremony' }
    ]
  }
];

const pastEvents = [
  {
    id: 4,
    title: 'Waste Management Innovation Forum 2023',
    date: '2023-11-15',
    location: 'Mombasa, Kenya',
    type: 'Forum',
    category: 'Waste Management',
    attendees: 200,
    description: 'Showcasing innovative waste-to-value solutions and circular economy models.',
    image: '/images/events/waste-forum.jpg',
    outcomes: [
      '15 waste management solutions showcased',
      '$1.2M investment commitments made',
      '3 partnerships formed between startups and corporates'
    ],
    gallery: ['/images/gallery/waste1.jpg', '/images/gallery/waste2.jpg']
  },
  {
    id: 5,
    title: 'Green Finance Symposium 2023',
    date: '2023-09-22',
    location: 'Nairobi, Kenya',
    type: 'Symposium',
    category: 'Finance',
    attendees: 300,
    description: 'Connecting climate entrepreneurs with financial institutions and impact investors.',
    image: '/images/events/finance-symposium.jpg',
    outcomes: [
      '25 startups presented to investors',
      '$5.8M in funding discussions initiated',
      '12 new mentor-startup matches made'
    ],
    gallery: ['/images/gallery/finance1.jpg', '/images/gallery/finance2.jpg']
  }
];

const eventTypes = ['All', 'Conference', 'Workshop', 'Competition', 'Forum', 'Symposium'];
const categories = ['All', 'Innovation', 'Training', 'Agriculture', 'Waste Management', 'Finance'];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const filterEvents = (events: any[]) => {
    return events.filter(event => {
      const matchesType = selectedType === 'All' || event.type === selectedType;
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesCategory && matchesSearch;
    });
  };

  const filteredUpcoming = filterEvents(upcomingEvents);
  const filteredPast = filterEvents(pastEvents);

  return (
    <PageLayout
      title="Events"
      subtitle="Connect, learn, and innovate together"
      description="Join our community events, workshops, and conferences designed to advance climate innovation and foster collaboration among entrepreneurs, investors, and stakeholders."
      breadcrumb={[
        { label: 'Newsroom', href: '/newsroom' },
        { label: 'Events' }
      ]}
    >
      <div className="py-16">
        {/* Featured Upcoming Events */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Upcoming Events</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.filter(event => event.featured).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Event Header */}
                  <div className="h-64 bg-gradient-to-br from-green-500 to-blue-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white bg-opacity-90 text-gray-800 text-sm font-medium rounded-full">
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center text-sm opacity-90 mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-sm opacity-90">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">{event.location}</span>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        {event.attendees} attendees expected
                      </div>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                        {event.category}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                      >
                        View Details
                      </button>
                      <a
                        href={event.registration}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-center"
                      >
                        Register Now
                      </a>
                    </div>

                    {/* Expanded Details */}
                    {selectedEvent === event.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">Agenda</h4>
                        <div className="space-y-2 mb-4">
                          {event.agenda.map((item, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <span className="font-medium text-green-600 w-16">{item.time}</span>
                              <span className="text-gray-700">{item.activity}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="font-semibold text-gray-900 mb-2">Speakers</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers.map((speaker, i) => (
                            <span key={i} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                              {speaker}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Event Tabs and Filters */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-md">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                    activeTab === 'upcoming'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                    activeTab === 'past'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Past Events
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* Search Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Type:</span>
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedType === type
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-green-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="text-sm font-medium text-gray-700 mr-2 self-center">Category:</span>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Events List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === 'upcoming' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {filteredUpcoming.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded">
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Calendar className="w-6 h-6 mb-2 opacity-80" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                      <Clock className="w-3 h-3 ml-3 mr-1" />
                      {event.time}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-green-600" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                        {event.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {event.attendees}
                      </div>
                    </div>

                    <a
                      href={event.registration}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center text-sm"
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-8">
              {filteredPast.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 h-64 lg:h-auto bg-gradient-to-br from-gray-400 to-gray-600 relative">
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-800 text-xs font-medium rounded">
                          {event.type}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <Calendar className="w-6 h-6 opacity-80" />
                      </div>
                    </div>

                    <div className="lg:w-2/3 p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                        <MapPin className="w-4 h-4 ml-4 mr-1" />
                        {event.location}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-sm font-medium rounded">
                          {event.category}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {event.attendees} attendees
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Event Outcomes</h4>
                        <ul className="space-y-1">
                          {event.outcomes.map((outcome, i) => (
                            <li key={i} className="flex items-center text-sm text-gray-600">
                              <ChevronRight className="w-4 h-4 mr-2 text-green-600" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm font-medium">
                        View Event Gallery
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-green-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Never Miss an Event</h2>
              <p className="text-xl text-gray-600 mb-8">
                Subscribe to our newsletter to receive notifications about upcoming events and exclusive invitations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}