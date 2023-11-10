import axios from 'axios';

export async function uploadImageToAwsS3(signature: string, image: File) {
  await axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
