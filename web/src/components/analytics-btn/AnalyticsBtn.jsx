import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'

function AnalyticsBtn() {
  return (
    <div className='container px-10'>
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Personal area</p>
            <h4 className="text-white font-medium text-2xl drop-shadow-">Analytics</h4>
        </CardHeader>
        <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="https://res.cloudinary.com/djfnazn3y/image/upload/v1714320570/Artio/ccbc49byjw3ajtrq1ger.webp"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
            <p className="text-black text-tiny">Look at you carbon impact using </p>
            <p className="text-black text-tiny">Artio&apos;s analytics tool in your personal area.</p>
            </div>
            <Button className="text-tiny" color="primary" radius="full" size="sm">
            Go to analytics
            </Button>
        </CardFooter>
        </Card>
    </div>
  )
}

export default AnalyticsBtn