
import React from "react";
import { useLaundry } from "@/context/LaundryContext";
import { Booking, TIME_SLOTS } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { Trash } from "lucide-react";

interface BookingsListProps {
  bookings: Booking[];
  emptyMessage: string;
  showStudentName: boolean;
  isAdmin: boolean;
}

export const BookingsList = ({ 
  bookings, 
  emptyMessage,
  showStudentName,
  isAdmin
}: BookingsListProps) => {
  const { removeBooking } = useLaundry();

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const sortedBookings = [...bookings].sort((a, b) => {
    // Sort by day first (Monday to Saturday)
    const dayA = a.day;
    const dayB = b.day;
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayComparison = dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
    
    if (dayComparison !== 0) return dayComparison;
    
    // Then sort by slot (8AM to 8PM)
    return a.slot - b.slot;
  });

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {showStudentName && <TableHead>Student</TableHead>}
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Booked On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBookings.map((booking) => (
            <TableRow key={booking.id}>
              {showStudentName && <TableCell className="font-medium">{booking.name}</TableCell>}
              <TableCell>{booking.day}</TableCell>
              <TableCell>{TIME_SLOTS[booking.slot]}</TableCell>
              <TableCell>{booking.clothesCount}</TableCell>
              <TableCell>{format(new Date(booking.timestamp), 'MMM d, yyyy')}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this booking? This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, keep booking</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => removeBooking(booking.id)}
                      >
                        Yes, cancel booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
