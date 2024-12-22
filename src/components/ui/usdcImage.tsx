import { SVGProps } from 'react';

export function UsdcImage(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <div className="bg-white h-fit w-fit rounded-full z-10 border-[4px] border-primaryBorder">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#clip0_846_532)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 26C20.2042 26 26 20.2042 26 13C26 5.79579 20.2042 0 13 0C5.79579 0 0 5.79579 0 13C0 20.2042 5.79579 26 13 26ZM10.2375 20.7458C6.01249 19.2292 3.84578 14.5167 5.4167 10.3458C6.2292 8.0708 8.0167 6.33751 10.2375 5.52501C10.4542 5.41672 10.5625 5.25422 10.5625 4.9833V4.22501C10.5625 4.0083 10.4542 3.8458 10.2375 3.79172C10.1833 3.79172 10.075 3.79172 10.0208 3.8458C4.87499 5.4708 2.05828 10.9417 3.68328 16.0875C4.65828 19.1208 6.98749 21.45 10.0208 22.425C10.2375 22.5333 10.4542 22.425 10.5083 22.2083C10.5625 22.1542 10.5625 22.1 10.5625 21.9917V21.2333C10.5625 21.0708 10.4 20.8542 10.2375 20.7458ZM15.9792 3.8458C15.7625 3.73751 15.5458 3.8458 15.4917 4.06251C15.4375 4.11672 15.4375 4.1708 15.4375 4.27922V5.03751C15.4375 5.25422 15.6 5.4708 15.7625 5.57922C19.9875 7.0958 22.1542 11.8083 20.5833 15.9792C19.7708 18.2542 17.9833 19.9875 15.7625 20.8C15.5458 20.9083 15.4375 21.0708 15.4375 21.3417V22.1C15.4375 22.3167 15.5458 22.4792 15.7625 22.5333C15.8167 22.5333 15.925 22.5333 15.9792 22.4792C21.125 20.8542 23.9417 15.3833 22.3167 10.2375C21.3417 7.15001 18.9583 4.8208 15.9792 3.8458ZM16.575 15.0583C16.575 13.1625 15.4375 12.5125 13.1625 12.2417C11.5375 12.025 11.2125 11.5917 11.2125 10.8333C11.2125 10.0749 11.7542 9.58751 12.8375 9.58751C13.8125 9.58751 14.3542 9.91251 14.625 10.725C14.6792 10.8875 14.8417 10.9958 15.0042 10.9958H15.8708C16.0875 10.9958 16.25 10.8333 16.25 10.6167V10.5625C16.0333 9.3708 15.0583 8.45001 13.8125 8.34172V7.04172C13.8125 6.82501 13.65 6.66251 13.3792 6.6083H12.5667C12.35 6.6083 12.1875 6.7708 12.1333 7.04172V8.28751C10.5083 8.50422 9.4792 9.58751 9.4792 10.9417C9.4792 12.7292 10.5625 13.4333 12.8375 13.7042C14.3542 13.975 14.8417 14.3 14.8417 15.1667C14.8417 16.0334 14.0833 16.6292 13.0542 16.6292C11.6458 16.6292 11.1583 16.0333 10.9958 15.2208C10.9417 15.0042 10.7792 14.8958 10.6167 14.8958H9.69578C9.4792 14.8958 9.3167 15.0583 9.3167 15.275V15.3292C9.53328 16.6833 10.4 17.6583 12.1875 17.9292V19.2292C12.1875 19.4458 12.35 19.6083 12.6208 19.6625H13.4333C13.65 19.6625 13.8125 19.5 13.8667 19.2292V17.9292C15.4917 17.6583 16.575 16.5208 16.575 15.0583Z"
            fill="#2775CA"
          />
        </g>
        <defs>
          <clipPath id="clip0_846_532">
            <rect width="26" height="26" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}