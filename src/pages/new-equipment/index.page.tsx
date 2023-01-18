import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import type { Crop } from 'react-image-crop';
import { useDispatch } from 'react-redux';

import { getCroppedImage } from '../../utils/getCroppedImage';
import { useTypedSelector as useSelector } from '../../store';
import { createNewEquipment, editEquipment } from '../../store/staff/equipment/actions';
import { createNewPrivateEquipment, editPrivateEquipment } from '../../store/user/equipment/actions';
import { NewEquipmentView } from './view';

export function NewEquipment({ editing }: Props): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const equipment =            useSelector(state => state.data.equipment);
  const equipmentTypes =       useSelector(state => state.data.equipmentTypes);
  const myPrivateEquipment =   useSelector(state => state.data.myPrivateEquipment);
  const staffIsAuthenticated = useSelector(state => state.auth.staffIsAuthenticated);
  const staffMessage =         useSelector(state => state.staff.message);
  const theme =                useSelector(state => state.theme.theme);
  const userMessage =          useSelector(state => state.user.message);

  const [ feedback, setFeedback ] = useState("");
  const [ loading,  setLoading ] =  useState(false);

  const [ editingId,   setEditingId ] =   useState<number>(0);  // null?
  const [ typeId,      setTypeId ] =      useState<number>(0);  // null?
  const [ name,        setName ] =        useState("");
  const [ description, setDescription ] = useState("");
  const [ prevImage,   setPrevImage ] =   useState("nobsc-equipment-default");
  const [ image,       setImage ] =       useState<string | ArrayBuffer | null>(null);
  const [ fullImage,   setFullImage ] =   useState<File | null>(null);
  const [ tinyImage,   setTinyImage ] =   useState<File | null>(null);

  const [ crop,     setCrop ] =     useState<Crop>({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [ fullCrop, setFullCrop ] = useState("");
  const [ tinyCrop, setTinyCrop ] = useState("");

  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const getExistingEquipmentToEdit = () => {
      if (!id) {
        const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
        router.push(redirectPath);
        return;
      }
      
      window.scrollTo(0,0);
      setLoading(true);

      const [ prev ] = staffIsAuthenticated ? equipment.filter(e => e.id === Number(id)) : myPrivateEquipment.filter(e => e.id === Number(id));

      if (!prev) {
        setLoading(false);
        return;
      }
      setEditingId(prev.id);
      setTypeId(prev.equipment_type_id);
      setName(prev.name);
      setDescription(prev.description);
      setPrevImage(prev.image);
      setLoading(false);
    };

    if (editing) getExistingEquipmentToEdit();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      const message = staffIsAuthenticated ? staffMessage : userMessage;
      const redirectPath = staffIsAuthenticated ? '/staff-dashboard' : '/dashboard';
      if (message !== "") window.scrollTo(0,0);
      setFeedback(message);
      if (message === "Equipment created." || message === "Equipment updated.") setTimeout(() => router.push(redirectPath), 3000);
      setLoading(false);
    }
    
    return () => {
      isSubscribed = false;
    };
  }, [staffMessage, userMessage]);

  const cancelImage = () => {
    setFullCrop("");
    setTinyCrop("");
    setImage(null);
    setFullImage(null);
    setTinyImage(null);
  };

  const changeType =        (e: SyntheticEvent) => setTypeId(Number((e.target as HTMLInputElement).value));
  const changeName =        (e: SyntheticEvent) => setName((e.target as HTMLInputElement).value);
  const changeDescription = (e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value);

  // TO DO: remove inner prefixes
  const submit = () => {
    if (!valid()) return;
    setLoading(true);

    const equipmentInfo = {equipmentTypeId: typeId, name, description, image, fullImage, tinyImage};

    if (editing && editingId) {
      const equipmentEditInfo = {id: editingId, prevImage, ...equipmentInfo};
      
      if (staffIsAuthenticated) dispatch(editEquipment(equipmentEditInfo));
      else                      dispatch(editPrivateEquipment(equipmentEditInfo));
    }
    else {
      if (staffIsAuthenticated) dispatch(createNewEquipment(equipmentInfo));
      else                      dispatch(createNewPrivateEquipment(equipmentInfo));
    }
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef || !imageRef.current) return;
    if (!crop.width) return;
    const full = await getCroppedImage(280, 172, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 18, imageRef.current, crop);
    if (!full || !tiny) return;
    setFullCrop(full.preview);
    setTinyCrop(tiny.preview);
    setFullImage(full.final);
    setTinyImage(tiny.final);
  };

  const onCropChange =   (crop: Crop) =>              setCrop(crop);
  const onCropComplete = (crop: Crop) =>              makeCrops(crop);
  const onImageLoaded =  (image: HTMLImageElement) => imageRef.current = image;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setImage(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const valid = () => {
    const validTypeId = typeId !== 0;
    if (!validTypeId) {
      window.scrollTo(0,0);
      setFeedback("You forgot to select the equipment type...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validName = name.trim() !== "";
    if (!validName) {
      window.scrollTo(0,0);
      setFeedback("Umm, double check your name...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    const validDescription = description.trim() !== "";
    if (!validDescription) {
      window.scrollTo(0,0);
      setFeedback("Umm, double check your description...");
      setTimeout(() => setFeedback(""), 3000);
      return false;
    }

    return validTypeId && validName && validDescription;
  };
  
  return (
    <NewEquipmentView
      cancelImage={cancelImage}
      crop={crop}
      equipmentTypes={equipmentTypes}
      description={description}
      editing={editing}
      feedback={feedback}
      fullCrop={fullCrop}
      changeDescription={changeDescription}
      changeName={changeName}
      changeType={changeType}
      image={image}
      loading={loading}
      name={name}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onImageLoaded={onImageLoaded}
      onSelectFile={onSelectFile}
      prevImage={prevImage}
      staffIsAuthenticated={staffIsAuthenticated}
      submit={submit}
      theme={theme}
      tinyCrop={tinyCrop}
      typeId={typeId}
    />
  );
};

type SyntheticEvent = React.SyntheticEvent<EventTarget>;

type Props = {
  editing: boolean;
};

export default NewEquipment;