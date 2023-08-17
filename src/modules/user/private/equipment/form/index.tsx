import Link                            from 'next/link';
import { useSearchParams, useRouter }  from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop }             from 'react-image-crop';
import { useDispatch }                 from 'react-redux';
import 'react-image-crop/dist/ReactCrop.css';

import { CropPreview, LoaderButton }        from '../../components';
import { useTypedSelector as useSelector }  from '../../store';
import { createEquipment, updateEquipment } from '../../store/user/equipment/actions';
import { getCroppedImage }                  from '../../utils/getCroppedImage';

export default function EquipmentForm() {
  const router = useRouter();
  const params = useSearchParams();
  const equipment_id = params.get('equipment_id');

  const dispatch = useDispatch();
  //const equipment =      useSelector(state => state.data.equipment);
  const equipment_types = useSelector(state => state.data.equipment_types);
  const my_equipment =    useSelector(state => state.data.my_equipment);
  const message =         useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,   setEditingId ] =             useState<string | null>(null);  // is this even needed?
  const [ equipment_type_id, setEquipmentTypeId ] = useState<number>(0);  // null?
  const [ equipment_name,    setEquipmentName ]   = useState("");
  const [ description, setDescription ] =           useState("");
  const [ prevImage,   setPrevImage ] =             useState("nobsc-equipment-default");
  const [ image,       setImage ] =                 useState<string | ArrayBuffer | null>(null);
  const [ fullImage,   setFullImage ] =             useState<File | null>(null);
  const [ tinyImage,   setTinyImage ] =             useState<File | null>(null);

  const [ crop,     setCrop ] =     useState<Crop>({unit: 'px', x: 25, y: 25, width: 50, height: 50});
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
      const [ prev ] = my_equipment.filter(e => e.equipment_id === equipment_id);
      if (!prev) {
        router.push('/dashboard');
        setLoading(false);
        return;
      }
      
      setEditingId(prev.equipment_id);  // is this even needed?
      setEquipmentTypeId(prev.equipment_type_id);
      setEquipmentName(prev.equipment_name);
      setDescription(prev.description);
      setPrevImage(prev.image_url);

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

  const changeType =        (e: SyntheticEvent) => setEquipmentTypeId(Number((e.target as HTMLInputElement).value));
  const changeName =        (e: SyntheticEvent) => setEquipmentName((e.target as HTMLInputElement).value);
  const changeDescription = (e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value);

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

  const onImageLoaded =  (e: React.SyntheticEvent<HTMLImageElement>) => imageRef.current = e.currentTarget;
  const onCropChange =   (crop: Crop) => setCrop(crop);
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

    const validDescription = description.trim() !== "";
    if (!validDescription) {
      window.scrollTo(0, 0);
      setFeedback("Check description.");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    return validTypeId && validName && validDescription;
  };

  // TO DO: remove inner prefixes
  const submit = () => {
    if (!valid()) return;
    setLoading(true);
    const equipmentInfo = {equipment_type_id, equipment_name, description, image, fullImage, tinyImage};
    if (editingId) {
      // TO DO: AUTHORIZE THEM ON THE BACK END, MAKE SURE THEY ACTUALLY DO OWN THE EQUIPMENT BEFORE ENTERING ANYTHING INTO MySQL / AWS S3!!!
      const equipmentUpdateInfo = {equipment_id: editingId, prevImage, ...equipmentInfo};
      dispatch(updateEquipment(equipmentUpdateInfo));
    } else {
      dispatch(createEquipment(equipmentInfo));
    }
  };
  
  return (
    <div className="one-col new-equipment">
      <h1>New Equipment</h1>

      <p className="feedback">{feedback}</p>

      <h2>Type of Equipment</h2>
      <select name="equipmentType" onChange={changeType} required value={equipment_type_id}>
        <option value=""></option>
        {equipment_types.map(({ equipment_type_id, equipment_type_name }) => (
          <option key={equipment_type_id} value={equipment_type_id}>{equipment_type_name}</option>
        ))}
      </select>

      <h2>Name</h2>
      <input className="name" onChange={changeName} type="text" value={equipment_name} />

      <h2>Description</h2>
      <textarea className="description" onChange={changeDescription} value={description} />

      <div>
        <h2>Image of Equipment</h2>

        {!image && (
          <div>
            {!editingId ? <img src={`${dir}/nobsc-equipment-default`} /> : prevImage && <img src={`${dir}/${prevImage}`} />}
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
            <CropPreview cancelImage={cancelImage} fullCrop={fullCrop} loading={loading} tinyCrop={tinyCrop} />
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

type SyntheticEvent = React.SyntheticEvent<EventTarget>;
