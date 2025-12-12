'use client';

// 이미지 URL 상수들
const imgRectangle2823 = "https://www.figma.com/api/mcp/asset/cc74fff0-1ae9-4dc6-b4d8-f526bd5902fe";
const imgEllipse5500 = "https://www.figma.com/api/mcp/asset/7e39b871-077d-4fa6-9cf7-55b5f8bebfb2";
const imgVector833 = "https://www.figma.com/api/mcp/asset/05814c2d-2545-4a9a-8040-868e8804bcf7";
const imgVector832 = "https://www.figma.com/api/mcp/asset/8a44e89c-1d67-4b19-afb1-8b8a8bb29ece";
const imgEllipse5499 = "https://www.figma.com/api/mcp/asset/9c1cbc89-581f-41ba-a073-eafcf0493b01";
const imgEllipse5498 = "https://www.figma.com/api/mcp/asset/81675f3f-6938-46e0-8b5e-53f34d7c8251";
const img10 = "https://www.figma.com/api/mcp/asset/0ab6387e-012a-49b6-be51-665707d0b842";
const img11 = "https://www.figma.com/api/mcp/asset/2cb3162e-9046-4a06-b033-177d5a468d6a";
const img12 = "https://www.figma.com/api/mcp/asset/f787a775-c2b6-443b-9872-d2d5cd10196e";
const img13 = "https://www.figma.com/api/mcp/asset/cbb074d7-f6ac-4376-8d51-6db3e0c96656";
const img14 = "https://www.figma.com/api/mcp/asset/6f57b013-c8c4-4f5d-9c7f-fab2a620f1f7";

export default function Home() {
  return (
    <div className="bg-white min-h-[calc(100vh-8rem)] w-full overflow-x-hidden">
      {/* 주황색 배경 영역 (Desktop) */}
      <div className="h-[243.75px] overflow-hidden relative shrink-0 w-full max-w-full">
        <div className="absolute h-[243.75px] left-0 top-0 w-full">
          <img alt="" className="block max-w-none size-full object-cover" src={imgRectangle2823} />
        </div>
        <div className="absolute h-[392.578px] left-[-82.62px] top-[-29px] w-[467.285px] hidden sm:block">
          <div className="absolute inset-[-22.39%_-18.81%]">
            <img alt="" className="block max-w-none size-full" src={imgEllipse5500} />
          </div>
        </div>
        <div className="absolute flex h-[212.668px] items-center justify-center left-[-35.16px] top-[54.23px] w-[427.441px] hidden sm:block">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <div className="h-[212.668px] relative w-[427.441px]">
              <img alt="" className="block max-w-none size-full" src={imgVector833} />
            </div>
          </div>
        </div>
        <div className="absolute h-[181.574px] left-[-79.1px] top-[149.71px] w-[427.502px] hidden sm:block">
          <img alt="" className="block max-w-none size-full" src={imgVector832} />
        </div>
        <div className="absolute flex items-center justify-center left-[calc(50%-158.78px)] size-[304.117px] top-[calc(50%+98.74px)] translate-x-[-50%] translate-y-[-50%] hidden sm:block">
          <div className="flex-none rotate-[131.046deg]">
            <div className="relative size-[215.556px]">
              <div className="absolute inset-[-23.11%_-20.39%_-17.67%_-20.39%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5499} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[calc(50%+146.99px)] size-[197.888px] top-[-51.56px] translate-x-[-50%] hidden sm:block">
          <div className="flex-none rotate-[131.046deg]">
            <div className="relative size-[140.262px]">
              <div className="absolute inset-[-6.27%_-18.8%_-14.62%_-2.09%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5498} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex flex-col items-center left-1/2 top-[calc(50%-0.15px)] translate-x-[-50%] translate-y-[-50%] w-full max-w-[343px] px-4">
          <div className="h-[52.441px] relative shrink-0 w-[148.242px]">
            <div className="absolute inset-[1.48%_82.19%_0_0]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img10} />
              </div>
            </div>
            <div className="absolute inset-[0_0_0_68.67%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img11} />
              </div>
            </div>
            <div className="absolute inset-[32.59%_-3.66%_23.7%_-2.35%]">
              <img alt="" className="block max-w-none size-full" src={img12} />
            </div>
            <div className="absolute inset-[1.48%_65.71%_0.06%_18.58%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img13} />
              </div>
            </div>
            <div className="absolute inset-[1.48%_32.86%_0_36.07%]">
              <div className="absolute inset-0">
                <img alt="" className="block max-w-none size-full" src={img14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

