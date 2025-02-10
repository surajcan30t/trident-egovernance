export const parseCourse = (course: string) => {
  if (course === 'B.TECH.' || course === 'B.Tech.') {
    return 'BTECH';
  } else if (course === 'M.TECH.' || course === 'M.Tech.') {
    return 'MTECH';
  } else if (course === 'MBA' || course === 'MCA') {
    return course;
  }
  return course;
};

export const unParseCourse = (course: string) => {
  if (course === 'BTECH' || course === 'BTech') {
    return 'B.TECH.';
  } else if (course === 'MTECH' || course === 'MTech') {
    return 'M.TECH.';
  } else if (course === 'MBA' || course === 'MCA') {
    return course;
  }
  return course;
};
