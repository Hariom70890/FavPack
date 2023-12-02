import React, { TextareaHTMLAttributes } from "react";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   text: string;
   onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
   className: string;
   placeholder: string;
   rows: number;
}
export const TextArea = ({
   text,
   onChange,
   className,
   placeholder,
   rows,
   value,
}: Props) => {
   return (
      <>
         <label
            htmlFor="message"
            className="block mb-2 text-lg font-bold text-blue-500"
         >
            {text}
         </label>
         <textarea
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={`border border-teal-300 rounded p-2 w-full ${className}`}
            // className={className}
            id="message"
            rows={rows}
         ></textarea>
      </>
   );
};

// const TextArea: React.FC<Props> = ({ text, onChange, className, placeholder, rows, value, ...rest }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor="message" className="block text-lg font-semibold text-gray-600 mb-2">
//         {text}
//       </label>
//       <textarea
//         onChange={onChange}
//         value={value}
//         placeholder={placeholder}
//         className={`border border-gray-300 rounded p-2 w-full ${className}`}
//         id="message"
//         rows={rows}
//         {...rest}
//       ></textarea>
//     </div>
//   );
// };

// export default TextArea;
