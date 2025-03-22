import { API_PATHS } from "./apiPaths";
import axiosInstance from "axios";

const uploadImage = async(imageFile) => {
    const formData = new FormData();
    //Append image file to form data
    formData.append('image',imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                'Content-Type':'multipart/form-data', //set header file for file upload
            },
        });

        return response.data; //return respoonse data

    }
    catch(error){
        console.log('Error uploading the image: ',error);
        throw error; //rethrow error for handling
    }
};

export default uploadImage;