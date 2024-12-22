'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//bg-surfacePrimary
export default function BottomBar() {
  const pathname = usePathname();
  return (
    <nav className="hidden fixed lg:hidden bg-none inset-x-0 bottom-0 z-50 shadow-md">
      <div className="p-3 pb-8 md:py-5 bg-surfacePrimary backdrop-blur-xl">
        <div className="max-w-lg mx-auto flex gap-10 justify-center items-center">
          <Link
            href="/"
            className={`${
              pathname === '/dfdf' ? 'bg-menuCard' : 'bg-transparent'
            } flex items-center p-3 w-fit rounded-xl `}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0.5C7.43959 0.500001 0.499999 7.43959 0.5 16C0.500001 24.5604 7.43959 31.5 16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.499999 16 0.5ZM8.25 14.63C8.25 15.3866 8.86338 16 9.62002 16H14.0625L14.0625 23.75C14.0625 24.8201 14.9299 25.6875 16 25.6875V25.6875C17.0701 25.6875 17.9375 24.8201 17.9375 23.75V16L22.38 16C23.1366 16 23.75 15.3866 23.75 14.63V14.63C23.75 14.2666 23.6057 13.9182 23.3487 13.6612L17.37 7.68252C16.6134 6.92588 15.3866 6.92588 14.63 7.68252L8.65127 13.6612C8.39434 13.9182 8.25 14.2666 8.25 14.63V14.63Z"
                fill={pathname === '/' ? '#0091EB' : '#7F7F7F'}
              />
            </svg>
          </Link>
          <Link
            href={'/leaderboard'}
            className={`${
              pathname === '/dfdf' ? 'bg-menuCard' : 'bg-transparent'
            } flex items-center p-3 w-fit rounded-xl `}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 1.4375C7.5 0.643591 8.14359 0 8.9375 0H21.0625C21.8564 0 22.5 0.643591 22.5 1.4375V3.75H28.5625C29.3564 3.75 30 4.39359 30 5.1875V7.5C30 12.1058 26.6787 15.9358 22.3005 16.7257C21.6632 19.432 19.5601 21.5726 16.875 22.2637V26.25H21.0625C21.8564 26.25 22.5 26.8936 22.5 27.6875V28.5625C22.5 29.3564 21.8564 30 21.0625 30H8.9375C8.14359 30 7.5 29.3564 7.5 28.5625V27.6875C7.5 26.8936 8.14359 26.25 8.9375 26.25H13.125V22.2637C10.4399 21.5726 8.33677 19.432 7.6995 16.7257C3.32129 15.9358 0 12.1058 0 7.5V5.1875C0 4.39359 0.643591 3.75 1.4375 3.75H7.5V1.4375ZM22.5 12.8049V7.5H25.9625C26.1213 7.5 26.2508 7.629 26.2428 7.78758C26.1258 10.1112 24.5987 12.0631 22.5 12.8049ZM7.5 7.5H4.0375C3.87872 7.5 3.74924 7.629 3.75722 7.78758C3.87424 10.1112 5.4013 12.0631 7.5 12.8049V7.5Z"
                fill={pathname === '/leaderboard' ? '#0091EB' : '#7F7F7F'}
              />
            </svg>
          </Link>
          <Link
            href="profile"
            className={`${
              pathname === '/dfdf' ? 'bg-menuCard' : 'bg-transparent'
            } flex items-center p-3 w-fit rounded-xl `}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 16.875C17.5888 16.875 19.6875 14.7763 19.6875 12.1875C19.6875 9.59866 17.5888 7.5 15 7.5C12.4112 7.5 10.3125 9.59866 10.3125 12.1875C10.3125 14.7763 12.4112 16.875 15 16.875Z"
                fill={pathname === '/profile' ? '#0091EB' : '#7F7F7F'}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM11.25 18.75C9.00545 18.75 7.06795 20.0647 6.16551 21.966C4.65282 20.0502 3.75 17.6305 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15C26.25 17.6305 25.3472 20.0502 23.8345 21.966C22.932 20.0647 20.9946 18.75 18.75 18.75H11.25Z"
                fill={pathname === '/profile' ? '#0091EB' : '#7F7F7F'}
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// export const NavigationDropdown = () => {
//     const pathname = usePathname();
//     const { publicKey } = useWallet();

//     return (
//       <div className='black lg:hidden'>
//         <DropdownMenu>
//           <DropdownMenuTrigger className='active:scale-95 px-3 py-3 active:duration-75 active:ease-in-out active:transform rounded-full flex flex-row gap-2 items-center justify-center focus-visible:outline-none text-textPrimary'>
//             <MenuIcon className='h-6 w-6' />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align='start'>
//             <DropdownMenuItem
//               className={`${pathname === '/' ? 'bg-menuCard' : 'bg-transparent'}`}
//             >

//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className={`${
//                 pathname === '/leaderboard' ? 'bg-menuCard' : 'bg-transparent'
//               }`}
//             >

//             </DropdownMenuItem>
//             <DropdownMenuItem
//               className={`${
//                 pathname === '/profile' ? 'bg-menuCard' : 'bg-transparent'
//               } ${publicKey ? 'block' : 'hidden'}`}
//             >
//               <Link href={'/profile'} className='flex items-center w-full gap-3'>
//                 <svg
//                   xmlns='http://www.w3.org/2000/svg'
//                   width='24'
//                   height='24'
//                   viewBox='0 0 28 28'
//                   fill='none'
//                 >
//                   <path
//                     d='M12 13.5C14.0711 13.5 15.75 11.8211 15.75 9.75C15.75 7.67893 14.0711 6 12 6C9.92893 6 8.25 7.67893 8.25 9.75C8.25 11.8211 9.92893 13.5 12 13.5Z'
//                     fill={pathname === '/profile' ? '#0091EB' : '#7F7F7F'}
//                   />
//                   <path
//                     fillRule='evenodd'
//                     clipRule='evenodd'
//                     d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM9 15C7.20436 15 5.65436 16.0517 4.93241 17.5728C3.72226 16.0401 3 14.1044 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.1044 20.2777 16.0401 19.0676 17.5728C18.3456 16.0517 16.7956 15 15 15H9Z'
//                     fill={pathname === '/profile' ? '#0091EB' : '#7F7F7F'}
//                   />
//                 </svg>
//                 <p
//                   className={`d3-font text-base ${
//                     pathname === '/profile'
//                       ? 'text-textPrimary'
//                       : 'text-textSecondary'
//                   } `}
//                 >
//                   Profile
//                 </p>
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem className='hidden'>

//             </DropdownMenuItem>
//             <DropdownMenuItem className='hidden p-3 w-full'>
//               <Button className='w-full bg-surfaceInverse shadow-none text-textInverse'>
//                 Check out FAQ
//               </Button>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     );
//   };
