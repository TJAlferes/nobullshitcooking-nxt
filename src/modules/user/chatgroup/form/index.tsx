import axios from 'axios';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint } from '../../../../config/api';
import { useAuth } from '../../../../store';
import { LoaderButton } from '../../../shared/LoaderButton';
import { getCroppedImage } from '../../../shared/getCroppedImage';
import { uploadImageToAwsS3 } from '../../../shared/uploadImageToAwsS3';

export default function ChatgroupForm() {
  const router = useRouter();

  const params = useSearchParams();
  const chatgroup_id = params.get('chatgroup_id');

  const { authname } = useAuth();

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ chatgroup_name, setChatgroupName ] = useState("");

  const [ previousImageFilename, setPreviousImageFilename ] = useState("");
  const [ smallImage,            setSmallImage ]   = useState<File | null>(null);
  const [ tinyImage,             setTinyImage ]    = useState<File | null>(null);

  const imageRef = useRef<HTMLImageElement>();
  const [ image,             setImage ]             = useState<Image>(null);
  const [ crop,              setCrop ]              = useState<Crop>(initialCrop);
  const [ smallImagePreview, setSmallImagePreview ] = useState("");
  const [ tinyImagePreview,  setTinyImagePreview ]  = useState("");

  useEffect(() => {
    let mounted = true;

    async function getExistingChatgroupToEdit() {
      if (!chatgroup_id) {
        router.push(`/dashboard`);
        return;
      }
      
      setLoading(true);
      window.scrollTo(0, 0);

      const chatgroups = await axios.get(
        `${endpoint}/users/${authname}/chatgroups/${chatgroup_id}`
      );
      if (!chatgroups) {
        router.push(`/dashboard`);
        return;
      }

      setChatgroupName(chatgroup.chatgroup_name);
      setPreviousImageFilename(chatgroup.image.image_filename);

      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }

      if (chatgroup_id) {
        getExistingChatgroupToEdit();
      }
    }

    return () => {
      mounted = false;
    };
  }, []);  // do this in getServerSideProps???

  const changeChatgroupName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChatgroupName(e.target.value);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const small = await getCroppedImage(280, 172, imageRef.current, crop);
    const tiny = await getCroppedImage(28,  18,  imageRef.current, crop);
    if (!small || !tiny) return;
    setSmallImagePreview(small.preview);
    setTinyImagePreview(tiny.preview);
    setSmallImage(small.final);
    setTinyImage(tiny.final);
  };

  const onCropChange   = (crop: Crop) => setCrop(crop);
  const onCropComplete = (crop: Crop) => makeCrops(crop);
  const onImageLoaded  = (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;

  const cancelImage = () => {
    setSmallImagePreview("");
    setTinyImagePreview("");
    setImage(null);
    setSmallImage(null);
    setTinyImage(null);
  };

  const submit = async () => {
    if (!isValidChatgroupUpload({chatgroup_name, setFeedback})) return;

    const chatgroup_upload = {
      chatgroup_name,
      image: {
        image_filename: chatgroup_id ? previousImageFilename : "default",
        caption:        "",
        small:          smallImage,
        tiny:           tinyImage
      }
    };

    setLoading(true);

    // TO DO: AUTHORIZE ON BACK END, MAKE SURE THEY ACTUALLY OWN THE CHATGROUP
    // BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!
    if (chatgroup_id) {
      const chatgroup_update_upload = {chatgroup_id, ...chatgroup_upload};

      const { image } = chatgroup_update_upload;

      try {
        if (image.small && image.tiny) {
          const { data: { filename, fullSignature, tinySignature } } = await axios.post(
            `${endpoint}/user/signed-url`,
            {subfolder: `chatgroup/`},
            {withCredentials: true}
          );
          await uploadImageToAwsS3(fullSignature, image.small);
          await uploadImageToAwsS3(tinySignature, image.tiny);
          // TO DO: CHECK IF ABOVE OPERATIONS WERE SUCCESSFUL!!!
          image.image_filename = filename;
          image.small = null;
          image.tiny  = null;
        }
        const { data } = await axios.patch(
          `${endpoint}/users/${authname}/chatgroups/${chatgroup_id}`,
          chatgroup_update_upload,
          {withCredentials: true}
        );
        setFeedback(data.message);
        //await getMyChatgroups();
      } catch(err) {
        setFeedback('An error occurred. Please try again.');
      }
      //delay(4000);
      setFeedback("");
    } else {
      const { image } = chatgroup_upload;
      try {
        if (image.small && image.tiny) {
          const { data: { filename, fullSignature, tinySignature } } = await axios.post(
            `${endpoint}/user/signed-url`,
            {subfolder: `chatgroup/`},
            {withCredentials: true}
          );
          await uploadImageToAWSS3(fullSignature, image.small);
          await uploadImageToAWSS3(tinySignature, image.tiny);
          // TO DO: CHECK IF ABOVE OPERATIONS WERE SUCCESSFUL!!!
          image.image_filename = filename;
          image.small = null;
          image.tiny  = null;
        }
        const { data } = await axios.post(
          `${endpoint}/users/${authname}/chatgroups`,
          chatgroup_upload,
          {withCredentials: true}
        );
        setFeedback(data.message);
        //yield call(getMyEquipmentWorker);
      } catch(err) {
        setFeedback('An error occurred. Please try again.');
      }
      //delay(4000);
      setFeedback("");
    }
  };

  return (
    <div className="one-col chatgroup-form">
      {chatgroup_id ? <h1>Update Chatgroup</h1> : <h1>Create Chatgroup</h1>}

      <p className="feedback">{feedback}</p>

      <h2>Equipment Name</h2>
      <input
        className="name"
        onChange={changeChatgroupName}
        type="text"
        value={chatgroup_name}
      />

      <div className='equipment-image'>
        <h2>Image of Equipment</h2>

        {!image && (
          <div>
            {
              !chatgroup_id
              ? <img src={`${url}/default`} />
              : previousImageFilename && <img src={`${url}/${previousImageFilename}`} />
            }
            
            <h4>Change</h4>
            <input accept="image/*" name="image-input" onChange={onSelectFile} type="file" />
          </div>
        )}

        {image && (
          <div>
            <ReactCrop
              aspect={1}
              className="crop-tool"
              crop={crop}
              onChange={onCropChange}
              onComplete={onCropComplete}
              style={{minHeight: "300px"}}
            >
              <img onLoad={onImageLoaded} src={image as string} />
            </ReactCrop>

            <ToolTip />
  
            <div className="crops">
              <div className="crop-full-outer">
                <span>Small Size: </span>
                <img className="crop-full" src={smallImagePreview} />
              </div>

              <div className="crop-tiny-outer">
                <span>Tiny Size: </span>
                <img className="crop-tiny" src={tinyImagePreview} />
              </div>
            </div>

            <button
              className="image-cancel-button"
              disabled={loading}
              onClick={cancelImage}
            >Cancel</button>
          </div>
        )}
      </div>

      <div className="finish">
        <Link href="/dashboard" className="cancel-button">Cancel</Link>

        <LoaderButton
          className="submit-button"
          id="create_equipment_button"
          isLoading={loading}
          loadingText="Creating..."
          name="submit"
          onClick={submit}
          text="Submit"
        />
      </div>
    </div>
  );
}

const url = 'https://s3.amazonaws.com/nobsc/';

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Image = string | ArrayBuffer | null;

export function ToolTip() {
  return (
    <span className="crop-tool-tip">
      Move the crop to your desired position. The image&#40;s&#41; will be saved for you:
    </span>
  );
}

const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};  // TO DO: change to NOBSC images ratio

export function isValidChatgroupUpload({
  chatgroup_name,
  setFeedback
}: IsValidChatgroupUploadParams) {
  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validChatgroupName = chatgroup_name.trim() !== "";
  if (!validChatgroupName) return feedback("Enter chatgroup name.");

  return true;
}

type IsValidChatgroupUploadParams = {
  chatgroup_name: string;
  setFeedback:    (feedback: string) => void;
};

type ImageInfo = {
  image_filename: string;
  caption:        string;
};

type ImageUpload = ImageInfo & {
  small: File | null;
  tiny:  File | null;
};

export type ChatgroupUpload = {
  chatgroup_name: string;
  image:          ImageUpload;
};

export type ChatgroupUpdateUpload = ChatgroupUpload & {
  chatgroup_id: string;
};
