
export type Role = 'student' | 'admin';

export interface Booking {
  id: string;
  name: string;
  day: string;
  slot: number;
  clothesCount: number;
  timestamp: string;
}

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const TIME_SLOTS = [
  '8:00 AM - 10:00 AM', 
  '10:00 AM - 12:00 PM', 
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM', 
  '4:00 PM - 6:00 PM', 
  '6:00 PM - 8:00 PM'
];
