"use client";

import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Loader2, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
  }>;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error('Failed to fetch weather data');
        const data = await res.json();
        setWeather(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError("Unable to load weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>
        <h3 className="font-semibold mb-4">Weather</h3>
        <Card className="p-4">
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </Card>
      </div>
    );
  }

  if (error || !weather?.weather?.[0]) {
    return (
      <div>
        <h3 className="font-semibold mb-4">Weather</h3>
        <Card className="p-4">
          <div className="flex justify-center items-center h-24">
            <p className="text-sm text-muted-foreground">{error || "Weather data unavailable"}</p>
          </div>
        </Card>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return Sun;
      case "clouds":
        return Cloud;
      case "rain":
        return CloudRain;
      default:
        return Cloud;
    }
  };

  const WeatherIcon = getWeatherIcon(weather.weather[0].main);

  return (
    <div>
      <h3 className="font-semibold mb-4">Weather</h3>
      <Card className="p-4">
        <div className="flex flex-col items-center">
          <WeatherIcon className="h-12 w-12 mb-2" />
          <p className="text-2xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-sm text-muted-foreground capitalize">
            {weather.weather[0].main}
          </p>
        </div>
      </Card>
    </div>
  );
}