import axios from 'axios';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { endpoint } from '../../../config/api';
import { useAuth, useData, useUserData } from '../../../store';
import { NOBSC_USER_ID } from '../../shared/constants';
import { getCroppedImage } from '../../shared/getCroppedImage';
import { uploadImageToAwsS3 } from '../../shared/uploadImageToAwsS3';
import type { Ownership } from '../../shared/types';

export default function EquipmentForm({ ownership }: Props) {
  const router = useRouter();

  const params = useSearchParams();
  const equipment_id = params.get('equipment_id');

  const { auth_id, authname } = useAuth();
  const { equipment_types } = useData();
  const { setMyPrivateEquipment } = useUserData();

  const allowedEquipment = useAllowedEquipment(ownership);

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [equipment_type_id, setEquipmentTypeId] = useState(0);
  const [equipment_name, setEquipmentName] = useState('');
  const [notes, setNotes] = useState('');

  const imageRef = useRef<HTMLImageElement>();
  const [imageState, setImageState] = useState<ImageState>({
    image: null,
    crop: initialCrop,
    smallPreview: '',
    tinyPreview: ''
  });
  const [smallImage, setSmallImage] = useState<File | null>(null);
  const [tinyImage, setTinyImage] = useState<File | null>(null);
  const [image, setImage] = useState({
    image_id: '',
    image_filename: 'default',
    caption: '',
  });

  useEffect(() => {
    let mounted = true;

    function getExistingEquipmentToEdit() {
      window.scrollTo(0, 0);
      setLoading(true);
      const equipment = allowedEquipment.find(e => e.equipment_id === equipment_id);
      if (!equipment) return router.push('/dashboard');
      setEquipmentTypeId(equipment.equipment_type_id);
      setEquipmentName(equipment.equipment_name);
      setNotes(equipment.notes);
      setImage({
        ...image,
        image_id: equipment.image_id,
        image_filename: equipment.image_filename,
        caption: equipment.caption
      });
      setLoading(false);
    }

    if (mounted) {
      if (!authname) return router.push(`/404`);
      if (equipment_id) getExistingEquipmentToEdit();
    }

    return () => {
      mounted = false;
    };
  }, []);  // do this in getServerSideProps???

  const getMyPrivateEquipment = async () => {
    const res = await axios.get(
      `${endpoint}/users/${authname}/private-equipment`,
      {withCredentials: true}
    );
    setMyPrivateEquipment(res.data);
  };

  const onSelectFile = (target: HTMLInputElement) => {
    if (!target.files) return;
    if (target.files.length < 1) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageState({...imageState, image: reader.result}));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const small = await getCroppedImage(280, 280, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 28, imageRef.current, crop);
    if (!small || !tiny) return;
    setImageState({
      ...imageState,
      smallPreview: small.preview,
      tinyPreview: tiny.preview
    });
    setSmallImage(small.final);
    setTinyImage(tiny.final);
  };

  const cancelImage = () => {
    setImageState({
      ...imageState,
      image: null,
      //crop
      smallPreview: '',
      tinyPreview: ''
    });
    setSmallImage(null);
    setTinyImage(null);
  };

  const submit = async () => {
    window.scrollTo(0, 0);
    if (equipment_type_id === 0) return setFeedback('Equipment Type required.');
    if (equipment_name.trim() === "") return setFeedback('Equipment Name required.');
    setLoading(true);
    setFeedback('');
    const equipment_upload = {
      equipment_type_id,
      equipment_name,
      notes,
      image_filename: image.image_filename,
      caption: image.caption
    };
    // upload any images to AWS S3, then insert info into MySQL
    try {
      if (smallImage && tinyImage) {
        const res = await axios.post(
          `${endpoint}/aws-s3-${ownership}-uploads`,
          {subfolder: 'equipment'},
          {withCredentials: true}
        );
        await uploadImageToAwsS3(res.data.smallSignature, smallImage);
        await uploadImageToAwsS3(res.data.tinySignature, tinyImage);
        equipment_upload.image_filename = res.data.filename;
      }
      const editing = equipment_id !== null;
      if (editing) {
        const res = await axios.patch(
          `${endpoint}/users/${authname}/${ownership}-equipment/${equipment_id}`,
          {equipment_id, image_id: image.image_id, ...equipment_upload},
          {withCredentials: true}
        );
        if (res.status === 204) {
          setFeedback("Equipment updated.");
          await getMyPrivateEquipment();
          setTimeout(() => router.push(`/dashboard`), 4000);
        } else {
          setFeedback(res.data.error);
        }
      } else {
        const res = await axios.post(
          `${endpoint}/users/${authname}/${ownership}-equipment`,
          equipment_upload,
          {withCredentials: true}
        );
        if (res.status === 201) {
          setFeedback("Equipment created.");
          await getMyPrivateEquipment();
          setTimeout(() => router.push(`/dashboard`), 4000);
        } else {
          setFeedback(res.data.error);
        }
      }
    } catch(err) {
      setFeedback('An error occurred. Please try again.');
    }
    setTimeout(() => {
      setFeedback('');
      setLoading(false);
    }, 4000);
  };

  const url = `https://s3.amazonaws.com/nobsc-${ownership}-uploads`;
  
  return (
    <div className="one-col equipment-form">
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
      <select
        name="equipmentType"
        onChange={e => setEquipmentTypeId(Number(e.target.value))}
        required
        value={equipment_type_id}
      >
        <option value={0}>Select type</option>
        {equipment_types.map(({ equipment_type_id, equipment_type_name }) => (
          <option key={equipment_type_id} value={equipment_type_id}>
            {equipment_type_name}
          </option>
        ))}
      </select>

      <h2>Equipment Name</h2>
      <input
        className="name"
        onChange={e => setEquipmentName(e.target.value)}
        type="text"
        value={equipment_name}
      />

      <h2>Notes</h2>
      <textarea className="notes" onChange={e => setNotes(e.target.value)} value={notes} />

      <div className='equipment-image'>
        <h2>Image of Equipment</h2>

        {!imageState.image && (
          <div>
            {
              !equipment_id
              ? <img src={`${url}/equipment/${NOBSC_USER_ID}/default`} />
              : <img src={`${url}/equipment/${auth_id}/${image.image_filename}`} />
            }
            
            <h4>Change</h4>
            <input
              accept="image/*"
              name="image-input"
              onChange={e => onSelectFile(e.target)}
              type="file"
            />
          </div>
        )}

        {imageState.image && (
          <div>
            <ReactCrop
              aspect={1}
              className="crop-tool"
              crop={imageState.crop}
              onChange={crop => setImageState({...imageState, crop})}
              onComplete={crop => makeCrops(crop)}
              style={{minHeight: "300px"}}
            >
              <img
                onLoad={e => imageRef.current = e.currentTarget}
                src={imageState.image as string}
              />
            </ReactCrop>

            <span className="crop-tool-tip">
              Move the crop to your desired position. The image&#40;s&#41; will be saved for you:
            </span>
  
            <div className="crops">
              <div className="crop-full-outer">
                <span>Small Size: </span>
                <img className="crop-full" src={imageState.smallPreview} />
              </div>

              <div className="crop-tiny-outer">
                <span>Tiny Size: </span>
                <img className="crop-tiny" src={imageState.tinyPreview} />
              </div>
            </div>

            <h4>Caption:</h4>
            <input
              className="caption"
              max={150}
              min={2}
              onChange={e => setImage({...image, caption: e.target.value})}
              type="text"
              value={image.caption}
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
        <Link className="cancel-button" href='/dashboard'>Cancel</Link>

        <button
          className='submit-button'
          disabled={loading}
          onClick={submit}
        >{loading ? 'Creating...' : 'Create'}</button>
      </div>
    </div>
  );
}

type Props = {
  ownership: Ownership;
};

function useAllowedEquipment(ownership: Ownership) {
  const { equipment } = useData();
  const { my_private_equipment } = useUserData();
  // must be checked server-side!!! never let random users edit official content
  if (ownership === "private") return my_private_equipment;
  if (ownership === "official") return equipment;
  return [];
}

type Image = string | ArrayBuffer | null;

type ImageState = {
  image:        string | ArrayBuffer | null;
  crop:         Crop;
  smallPreview: string;
  tinyPreview:  string;
};

const initialCrop: Crop = {
  unit:   'px',
  x:      25,  // 28???
  y:      25,
  width:  50,
  height: 50
};  // TO DO: change to NOBSC images ratio

export type EquipmentUpload = {
  equipment_type_id: number;
  equipment_name:    string;
  notes:             string;
  //image_id:          string;
  image_filename:    string;
  caption:           string;
};

export type EquipmentUpdateUpload = EquipmentUpload & {
  equipment_id: string;
  image_id:     string;
};

export type ExistingEquipmentToEdit = EquipmentUpdateUpload;
