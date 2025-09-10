// app/layout.js
import './globals.css'; // <-- Asegúrate de que esta línea esté presente
import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Mis Pruebas',
  description: 'Aplicación para gestionar fechas de pruebas.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}