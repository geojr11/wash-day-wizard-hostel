
import { useState, useEffect } from "react";
import { useLaundry } from "@/context/LaundryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingsList } from "@/components/BookingsList";
import { ArrowLeft, WashingMachine, Calendar, Clock } from "lucide-react";
import { Booking } from "@/types";

export const StudentDashboard = () => {
  const { bookings, logout, username } = useLaundry();
  const [studentBookings, setStudentBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    // Filter bookings for current student
    const filteredBookings = bookings.filter(
      (booking) => booking.name.toLowerCase() === username.toLowerCase()
    );
    setStudentBookings(filteredBookings);
  }, [bookings, username]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-laundry-navy flex items-center gap-2">
          <WashingMachine className="h-6 w-6" />
          Student Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Logged in as: {username}</span>
          <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentBookings.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total laundry bookings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Booking</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {studentBookings.length > 0 ? (
              <>
                <div className="text-lg font-medium">
                  {studentBookings[0].day}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(studentBookings[0].timestamp).toLocaleDateString()}
                </p>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">No bookings yet</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <WashingMachine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentBookings.reduce((sum, booking) => sum + booking.clothesCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Clothes washed to date
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Laundry History</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingsList 
            bookings={studentBookings}
            emptyMessage="You don't have any bookings yet"
            showStudentName={false}
            isAdmin={false}
          />
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">
              To make a new booking, please visit the laundry room and speak with the administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
