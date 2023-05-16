import * as React from "react";
import * as commands from "@uiw/react-md-editor/lib/commands";

export const getImageWithSize = (
  width: number = 12,
  height: number = 12
): commands.ICommand => {
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.files);
  };
  const ref = React.useRef<HTMLInputElement>(null);

  return {
    ...commands.image,
    // icon: (
    //   <>
    //     <svg width={width} height={height} viewBox="0 0 20 20">
    //       <path
    //         fill="currentColor"
    //         d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
    //       />
    //     </svg>
    //     <input
    //       ref={ref}
    //       className="hidden"
    //       type="file"
    //       onChange={onFileChange}
    //     />
    //   </>
    // ),
    render: () => {
      return (
        <>
          <button
            type="button"
            data-name="image"
            aria-label="Add image (ctrl + k)"
            title="Add image (ctrl + k)"
          >
            <label className="cursor-pointer" htmlFor="imagesUpload">
              <svg width="18" height="18" viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                ></path>
              </svg>
            </label>
            <input
              ref={ref}
              id="imagesUpload"
              className="hidden"
              type="file"
              onChange={onFileChange}
            />
          </button>
        </>
      );
    },
  };
};
