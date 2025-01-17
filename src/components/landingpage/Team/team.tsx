import React from 'react';
import Image from 'next/image';
import { teamMembers } from './memberDetails';
import { Catamaran } from 'next/font/google';

const catamaran = Catamaran({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const Team: React.FC = () => {
  return (
    <div className=' bg-gradient-to-r rounded-xl bg-team from-[#C476F0] to-[#EE85BB] py-10 lg:p-10'>
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-[0.5px] text-[#231D1F]">Our Team</h1>
        <p className="p-5 pb-10 text-[#1d1d1d] text-center font-catamaran font-semibold">
        Curious to know the names and faces behind this beauty!!? Meet our team; they are the secret of all our resources!!!
        </p>
      </div>
      <div className="flex flex-wrap justify-around pt-10 2xl:mx-20 xl:mx-5 mx-5 sm:mx-5">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center justify-center mb-10">
            <div className="mb-4">
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="rounded-full"
                width={144}
                height={144}
              />
            </div>
            <div className="text-center">
              <h1 className="font-bold text-2xl py-1 pt-2">{member.name}</h1>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='mx-auto justify-center flex mt-5'>
<button type="button" className='bg-[#FBD6FF] shadow-lg hover:shadow-[0px_8px_4px_rgba(0,0,0,0.25)] rounded-[60px] sm:p-3 p-2 sm:px-10 px-8 sm:text-2xl text-[22px]  text-center'>WANT TO BECOME A MEMBER?</button>

      </div>
    </div>
  );
};

export default Team;
