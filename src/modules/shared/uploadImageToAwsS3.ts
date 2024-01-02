import axios from 'axios';

export async function uploadImageToAwsS3(signature: string, image: File) {
  const res = await axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
  console.log(res.status);
  return res;
}
