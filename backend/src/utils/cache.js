let appointmentCache = {
  timestamp: 0,
  data: null,
};

export const getCachedApointments = () => appointmentCache;

export const setCacheAppointments = (data) => {
  appointmentCache = {
    timestamp: Date.now(),
    data,
  };
};
