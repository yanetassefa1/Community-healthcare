javascriptimport axios from 'axios';

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Cannot connect to server. Please check if backend is running.');
    }
    return Promise.reject(error);
  }
);

// ==================== CACHING SYSTEM ====================

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_PREFIX = 'healthcare_cache_';

// Save to localStorage cache
const saveToCache = (key, data) => {
  try {
    const cacheData = {
      data: data,
      timestamp: Date.now()
    };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheData));
    console.log(`💾 Cached: ${key}`);
  } catch (error) {
    console.error('Failed to save cache:', error);
  }
};

// Get from localStorage cache
const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    
    if (!cached) {
      console.log(`❌ No cache for: ${key}`);
      return null;
    }
    
    const cacheData = JSON.parse(cached);
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;
    
    // Check if cache is still valid (within 5 minutes)
    if (cacheAge < CACHE_DURATION) {
      console.log(`✅ Using cached ${key} (${Math.round(cacheAge / 1000)}s old)`);
      return cacheData.data;
    } else {
      // Cache expired, remove it
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      console.log(`⏰ Cache expired for: ${key}`);
      return null;
    }
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
};

// Clear specific cache or all caches
const clearCache = (key = null) => {
  try {
    if (key) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      console.log(`🗑️ Cleared cache: ${key}`);
    } else {
      // Clear all healthcare caches
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
      console.log(`🗑️ Cleared all caches`);
    }
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

// Generate unique cache key for filtered queries
const generateCacheKey = (baseKey, params = {}) => {
  if (Object.keys(params).length === 0) {
    return baseKey;
  }
  const paramString = JSON.stringify(params);
  return `${baseKey}_${paramString}`;
};

// ==================== APPOINTMENT SERVICE ====================

const appointmentService = {
  // Get all appointments with caching
  getAllAppointments: async (filters = {}) => {
    try {
      // Generate unique cache key based on filters
      const cacheKey = generateCacheKey('appointments', filters);
      
      // Check cache first
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      // If not in cache, fetch from API
      console.log('📡 Fetching appointments from API...');
      const response = await apiClient.get('/appointments/', { params: filters });
      
      // Save to cache
      saveToCache(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get appointments for current user with caching
  getMyAppointments: async (status = null) => {
    try {
      const params = status ? { status } : {};
      const cacheKey = generateCacheKey('my_appointments', params);
      
      // Check cache
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Fetch from API
      console.log('📡 Fetching my appointments from API...');
      const response = await apiClient.get('/appointments/my-appointments/', { params });
      
      // Save to cache
      saveToCache(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single appointment by ID
  getAppointmentById: async (id) => {
    try {
      const cacheKey = `appointment_${id}`;
      
      // Check cache
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Fetch from API
      console.log(`📡 Fetching appointment ${id} from API...`);
      const response = await apiClient.get(`/appointments/${id}/`);
      
      // Save to cache
      saveToCache(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get available time slots with caching
  getAvailableSlots: async (doctorId, date) => {
    try {
      const cacheKey = generateCacheKey('slots', { doctorId, date });
      
      // Check cache
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      // Fetch from API
      console.log(`📡 Fetching available slots for doctor ${doctorId} on ${date}...`);
      const response = await apiClient.get('/appointments/available-slots/', {
        params: { doctor_id: doctorId, date }
      });
      
      // Save to cache (shorter duration for slots - 2 minutes)
      const slotCache = {
        data: response.data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${CACHE_PREFIX}${cacheKey}`, JSON.stringify(slotCache));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Book new appointment - CLEARS CACHE
  bookAppointment: async (appointmentData) => {
    try {
      console.log('📡 Booking appointment...');
      const response = await apiClient.post('/appointments/', appointmentData);
      
      // Clear all appointment-related caches
      clearCache('appointments');
      clearCache('my_appointments');
      clearCache('slots'); // Clear slots too
      console.log('✅ Appointment booked, cache cleared');
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update appointment - CLEARS CACHE
  updateAppointment: async (id, appointmentData) => {
    try {
      const response = await apiClient.put(`/appointments/${id}/`, appointmentData);
      
      // Clear caches
      clearCache('appointments');
      clearCache('my_appointments');
      clearCache(`appointment_${id}`);
      console.log('✅ Appointment updated, cache cleared');
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reschedule appointment - CLEARS CACHE
  rescheduleAppointment: async (id, newDate, newTimeSlot) => {
    try {
      console.log(`📡 Rescheduling appointment ${id}...`);
      const response = await apiClient.patch(`/appointments/${id}/reschedule/`, {
        appointment_date: newDate,
        time_slot: newTimeSlot
      });
      
      // Clear caches
      clearCache('appointments');
      clearCache('my_appointments');
      clearCache(`appointment_${id}`);
      clearCache('slots');
      console.log('✅ Appointment rescheduled, cache cleared');
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Cancel appointment - CLEARS CACHE
  cancelAppointment: async (id, reason = '') => {
    try {
      console.log(`📡 Cancelling appointment ${id}...`);
      const response = await apiClient.patch(`/appointments/${id}/cancel/`, {
        cancellation_reason: reason
      });
      
      // Clear caches
      clearCache('appointments');
      clearCache('my_appointments');
      clearCache(`appointment_${id}`);
      console.log('✅ Appointment cancelled, cache cleared');
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Complete appointment (for doctors)
  completeAppointment: async (id, notes = '') => {
    try {
      const response = await apiClient.patch(`/appointments/${id}/complete/`, {
        notes
      });
      
      // Clear caches
      clearCache('appointments');
      clearCache('my_appointments');
      clearCache(`appointment_${id}`);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get upcoming appointments
  getUpcomingAppointments: async () => {
    try {
      const cacheKey = 'upcoming_appointments';
      
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      console.log('📡 Fetching upcoming appointments...');
      const response = await apiClient.get('/appointments/upcoming/');
      
      saveToCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get past appointments
  getPastAppointments: async () => {
    try {
      const cacheKey = 'past_appointments';
      
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      console.log('📡 Fetching past appointments...');
      const response = await apiClient.get('/appointments/past/');
      
      saveToCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get appointments by date range
  getAppointmentsByDateRange: async (startDate, endDate) => {
    try {
      const cacheKey = generateCacheKey('appointments_range', { startDate, endDate });
      
      const cached = getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
      
      const response = await apiClient.get('/appointments/', {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      
      saveToCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search appointments
  searchAppointments: async (searchTerm) => {
    try {
      // Don't cache search results (they change frequently)
      const response = await apiClient.get('/appointments/', {
        params: { search: searchTerm }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Manual cache refresh - for user to force refresh
  refreshCache: () => {
    clearCache();
    console.log('🔄 All caches cleared - next fetch will be fresh');
  },

  // Check cache status (for debugging)
  getCacheStatus: () => {
    const caches = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const age = Date.now() - data.timestamp;
          caches.push({
            key: key.replace(CACHE_PREFIX, ''),
            age: Math.round(age / 1000) + 's',
            valid: age < CACHE_DURATION
          });
        } catch (e) {
          // Invalid cache entry
        }
      }
    });
    return caches;
  }
};

export default appointmentService;