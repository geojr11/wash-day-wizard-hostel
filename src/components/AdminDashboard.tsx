
import { useState } from "react";
import { useLaundry } from "@/context/LaundryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/types";
import { BookingsList } from "@/components/BookingsList";
import { ArrowLeft, Clock, Calendar, WashingMachine, Users } from "lucide-react";

export const AdminDashboard = () => {
  const { bookings, setRole, getBookingsByDay } = useLaundry();
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[0]);

  const totalBookings = bookings.length;
  const uniqueStudents = new Set(bookings.map(booking => booking.name)).size;
  const totalClothes = bookings.reduce((sum, booking) => sum + booking.clothesCount, 0);

  const dayBookings = getBookingsByDay(selectedDay);
  
  const busyDay = DAYS_OF_WEEK.reduce((busiest, day) => {
    const dayCount = bookings.filter(booking => booking.day === day).length;
    const busiestCount = bookings.filter(booking => booking.day === busiest).length;
    return dayCount > busiestCount ? day : busiest;
  }, DAYS_OF_WEEK[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-laundry-navy flex items-center gap-2">
          <WashingMachine className="h-6 w-6" />
          Admin Dashboard
        </h1>
        <Button variant="outline" size="sm" onClick={() => setRole('student')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Change Role
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all days and slots
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Using the laundry service
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Busiest Day</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{busyDay}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {bookings.filter(b => b.day === busyDay).length} bookings
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bookings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={DAYS_OF_WEEK[0]} onValueChange={setSelectedDay}>
            <TabsList className="mb-4">
              {DAYS_OF_WEEK.map((day) => (
                <TabsTrigger key={day} value={day} className="flex-1">
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            {DAYS_OF_WEEK.map((day) => (
              <TabsContent key={day} value={day}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TIME_SLOTS.map((timeSlot, index) => {
                    const booking = dayBookings.find((b) => b.slot === index);
                    return (
                      <Card key={index} className={booking ? "border-laundry-teal" : ""}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">{timeSlot}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {booking ? (
                            <div className="space-y-1">
                              <p className="font-medium">{booking.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {booking.clothesCount} items
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Available</p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingsList 
            bookings={bookings} 
            emptyMessage="No bookings have been made yet"
            showStudentName={true}
            isAdmin={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
