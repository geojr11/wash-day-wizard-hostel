
import { useState, useRef } from "react";
import { useLaundry } from "@/context/LaundryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/types";
import { BookingsList } from "@/components/BookingsList";
import { ArrowLeft, Clock, Calendar, WashingMachine, Users, Upload, File } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AdminDashboard = () => {
  const { bookings, role, setRole, getBookingsByDay, uploadFile, uploadedFiles, logout, username } = useLaundry();
  const [selectedDay, setSelectedDay] = useState(DAYS_OF_WEEK[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalBookings = bookings.length;
  const uniqueStudents = new Set(bookings.map(booking => booking.name)).size;
  const totalClothes = bookings.reduce((sum, booking) => sum + booking.clothesCount, 0);

  const dayBookings = getBookingsByDay(selectedDay);
  
  const busyDay = DAYS_OF_WEEK.reduce((busiest, day) => {
    const dayCount = bookings.filter(booking => booking.day === day).length;
    const busiestCount = bookings.filter(booking => booking.day === busiest).length;
    return dayCount > busiestCount ? day : busiest;
  }, DAYS_OF_WEEK[0]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-laundry-navy flex items-center gap-2">
          <WashingMachine className="h-6 w-6" />
          Admin Dashboard
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

      <Tabs defaultValue="bookings" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">Bookings Overview</TabsTrigger>
          <TabsTrigger value="documents">Document Upload</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Day</CardTitle>
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
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Upload Laundry Records</h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-laundry-teal transition-all"
                    onClick={triggerFileInput}>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm font-medium mb-1">Click to upload file</p>
                    <p className="text-xs text-gray-500">
                      Support for Excel, PDF, or CSV
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.csv,.xlsx,.xls"
                    />
                    <Button 
                      variant="outline" 
                      className="mt-4 border-laundry-teal text-laundry-teal hover:bg-laundry-teal hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                      }}
                    >
                      Select File
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Uploaded Documents</h3>
                  {uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center p-3 border rounded-md">
                          <File className="h-5 w-5 mr-2 text-laundry-navy" />
                          <span className="flex-1 text-sm truncate">{file}</span>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No documents uploaded yet
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
