import { Driver, Race, TeamStanding } from '../types/f1';

export const transformDriverStandings = (apiDrivers: any[]): Driver[] => {
  return apiDrivers.map((driver) => ({
    id: driver.Driver.driverId,
    name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    team: driver.Constructors[0].name,
    points: parseInt(driver.points),
    wins: parseInt(driver.wins),
    podiums: parseInt(driver.wins) + countPodiums(driver),
  }));
};

export const transformConstructorStandings = (apiConstructors: any[]): TeamStanding[] => {
  return apiConstructors.map((constructor) => ({
    team: constructor.Constructor.name,
    points: parseInt(constructor.points),
    wins: parseInt(constructor.wins),
  }));
};

export const transformRaces = async (apiRaces: any[]): Promise<Race[]> => {
  const transformedRaces = await Promise.all(apiRaces.map(async (race) => {
    // Check for sprint results
    const sprintResponse = await fetch(
      `https://ergast.com/api/f1/${race.season}/${race.round}/sprint.json`
    );
    const sprintData = await sprintResponse.json();
    const sprintResults = sprintData.MRData.RaceTable.Races[0]?.SprintResults || [];
    const hasSprint = sprintResults.length > 0;
    const sprintWinner = hasSprint ? 
      `${sprintResults[0].Driver.givenName} ${sprintResults[0].Driver.familyName}` : 
      undefined;

    return {
      id: race.round,
      name: race.raceName,
      circuit: race.Circuit.circuitName,
      date: formatDate(race.date),
      winner: `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`,
      fastestLap: race.Results[0].FastestLap?.Time?.time || 'N/A',
      hasSprint,
      sprintWinner,
    };
  }));

  return transformedRaces;
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Helper function to count podium finishes
const countPodiums = (driver: any): number => {
  const results = driver.Results || [];
  return results.filter((result: any) => 
    parseInt(result.position) <= 3 && result.position !== driver.wins
  ).length;
};