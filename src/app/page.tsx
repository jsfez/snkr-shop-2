import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-[600px] w-full flex-col items-center justify-center gap-y-4 lg:flex-row">
      <Link href="/sneakers">
        <div className="relative">
          <h1 className="w-fit text-[150px] font-bold text-slate-300 md:text-[200px] md:tracking-normal md:hover:text-slate-400 lg:text-[250px] lg:tracking-normal">
            AIR MAX
          </h1>
          <div className="absolute left-0 right-0 top-1/2 hidden border-b shadow-2xl lg:block" />
        </div>
        <Image
          src="/images/hero-img.png"
          alt="img"
          width={700}
          height={700}
          className="absolute left-[5%] top-[10%] h-[500px] w-[500px] object-cover transition-all duration-1000 ease-in-out hover:translate-y-4 md:left-[30%] md:h-[550px] md:w-[550px] lg:h-[700px] lg:w-[700px]"
        />
      </Link>

      <Button asChild>
        <Link href="/sneakers">Shop Now</Link>
      </Button>
    </div>
  );
}
