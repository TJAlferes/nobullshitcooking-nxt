import axios                           from 'axios';
import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop }             from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint }                        from '../../../config/api';
import { useTypedSelector as useSelector } from '../../../redux';
//import { CropPreview }                     from '../../shared/CropPreview';
import { LoaderButton }                    from '../../shared/LoaderButton';
import { getCroppedImage }                 from '../../shared/getCroppedImage';
import type { Ownership }                  from '../../shared/types';
//import { getMyPrivateEquipmentWorker }     from '../user/private/data/network';

export default function EquipmentForm({ ownership }: Props) {
  const router = useRouter();

  const params = useSearchParams();
  const equipment_id = params.get('equipment_id');

  const equipment_types = useSelector(state => state.data.equipment_types);
  const authname        = useSelector(state => state.authentication.authname);
  const message         = useSelector(state => state.system.message);

  const allowedEquipment = useAllowedEquipment(ownership);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ equipment_type_id, setEquipmentTypeId ] = useState(0);
  const [ equipment_name,    setEquipmentName ]   = useState("");
  const [ notes,             setNotes ]           = useState("");

  /*const [ equipment_info, setEquipmentInfo ] = useState({
    equipment_type_id: 0,
    equipment_name:    "",
    notes:             ""
  });*/

  const [ previousImageFilename, setPreviousImageFilename ] = useState("");
  const [ smallImage,            setSmallImage ]   = useState<File | null>(null);
  const [ tinyImage,             setTinyImage ]    = useState<File | null>(null);
  const [ imageCaption,          setImageCaption ] = useState("");

  const imageRef = useRef<HTMLImageElement>();
  const [ image,             setImage ]             = useState<Image>(null);
  const [ crop,              setCrop ]              = useState<Crop>(initialCrop);
  const [ smallImagePreview, setSmallImagePreview ] = useState("");
  const [ tinyImagePreview,  setTinyImagePreview ]  = useState("");

  useEffect(() => {
    let mounted = true;

    function getExistingEquipmentToEdit() {
      if (!equipment_id) {
        router.push(`/${authname}/private/dashboard`);
        return;
      }
      
      setLoading(true);
      window.scrollTo(0, 0);

      const equipment = allowedEquipment.find(e => e.equipment_id === equipment_id);
      if (!equipment) {
        router.push(`/${authname}/private/dashboard`);
        return;
      }

      setEquipmentTypeId(equipment.equipment_type_id);
      setEquipmentName(equipment.equipment_name);
      setNotes(equipment.notes);
      setPreviousImageFilename(equipment.image.image_filename);
      setImageCaption(equipment.image.caption);

      setLoading(false);
    }

    if (mounted) {
      if (!authname) {
        router.push(`/404`);
        return;
      }

      if (equipment_id) {
        getExistingEquipmentToEdit();
      }
    }

    return () => {
      mounted = false;
    };
  }, []);  // do this in getServerSideProps???

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
      if (message === "Equipment created." || message === "Equipment updated.") {
        setTimeout(() => router.push(`/${authname}/private/dashboard`), 3000);
      }
      setLoading(false);
    }
    
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const changeEquipmentType  = (e: SyntheticEvent) => setEquipmentTypeId(Number((e.target as HTMLInputElement).value));
  const changeEquipmentName  = (e: SyntheticEvent) => setEquipmentName((e.target as HTMLInputElement).value);
  const changeNotes          = (e: SyntheticEvent) => setNotes((e.target as HTMLInputElement).value);
  const changeImageCaption   = (e: SyntheticEvent) => setImageCaption((e.target as HTMLInputElement).value);

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
    if (!isValidEquipmentUpload({
      equipment_type_id,
      equipment_name,
      notes,
      setFeedback
    })) return;

    const equipment_upload = {
      equipment_type_id,
      equipment_name,
      notes,
      image: {
        image_filename: equipment_id ? previousImageFilename : "default",
        caption:        imageCaption,
        small:          smallImage,
        tiny:           tinyImage
      }
    };

    setLoading(true);

    // TO DO: AUTHORIZE ON BACK END, MAKE SURE THEY ACTUALLY OWN THE EQUIPMENT
    // BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!
    if (equipment_id) {
      const equipment_update_upload = {equipment_id, ...equipment_upload};

      const { image } = equipment_update_upload;

      try {
        if (image.small && image.tiny) {
          const { data: { filename, fullSignature, tinySignature } } = await axios.post(
            `${endpoint}/user/signed-url`,
            {subfolder: `${ownership}/equipment/`},
            {withCredentials: true}
          );
          await uploadImageToAWSS3(fullSignature, image.small);
          await uploadImageToAWSS3(tinySignature, image.tiny);
          // TO DO: CHECK IF ABOVE OPERATIONS WERE SUCCESSFUL!!!
          image.image_filename = filename;
          image.small = null;
          image.tiny  = null;
        }

        const { data } = await axios.patch(
          `${endpoint}/users/${user_id}/${ownership}-equipment/${equipment_id}`,
          equipment_update_upload,
          {withCredentials: true}
        );

        setFeedback(data.message);
        //yield call(getMyEquipmentWorker);
      } catch(err) {
        setFeedback('An error occurred. Please try again.');
      }

      //delay(4000);
      setFeedback("");
    } else {
      const { image } = equipment_upload;

      try {
        if (image.small && image.tiny) {
          const { data: { filename, fullSignature, tinySignature } } = await axios.post(
            `${endpoint}/user/signed-url`,
            {subfolder: `${ownership}/equipment/`},
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
          `${endpoint}/users/${user_id}/${ownership}-equipment`,
          equipment_upload,
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
    <div className="one-col new-equipment">
      {
        ownership === "private"
        && equipment_id
        ? <h1>Update Private Equipment</h1>
        : <h1>Create Private Equipment</h1>
      }
      {
        ownership === "official"
        && equipment_id
        ? <h1>Update Official Equipment</h1>
        : <h1>Create Official Equipment</h1>
      }

      <p className="feedback">{feedback}</p>

      <h2>Equipment Type</h2>
      <select name="equipmentType" onChange={changeEquipmentType} required value={equipment_type_id}>
        <option value={0}>Select type</option>
        {equipment_types.map(({ equipment_type_id, equipment_type_name }) => (
          <option key={equipment_type_id} value={equipment_type_id}>
            {equipment_type_name}
          </option>
        ))}
      </select>

      <h2>Equipment Name</h2>
      <input className="name" onChange={changeEquipmentName} type="text" value={equipment_name} />

      <h2>Notes</h2>
      <textarea className="notes" onChange={changeNotes} value={notes} />

      <div className='equipment-image'>
        <h2>Image of Equipment</h2>

        {!image && (
          <div>
            {
              !equipment_id
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

            <h4>Caption:</h4>
            <input
              className="caption"
              max={150}
              min={2}
              name="caption"
              onChange={changeImageCaption}
              type="text"
              value={imageCaption}
            />

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
          text="Create"
        />
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
};

function useAllowedEquipment(ownership: Ownership) {
  const equipment            = useSelector(state => state.data.equipment);
  const my_private_equipment = useSelector(state => state.userData.my_private_equipment);

  // must be checked server-side!!! never let random users edit official content
  if (ownership === "private") {
    return my_private_equipment;
  }
  if (ownership === "official") {
    return equipment;
  }
  return [];
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

export function isValidEquipmentUpload({
  equipment_type_id,
  equipment_name,
  notes,
  setFeedback
}: IsValidEquipmentUploadParams) {
  function feedback(message: string) {
    window.scrollTo(0, 0);
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
    return false;
  }

  const validEquipmentTypeId = equipment_type_id !== 0;
  if (!validEquipmentTypeId) return feedback("Select equipment type.");

  const validEquipmentName = equipment_name.trim() !== "";
  if (!validEquipmentName) return feedback("Enter equipment name.");

  const validNotes = notes.trim() !== "";
  if (!validNotes) return feedback("Enter notes.");

  return true;
};

type IsValidEquipmentUploadParams = {
  equipment_type_id: number;
  equipment_name:    string;
  notes:             string;
  setFeedback:       (feedback: string) => void;
};

export type ExistingEquipmentToEdit = {
  equipment_id:      string;
  equipment_type_id: number;
  equipment_name:    string;
  notes:             string;
  image:             ImageInfo;
};

type ImageInfo = {
  image_filename: string;
  caption:        string;
};

type ImageUpload = ImageInfo & {
  small: File | null;
  tiny:  File | null;
};

export type EquipmentUpload = {
  equipment_type_id: number;
  equipment_name: string;
  notes: string;
  image: ImageUpload;
};

export type EquipmentUpdateUpload = EquipmentUpload & {
  equipment_id: string;
};

function uploadImageToAWSS3(signature: any, image: any) {
  axios.put(signature, image, {headers: {'Content-Type': 'image/jpeg'}});
}
