"use client";


export default function SkeletonDate() {
  return (
    <div className='flex items-center gap-1.5'>
      <div className='h-3.5 w-3.5 animate-pulse rounded bg-white/10 md:h-4 md:w-4' />
      <div className='h-3.5 w-24 animate-pulse rounded bg-white/10 md:w-32' />
    </div>
  );
}
