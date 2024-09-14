'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

export const newStudentLogin = async (formData: any) => {
  console.log(formData);
  try {
    const response = await axios.post(
      'http://172.16.16.48:8080/public/login',
      formData,
    );
    const token = response.data.token;
    cookies().set('NSR-Authorization', token, {
      sameSite: 'lax',
      httpOnly: true,
      secure: true,
    });
    if (response.status === 200) {
      const status = response.status;
      console.log(status);
      return status;
    }
  } catch (error) {
    console.log(error);
  }
};
