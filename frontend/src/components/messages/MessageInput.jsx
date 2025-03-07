import { useState ,useRef} from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import toast from "react-hot-toast";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const fileInputRef = useRef(null);
	const [imagePreview, setImagePreview] = useState(null);



	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
	const handleImageChange = (e) => {

		const file = e.target.files[0];
		return
		// if (!file.type.startsWith("image/")) {
		//   toast.error("Please select an image file");
		//   return;
		}
	// 	const reader = new FileReader();
	// 	reader.onloadend = () => {
	// 	  setImagePreview(reader.result);
	// 	};
	// 	reader.readAsDataURL(file);
	//   };
	

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				 <input     type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;


