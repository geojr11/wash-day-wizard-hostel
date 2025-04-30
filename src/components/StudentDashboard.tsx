
import { useState } from "react";
import { useLaundry } from "@/context/LaundryContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/types";
import { BookingsList } from "@/components/BookingsList";
import { ArrowLeft, Calendar, WashingMachine } from "lucide-react";

export const StudentDashboard = () => {
  const { addBooking, isSlotAvailable, bookings, setRole } = useLaundry();
  const [name, setName] = useState("");
  const [day, setDay] = useState(DAYS_OF_WEEK[0]);
  const [slot, setSlot] = useState<number | null>(null);
  const [clothesCount, setClothesCount] = useState(1);
  const [studentBookings, setStudentBookings] = useState<boolean>(false);
  const [studentName, setStudentName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || slot === null || clothesCount < 1) return;

    addBooking({
      name,
      day,
      slot,
      clothesCount,
    });

    // Reset form
    setName("");
    setSlot(null);
    setClothesCount(1);
  };

  const filteredBookings = bookings.filter(
    (booking) => booking.name.toLowerCase() === studentName.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-laundry-navy flex items-center gap-2">
          <WashingMachine className="h-6 w-6" />
          Student Dashboard
        </h1>
        <Button variant="outline" size="sm" onClick={() => setRole('student')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Change Role
        </Button>
      </div>

      <Tabs defaultValue="book" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="book" className="text-lg">Book a Slot</TabsTrigger>
          <TabsTrigger value="my-bookings" className="text-lg">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="book">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="day">Select Day</Label>
                    <Select
                      value={day}
                      onValueChange={setDay}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_OF_WEEK.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clothesCount">Number of Clothes</Label>
                    <Input
                      id="clothesCount"
                      type="number"
                      min="1"
                      max="20"
                      value={clothesCount}
                      onChange={(e) => setClothesCount(parseInt(e.target.value))}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={slot === null} className="w-full">
                    Book Slot
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Available Time Slots for {day}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Select a time slot below to book your laundry
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {TIME_SLOTS.map((timeSlot, index) => {
                    const available = isSlotAvailable(day, index);
                    return (
                      <Button
                        key={index}
                        variant={slot === index ? "default" : "outline"}
                        className={`justify-start h-auto py-3 px-4 ${
                          available
                            ? slot === index
                              ? "bg-laundry-teal text-white"
                              : "hover:border-laundry-teal hover:text-laundry-teal"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => available && setSlot(index)}
                        disabled={!available}
                      >
                        <div className="flex items-center w-full justify-between">
                          <span>{timeSlot}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            available
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}>
                            {available ? "Available" : "Booked"}
                          </span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-bookings">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <Label htmlFor="studentName">Enter your name to view your bookings</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="studentName"
                    placeholder="Your full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  <Button onClick={() => setStudentBookings(true)}>Search</Button>
                </div>
              </div>

              {studentBookings && (
                <BookingsList 
                  bookings={filteredBookings}
                  emptyMessage="You don't have any bookings yet"
                  showStudentName={false}
                  isAdmin={false}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
