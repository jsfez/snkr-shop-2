import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col gap-y-4 lg:flex-row  items-center justify-center w-full h-[600px]">
      <div className="flex flex-col">
        <Link href="/sneakers">
          <h1 className="text-[150px] md:text-[200px] md:tracking-normal lg:text-[250px] text-slate-300 dark:text-slate-50 font-bold lg:tracking-wide lg:leading-4 lg:shadow-md md:hover:text-slate-400">
            AIR MAX
          </h1>
          <Image
            src="/images/hero-img.png"
            alt="img"
            width={700}
            height={700}
            className="absolute w-[500px] h-[500px] object-cover md:w-[550px] md:h-[550px] lg:w-[700px] lg:h-[700px] top-[10%] left-[5%] md:left-[30%] hover:translate-y-4 transition-all ease-in-out duration-1000"
          />
        </Link>
      </div>

      <Button asChild>
        <Link href="/sneakers">Explore Now</Link>
      </Button>
    </div>
  );
}
