'use client';

import React, { useState, useEffect } from 'react';
import { format, intervalToDuration, isAfter, differenceInCalendarDays } from 'date-fns';
import { es } from 'date-fns/locale';

export default function TestCard({ test }) {
  const testDate = new Date(test.testDate);
  const now = new Date();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimeLeft = () => {
      const currentTime = new Date();
      if (isAfter(testDate, currentTime)) {
        const duration = intervalToDuration({ start: currentTime, end: testDate });
        const totalDays = differenceInCalendarDays(testDate, currentTime);

        const { hours, minutes, seconds } = duration;

        const displayDays = totalDays || 0;
        const displayHours = hours || 0;
        const displayMinutes = minutes || 0;
        const displaySeconds = seconds || 0;
        // muestra el tiempo que falta
        setTimeLeft(`${displayDays} días, ${displayHours} horas, ${displayMinutes} min, ${displaySeconds} seg`);
      }
    };

    const intervalId = setInterval(updateTimeLeft, 1000);
    updateTimeLeft(); // Llama inmediatamente para evitar un retraso inicial

    return () => clearInterval(intervalId);
  }, [testDate]);

  // Determina si la prueba está a menos de 7 días de distancia
  const isApproaching = differenceInCalendarDays(testDate, now) < 7 && isAfter(testDate, now);

  return (
    <div className="bg-gray-800 p-6 -lg shadow-lg mb-4 text-white">
      <h3 className="text-xl font-bold mb-2">{test.subjectName}</h3>
      <p className="text-gray-400">Código: {test.subjectId}</p>
      <p className="text-gray-400">Fecha: {format(testDate, "PPP 'a las' p", { locale: es })}</p>
      <p className={`mt-4 text-2xl font-bold ${isApproaching ? 'text-red-400' : 'text-blue-400'}`}>
        Tiempo restante: {timeLeft}
      </p>
    </div>
  ); // se pregunta en la linea 44 si faltan menos de 7 dias, si es el caso lo pone en rojo 
}