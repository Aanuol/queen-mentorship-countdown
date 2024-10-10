import { FC, useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface TimeDisplayProps {
  label: string;
  value: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeZone {
  city: string;
  offset: string;
}

// Constants
const EVENT_DATE = new Date('2024-11-09T00:00:00Z');

// Components
const TimeDisplay: FC<TimeDisplayProps> = ({ label, value }) => (
  <div className="flex flex-col items-center p-2 bg-purple-100 rounded-lg min-w-[80px]">
    <span className="text-2xl font-bold text-purple-800">{value}</span>
    <span className="text-sm text-purple-600">{label}</span>
  </div>
);

const CountdownTimer: FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = EVENT_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeZones: TimeZone[] = [
    { city: 'New York', offset: '-5:00' },
    { city: 'London', offset: '+0:00' },
    { city: 'Dubai', offset: '+4:00' },
    { city: 'Tokyo', offset: '+9:00' }
  ];

  const getTimeInTimezone = (offset: string): string => {
    const eventDate = new Date(EVENT_DATE);
    const utcOffset = parseInt(offset.replace(':', '.')) * 60 * 60 * 1000;
    const localTime = new Date(eventDate.getTime() + utcOffset);
    return localTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-purple-800">
            Queen Mentorship Forum CROWNING
          </CardTitle>
          <p className="text-center text-purple-600">November 9th, 2024</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-4 p-4">
              <TimeDisplay label="Days" value={timeLeft.days} />
              <TimeDisplay label="Hours" value={timeLeft.hours} />
              <TimeDisplay label="Minutes" value={timeLeft.minutes} />
              <TimeDisplay label="Seconds" value={timeLeft.seconds} />
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="text-purple-600" size={20} />
                <h3 className="font-semibold text-purple-800">Event Time Across the World</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeZones.map((tz) => (
                  <div key={tz.city} className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="font-medium text-purple-700">{tz.city}</p>
                    <p className="text-sm text-purple-600">{getTimeInTimezone(tz.offset)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountdownTimer;