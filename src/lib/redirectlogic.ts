import { getSession } from 'next-auth/react';

export const redirectLogic = async () => {
  const session = await getSession();
  console.log('session=====', session);
  if (session) {
    return '/office/dashboard';
  } else return '/studentportal';
};
