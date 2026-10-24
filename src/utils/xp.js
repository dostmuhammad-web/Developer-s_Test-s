export const XP_PER_LEVEL = 250;

export const levelFromXp = (xp) => Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1;

export const levelProgress = (xp) => {
  const safe = Math.max(0, xp);
  return {
    level: levelFromXp(safe),
    current: safe % XP_PER_LEVEL,
    needed: XP_PER_LEVEL,
    percent: Math.round(((safe % XP_PER_LEVEL) / XP_PER_LEVEL) * 100),
  };
};

export const levelTitle = (level) => {
  if (level >= 12) return 'Principal';
  if (level >= 9) return 'Architect';
  if (level >= 7) return 'Builder';
  if (level >= 5) return 'Explorer';
  if (level >= 3) return 'Apprentice';
  return 'Novice';
};
