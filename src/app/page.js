import data from './data.json';
import TestCard from './components/TestCard';
import { isAfter } from 'date-fns';

export default function Home() {
  const now = new Date();

  // 1. Filtra las pruebas para descartar las que ya ocurrieron
  const upcomingTests = data.tests.filter((test) =>
    isAfter(new Date(test.testDate), now)
  );

  // 2. Ordena las pruebas por fecha de forma ascendente
  const sortedTests = upcomingTests.sort(
    (a, b) => new Date(a.testDate) - new Date(b.testDate)
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-5 text-white">
        {data.pageTitle}
      </h1>
      <div className="max-w-3xl mx-auto">
        {sortedTests.length > 0 ? (
          sortedTests.map((test) => (
            <TestCard key={test.subjectId} test={test} />
          ))
        ) : (
          <p className="text-center text-lg">
            ¡No hay pruebas próximas!
          </p>
        )}
      </div>
    </div>
  );
}