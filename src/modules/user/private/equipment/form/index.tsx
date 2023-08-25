import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop }             from 'react-image-crop';
import { useDispatch }                 from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';

import { useTypedSelector as useSelector }  from '../../../../../redux';
import { CropPreview }                      from '../../../../shared/CropPreview';
import { LoaderButton }                     from '../../../../shared/LoaderButton';
import { getCroppedImage }                  from '../../../../shared/getCroppedImage';
import { createEquipment, updateEquipment } from '../state';

export default function UserPrivateEquipmentForm() {
  const router = useRouter();

  const params = useSearchParams();
  const equipment_id = params.get('equipment_id');

  const dispatch = useDispatch();
  const equipment_types = useSelector(state => state.data.equipment_types);
  const my_equipment    = useSelector(state => state.userData.my_equipment);
  const message         = useSelector(state => state.system.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ]  = useState(false);

  const [ equipment_type_id, setEquipmentTypeId ] = useState(0);  // null?
  const [ equipment_name,    setEquipmentName ]   = useState("");
  const [ notes,             setNotes ]           = useState("");
  const [ prevImage,         setPrevImage ]       = useState("nobsc-equipment-default");
  const [ image,             setImage ]           = useState<string | ArrayBuffer | null>(null);
  const [ fullImage,         setFullImage ]       = useState<File | null>(null);
  const [ tinyImage,         setTinyImage ]       = useState<File | null>(null);

  const [ crop,     setCrop ]     = useState<Crop>(initialCrop);
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement>();

  const dir = 'https://s3.amazonaws.com/nobsc-user-equipment';  // .com/nobsc-user/equipment instead?

  useEffect(() => {
    const getExistingEquipmentToEdit = () => {
      if (!equipment_id) {
        router.push('/dashboard');
        return;
      }
      
      setLoading(true);

      window.scrollTo(0, 0);

      const equipment = my_equipment.find(e => e.equipment_id === equipment_id);
      if (!equipment) {
        router.push('/dashboard');
        setLoading(false);
        return;
      }

      setEquipmentTypeId(equipment.equipment_type_id);
      setEquipmentName(equipment.equipment_name);
      setNotes(equipment.notes);
      setPrevImage(equipment.image_url);

      setLoading(false);
    };

    if (equipment_id) getExistingEquipmentToEdit();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (message !== "") window.scrollTo(0, 0);
      setFeedback(message);
      if (message === "Equipment created." || message === "Equipment updated.") {
        setTimeout(() => router.push('/dashboard'), 3000);
      }
      setLoading(false);
    }
    
    return () => {
      isSubscribed = false;
    };
  }, [message]);

  const changeType  = (e: SyntheticEvent) => setEquipmentTypeId(Number((e.target as HTMLInputElement).value));
  const changeName  = (e: SyntheticEvent) => setEquipmentName((e.target as HTMLInputElement).value);
  const changeNotes = (e: SyntheticEvent) => setNotes((e.target as HTMLInputElement).value);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const full = await getCroppedImage(280, 172, imageRef.current, crop);
    const tiny = await getCroppedImage(28,  18,  imageRef.current, crop);
    if (!full || !tiny) return;
    setFullCrop(full.preview);
    setTinyCrop(tiny.preview);
    setFullImage(full.final);
    setTinyImage(tiny.final);
  };

  const onImageLoaded  = (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;
  const onCropChange   = (crop: Crop) => setCrop(crop);
  const onCropComplete = (crop: Crop) => makeCrops(crop);

  const cancelImage = () => {
    setFullCrop("");
    setTinyCrop("");
    setImage(null);
    setFullImage(null);
    setTinyImage(null);
  };

  const valid = () => {
    const validTypeId = equipment_type_id !== 0;
    if (!validTypeId) {
      window.scrollTo(0, 0);
      setFeedback("Select equipment type.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validName = equipment_name.trim() !== "";
    if (!validName) {
      window.scrollTo(0, 0);
      setFeedback("Check your name.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validNotes = notes.trim() !== "";
    if (!validNotes) {
      window.scrollTo(0, 0);
      setFeedback("Check notes.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    return validTypeId && validName && validNotes;
  };

  const submit = () => {
    if (!valid()) return;

    setLoading(true);

    const equipmentInfo = {
      equipment_type_id,
      equipment_name,
      notes,
      image,
      fullImage,
      tinyImage
    };

    if (equipment_id) {
      // TO DO: AUTHORIZE ON BACK END
      // MAKE SURE THEY OWN THE INGREDIENT
      // BEFORE ENTERING ANYTHING INTO MySQL / AWS S3
      const equipmentUpdateInfo = {
        equipment_id,
        prevImage,
        ...equipmentInfo
      };

      dispatch(updateEquipment(equipmentUpdateInfo));
    } else {
      dispatch(createEquipment(equipmentInfo));
    }
  };
  
  return (
    <div className="one-col new-equipment">
      <h1>Create/Edit Private Equipment</h1>

      <p className="feedback">{feedback}</p>

      <h2>Equipment Type</h2>
      <select name="equipmentType" onChange={changeType} required value={equipment_type_id}>
        <option value=""></option>
        {equipment_types.map(({ equipment_type_id, equipment_type_name }) => (
          <option key={equipment_type_id} value={equipment_type_id}>
            {equipment_type_name}
          </option>
        ))}
      </select>

      <h2>Name</h2>
      <input className="name" onChange={changeName} type="text" value={equipment_name} />

      <h2>Notes</h2>
      <textarea className="notes" onChange={changeNotes} value={notes} />

      <div>
        <h2>Image of Equipment</h2>

        {!image && (
          <div>
            {
              !equipment_id
              ? <img src={`${dir}/nobsc-equipment-default`} />
              : prevImage && <img src={`${dir}/${prevImage}`} />
            }
            
            <h4>Change</h4>
            <input accept="image/*" onChange={onSelectFile} type="file" />
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

            <CropPreview
              cancelImage={cancelImage}
              fullCrop={fullCrop}
              loading={loading}
              tinyCrop={tinyCrop}
            />
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

const initialCrop: Crop = {
  unit:   'px',
  x:      25,
  y:      25,
  width:  50,
  height: 50
};

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
