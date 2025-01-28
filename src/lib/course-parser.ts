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
