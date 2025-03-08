'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ProfilePicture = () => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    if (session?.user?.accessToken) {
      const getProfilePicture = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/api/get-user-photo`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );

          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

      getProfilePicture();
    }
  }, [session?.user?.accessToken]);
  return (
    <div>
      <Image
        className="object-cover"
        src={imageUrl}
        alt="user"
        fill
        sizes="50vw"
        priority
      />
    </div>
  );
};

export default ProfilePicture;
