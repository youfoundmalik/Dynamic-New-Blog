import errorImg from "@/assets/error-image.svg";

const ErrorPage: React.FC<{ error: Error; resetErrorBoundary: () => void }> = ({ error, resetErrorBoundary }) => {
  return (
    <div className='text-center 2xl:!mt-5 !mx-auto !px-5 flex flex-col items-center !gap-5'>
      <img src={errorImg} className='w-full md:w-[350px] lg:w-[230px] 2xl:w-[350px]' alt='Error' />
      <div className='flex flex-col gap-1'>
        <h1 className='!text-2xl md:!text-3xl !font-bold text-cyan-900'>Something went wrong!</h1>
        <p className='!text-base text-gray-500'>{error.message || "Failed to load news at this time."}</p>
      </div>
      <button
        onClick={resetErrorBoundary}
        className='!px-4 !bg-gradient-to-r !to-cyan-800 !from-cyan-500 !h-[45px] !w-full md:!w-[200px] !rounded !font-medium !text-white'
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
