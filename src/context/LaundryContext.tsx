
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, Role } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface LaundryContextType {
  bookings: Booking[];
  role: Role;
  isAuthenticated: boolean;
  username: string;
  addBooking: (booking: Omit<Booking, 'id' | 'timestamp'>) => void;
  removeBooking: (id: string) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  setRole: (role: Role) => void;
  isSlotAvailable: (day: string, slot: number) => boolean;
  getBookingsByDay: (day: string) => Booking[];
  getBookingsByStudent: (name: string) => Booking[];
  login: (username: string) => void;
  logout: () => void;
  uploadFile: (file: File) => void;
  uploadedFiles: string[];
}

const LaundryContext = createContext<LaundryContextType | undefined>(undefined);

export const LaundryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('laundryBookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });
  
  const [role, setRole] = useState<Role>(() => {
    const savedRole = localStorage.getItem('laundryRole');
    return (savedRole as Role) || 'student';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('laundryAuth') === 'true';
  });

  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('laundryUsername') || '';
  });

  const [uploadedFiles, setUploadedFiles] = useState<string[]>(() => {
    const savedFiles = localStorage.getItem('uploadedFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('laundryBookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('laundryRole', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('laundryAuth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('laundryUsername', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const login = (user: string) => {
    setUsername(user);
    setIsAuthenticated(true);
    toast({
      title: "Login Successful",
      description: `Welcome ${user}!`,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const uploadFile = (file: File) => {
    // In a real app, this would upload to a server
    // Here we'll just store the file name
    setUploadedFiles(prev => [...prev, file.name]);
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'timestamp'>) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setBookings([...bookings, newBooking]);
    toast({
      title: "Booking Successful",
      description: `You've booked a slot for ${booking.day} at ${booking.slot + 1}.`,
    });
  };

  const removeBooking = (id: string) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
    toast({
      title: "Booking Removed",
      description: "The booking has been cancelled.",
    });
  };

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      )
    );
    toast({
      title: "Booking Updated",
      description: "The booking details have been updated.",
    });
  };

  const isSlotAvailable = (day: string, slot: number) => {
    return !bookings.some((booking) => booking.day === day && booking.slot === slot);
  };

  const getBookingsByDay = (day: string) => {
    return bookings.filter((booking) => booking.day === day);
  };

  const getBookingsByStudent = (name: string) => {
    return bookings.filter((booking) => booking.name.toLowerCase() === name.toLowerCase());
  };

  return (
    <LaundryContext.Provider
      value={{
        bookings,
        role,
        isAuthenticated,
        username,
        addBooking,
        removeBooking,
        updateBooking,
        setRole,
        isSlotAvailable,
        getBookingsByDay,
        getBookingsByStudent,
        login,
        logout,
        uploadFile,
        uploadedFiles,
      }}
    >
      {children}
    </LaundryContext.Provider>
  );
};

export const useLaundry = (): LaundryContextType => {
  const context = useContext(LaundryContext);
  if (context === undefined) {
    throw new Error('useLaundry must be used within a LaundryProvider');
  }
  return context;
};
