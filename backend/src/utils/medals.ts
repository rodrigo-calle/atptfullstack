import { Medal, MedalStatus } from 'src/common/types';

const getExistingMedals = (
  currentMedals: Medal[],
  status: MedalStatus,
): boolean => {
  const currentMedal = currentMedals.find((medal) => medal.status === status);

  if (currentMedal && currentMedal.verified) {
    return true;
  }

  return false;
};

export function getMedalAfterUpload(
  currentMedals: Medal[] | null = [],
  newClientsRegistered: number,
  currentClientsRegistered: number,
): {
  newMedals: Medal[];
  lastClientsRegistered: number;
  newClientsRegistered: number;
} {
  const totalMedals = newClientsRegistered + currentClientsRegistered;
  const newMedals: Medal[] = [...currentMedals];
  if (currentMedals.length === 0) {
    if (newClientsRegistered >= 10) {
      newMedals.push({
        name: 'MADERA',
        quantityRequired: 10,
        status: MedalStatus.MADERA,
        verified: false,
      });
    }
    if (newClientsRegistered >= 20) {
      newMedals.push({
        name: 'HIERRO',
        quantityRequired: 20,
        status: MedalStatus.HIERRO,
        verified: false,
      });
    }
    if (newClientsRegistered >= 30) {
      newMedals.push({
        name: 'BRONCE',
        quantityRequired: 30,
        status: MedalStatus.BRONCE,
        verified: false,
      });
    }
    if (newClientsRegistered >= 40) {
      newMedals.push({
        name: 'PLATA',
        quantityRequired: 40,
        status: MedalStatus.PLATA,
        verified: false,
      });
    }
    if (newClientsRegistered >= 50) {
      newMedals.push({
        name: 'ORO',
        quantityRequired: 50,
        status: MedalStatus.ORO,
        verified: false,
      });
    }
    if (newClientsRegistered >= 60) {
      newMedals.push({
        name: 'PLATINIUM',
        quantityRequired: 60,
        status: MedalStatus.PLATINIUM,
        verified: false,
      });
    }
    if (newClientsRegistered >= 70) {
      newMedals.push({
        name: 'DIAMANTE',
        quantityRequired: 70,
        status: MedalStatus.DIAMANTE,
        verified: false,
      });
    }
    if (newClientsRegistered >= 80) {
      newMedals.push({
        name: 'INMORTAL',
        quantityRequired: 80,
        status: MedalStatus.INMORTAL,
        verified: false,
      });
    }
    if (newClientsRegistered >= 90) {
      newMedals.push({
        name: 'RADIANTE',
        quantityRequired: 90,
        status: MedalStatus.RADIANTE,
        verified: false,
      });
    }
  } else {
    console.log(currentMedals);
    if (totalMedals >= 10) {
      const verified = getExistingMedals(currentMedals, MedalStatus.MADERA);
      newMedals.push({
        name: 'MADERA',
        quantityRequired: 10,
        status: MedalStatus.MADERA,
        verified,
      });
    }
    if (totalMedals >= 20) {
      const verified = getExistingMedals(currentMedals, MedalStatus.HIERRO);
      newMedals.push({
        name: 'HIERRO',
        quantityRequired: 20,
        status: MedalStatus.HIERRO,
        verified,
      });
    }
    if (totalMedals >= 30) {
      const verified = getExistingMedals(currentMedals, MedalStatus.BRONCE);
      newMedals.push({
        name: 'BRONCE',
        quantityRequired: 30,
        status: MedalStatus.BRONCE,
        verified,
      });
    }
    if (totalMedals >= 40) {
      const verified = getExistingMedals(currentMedals, MedalStatus.PLATA);
      newMedals.push({
        name: 'PLATA',
        quantityRequired: 40,
        status: MedalStatus.PLATA,
        verified,
      });
    }
    if (totalMedals >= 50) {
      const verified = getExistingMedals(currentMedals, MedalStatus.ORO);
      newMedals.push({
        name: 'ORO',
        quantityRequired: 50,
        status: MedalStatus.ORO,
        verified,
      });
    }
    if (totalMedals >= 60) {
      const verified = getExistingMedals(currentMedals, MedalStatus.PLATINIUM);
      newMedals.push({
        name: 'PLATINIUM',
        quantityRequired: 60,
        status: MedalStatus.PLATINIUM,
        verified,
      });
    }
    if (totalMedals >= 70) {
      const verified = getExistingMedals(currentMedals, MedalStatus.DIAMANTE);
      newMedals.push({
        name: 'DIAMANTE',
        quantityRequired: 70,
        status: MedalStatus.DIAMANTE,
        verified,
      });
    } else if (totalMedals >= 80) {
      const verified = getExistingMedals(currentMedals, MedalStatus.INMORTAL);
      newMedals.push({
        name: 'INMORTAL',
        quantityRequired: 80,
        status: MedalStatus.INMORTAL,
        verified,
      });
    }
    if (totalMedals >= 90) {
      const verified = getExistingMedals(currentMedals, MedalStatus.RADIANTE);
      newMedals.push({
        name: 'RADIANTE',
        quantityRequired: 90,
        status: MedalStatus.RADIANTE,
        verified,
      });
    }
  }
  console.log({
    newMedals,
    lastClientsRegistered: currentClientsRegistered,
    newClientsRegistered,
  });
  return {
    newMedals,
    lastClientsRegistered: currentClientsRegistered,
    newClientsRegistered,
  };
}
