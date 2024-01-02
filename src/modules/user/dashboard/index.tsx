import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import AriaModal from 'react-aria-modal';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { useApi, useAuth, useUserData, useTheme } from '../../../store';
import { ExpandCollapse } from '../../shared/ExpandCollapse';
import { getCroppedImage } from '../../shared/getCroppedImage';
import { uploadImageToAwsS3 } from '../../shared/uploadImageToAwsS3';

export default function Dashboard() {
  const router = useRouter();

  const { api } = useApi();
  const auth = useAuth();
  const userData = useUserData();
  const { theme } = useTheme();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPageNavOpen, setIsPageNavOpen] = useState(false);
  const [tab, setTab] = useState('avatar');
  const [subTab, setSubTab] = useState('private');
  const [deleteId, setDeleteId] = useState('');
  const [deleteName, setDeleteName] = useState('');
  const [modalActive, setModalActive] = useState(false);

  const [new_username, setNewUsername] = useState('');

  const [new_email, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const [new_password, setNewPassword] = useState('');
  const [new_password_again, setNewPasswordAgain] = useState('');
  const [current_password, setCurrentPassword] = useState('');

  const [del_password, setDelPassword] = useState('');

  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [small_avatar, setSmallAvatar] = useState<File | null>(null);
  const [tiny_avatar, setTinyAvatar] = useState<File | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit:   'px',
    x:      25,
    y:      25,
    width:  50,
    height: 50
  });
  const [smallCrop, setSmallCrop] = useState('');
  const [tinyCrop, setTinyCrop] = useState('');

  const imageRef = useRef<HTMLImageElement | null>();

  const error = 'An error occurred. Please try again.';

  const officialUrl = 'https://s3.amazonaws.com/nobsc-official-uploads';
  const privateUrl = 'https://s3.amazonaws.com/nobsc-private-uploads';
  const publicUrl = 'https://s3.amazonaws.com/nobsc-public-uploads';
  const avatarUrl = auth.auth_avatar === 'default'
    ? `${officialUrl}/avatar/default`
    : `${publicUrl}/avatar/${auth.auth_id}/${auth.auth_avatar}`;

  const updateEmail = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await api.patch(
        `/users/${auth.authname}/update-email`,
        {new_email, password}
      );
      if (res.status === 204) {
        setFeedback('Email updated.')
        auth.setAuthEmail(new_email);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const updatePassword = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await api.patch(
        `/users/${auth.authname}/update-password`,
        {new_password, current_password}
      );
      if (res.status === 204) {
        setFeedback('Password updated.')
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const updateUsername = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await api.patch(
        `/users/${auth.authname}/update-username`,
        {new_username}
      );
      if (res.status === 204) {
        setFeedback("Username updated.")
        auth.setAuthname(new_username);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deleteAccount = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    try {
      const res = await api.post(
        `/users/${auth.authname}/delete`,
        {password: del_password}
      );
      if (res.status === 204) {
        setFeedback('User account deleted.');
        auth.logout();
        setTimeout(() => router.push('/'), 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const getApplicationNode = () => document.getElementById('root') as Element | Node;

  const activateModal = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setModalActive(true);
  };

  const deactivateModal = () => {
    setDeleteId("");
    setDeleteName("");
    setModalActive(false);
  };

  const cancelAvatar = () => {
    setSmallCrop("");
    setTinyCrop("");
    setAvatar(null)
    setSmallAvatar(null);
    setTinyAvatar(null);
  };

  const unattributePublicPlan = async (plan_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/public-plans`
    try {
      const res1 = await api.delete(`${url}/${plan_id}`);
      if (res1.status === 204) {
        setFeedback("Public plan unattributed.");
        const res2 = await api.get(url);
        userData.setMyPublicPlans(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const unattributePublicRecipe = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/public-recipes`;
    try {
      const res1 = await api.patch(`${url}/${recipe_id}`);
      if (res1.status === 204) {
        setFeedback("Public recipe unattributed.");
        const res2 = await api.get(url);
        userData.setMyPublicRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivateEquipment = async (equipment_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/private-equipment`;
    try {
      const res1 = await api.delete(`${url}/${equipment_id}`);
      if (res1.status === 204) {
        setFeedback("Private equipment deleted.");
        const res2 = await api.get(url);
        userData.setMyPrivateEquipment(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivateIngredient = async (ingredient_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/private-ingredients`
    try {
      const res1 = await api.delete(`${url}/${ingredient_id}`);
      if (res1.status === 204) {
        setFeedback("Private ingredient deleted.");
        const res2 = await api.get(url);
        userData.setMyPrivateIngredients(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivatePlan = async (plan_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/private-plans`
    try {
      const res1 = await api.delete(`${url}/${plan_id}`);
      if (res1.status === 204) {
        setFeedback("Private plan deleted.");
        const res2 = await api.get(url);
        userData.setMyPrivatePlans(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const deletePrivateRecipe = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/private-recipes`;
    try {
      const res1 = await api.delete(`${url}/${recipe_id}`);
      if (res1.status === 204) {
        setFeedback("Private recipe deleted.");
        const res2 = await api.get(url);
        userData.setMyPrivateRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!(target.files && target.files.length > 0)) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => setAvatar(reader.result));
    reader.readAsDataURL(target.files[0] as Blob);
  };

  const makeCrops = async (crop: Crop) => {
    if (!imageRef.current) return;
    const small = await getCroppedImage(280, 280, imageRef.current, crop);
    const tiny = await getCroppedImage(28, 28, imageRef.current, crop);
    if (!small || !tiny) return;
    setSmallCrop(small.preview);
    setTinyCrop(tiny.preview);
    setSmallAvatar(small.final);
    setTinyAvatar(tiny.final);
  };

  const uploadAvatar = async () => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);

    try {
      let new_avatar = '';

      if (small_avatar && tiny_avatar) {
        const res = await api.post(
          `/aws-s3-public-uploads`,
          {subfolder: 'avatar'}
        );
        if (res.status === 201) {
          await uploadImageToAwsS3(res.data.smallSignature, small_avatar);
          await uploadImageToAwsS3(res.data.tinySignature, tiny_avatar);
          new_avatar = res.data.filename;
          console.log(new_avatar);
        } else {
          setFeedback(res.data.message);
          return;
        }
      }

      const res = await api.post(
        `/users/${auth.authname}/avatars`,
        {new_avatar}
      );
      if (res.status === 204) {
        setFeedback('Avatar updated.');
        auth.setAuthAvatar(new_avatar);
        setTimeout(() => {
          router.push(`/dashboard`);
        }, 3000);
      } else {
        setFeedback(res.data.message);
      }
    } catch (err) {
      setFeedback(error);
    }

    setLoading(false);
  };

  const unfavorite = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/favorite-recipes`;
    try {
      const res1 = await api.delete(`${url}/${recipe_id}`);
      if (res1.status === 204) {
        setFeedback("Recipe unfavorited.");
        const res2 = await api.get(url);
        userData.setMyFavoriteRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch(err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const unsave = async (recipe_id: string) => {
    setLoading(true);
    setFeedback('');
    window.scrollTo(0, 0);
    const url = `/users/${auth.authname}/saved-recipes`
    try {
      const res1 = await api.delete(`${url}/${recipe_id}`);
      if (res1.status === 204) {
        setFeedback("Recipe unsaved.");
        const res2 = await api.get(url);
        userData.setMySavedRecipes(res2.data);
        setTimeout(() => router.push('/dashboard'), 3000);  // necessary???
      } else {
        setFeedback(res1.data.message);
      }
    } catch(err) {
      setFeedback(error);
    }
    setLoading(false);
  };

  const commonAriaModalProps = {
    dialogClass: 'dashboard-modal',
    focusDialog: true,
    focusTrapOptions: {
      returnFocusOnDeactivate: false
    },
    getApplicationNode,
    onExit: deactivateModal,
    titleText: 'Cancel?',
    underlayClickExits: false,
  };

  return (
    <div className="one-col dashboard">
      <div className="page-nav-container">
        <svg
          className="page-nav-toggle"
          onClick={() => setIsPageNavOpen(prev => !prev)}
          style={{
            outline: isPageNavOpen
              ? `2px solid ${theme === 'light' ? '#bfddfa' : '#507ea7'}`
              : 'none'
          }}
        >
          <g>
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill={theme === 'light' ? '#000' : '#aaa'}
            ></path>
          </g>
        </svg>

        <img src={`${avatarUrl}-tiny.jpg`} />

        <h1>{auth.authname}</h1>
      </div>

      <p className="feedback">{feedback}</p>

      {isPageNavOpen ? (
        <>
          <div className="page-nav-shadow"></div>

          <nav className="page-nav dashboard-nav">
            <div
              className={`menu-item ${tab === 'avatar' ? '--active' : ''}`}
              onClick={() => {
                setTab('avatar');
                setIsPageNavOpen(false);
              }}
            >Profile Settings</div>
    
            <ExpandCollapse
              headingWhileCollapsed={(
                <div className="menu-item">
                  <span>Plans</span>
                  <img src="/images/header/down-arrow.png" width="8" height="6" />
                </div>
              )}
              headingWhileExpanded={(
                <div className="menu-item">
                  <span>Plans</span>
                  <img src="/images/header/down-arrow.png" width="8" height="6" />
                </div>
              )}
              isExpandedByDefault={true}
            >
              <div className="submenu-items">
                <div
                  className={`submenu-item ${tab === 'plans' && subTab === 'public' ? '--active' : ''}`}
                  onClick={() => {
                    setTab('plans');
                    setSubTab('public');
                    setIsPageNavOpen(false);
                  }}
                >Public</div>
                <div
                  className={`submenu-item ${tab === 'plans' && subTab === 'private' ? '--active' : ''}`}
                  onClick={() => {
                    setTab('plans');
                    setSubTab('private');
                    setIsPageNavOpen(false);
                  }}
                >Private</div>
              </div>
            </ExpandCollapse>

            <hr />
    
            <ExpandCollapse
              headingWhileCollapsed={(
                <div className="menu-item">
                  <span>Recipes</span>
                  <img src="/images/header/down-arrow.png" width="8" height="6" />
                </div>
              )}
              headingWhileExpanded={(
                <div className="menu-item">
                  <span>Recipes</span>
                  <img src="/images/header/down-arrow.png" width="8" height="6" />
                </div>
              )}
              isExpandedByDefault={true}
            >
              <div className="submenu-items">
                <div
                  className={`submenu-item ${tab === 'recipes' && subTab === 'public' ? '--active' : ''}`}
                  onClick={() => {
                    setTab('recipes');
                    setSubTab('public');
                    setIsPageNavOpen(false);
                  }}
                >Public</div>
                <div
                  className={`submenu-item ${tab === 'recipes' && subTab === 'private' ? '--active' : ''}`}
                  onClick={() => {
                    setTab('recipes');
                    setSubTab('private');
                    setIsPageNavOpen(false);
                  }}
                >Private</div>
                <div
                  className={`submenu-item ${tab === 'recipes' && subTab === 'favorite' ? '--active' : ''}`}
                  onClick={() => {
                    setTab('recipes');
                    setSubTab('favorite');
                    setIsPageNavOpen(false);
                  }}
                >Favorite</div>
                <div
                  className={`submenu-item ${tab === 'recipes' && subTab === 'saved' ? '--active' : ''}`}
                  onClick={() => {
                    setTab('recipes');
                    setSubTab('saved');
                    setIsPageNavOpen(false);
                  }}
                >Saved</div>
              </div>
            </ExpandCollapse>
  
            <div
              className={`menu-item ${tab === 'ingredients' ? '--active' : ''}`}
              onClick={() => {
                setTab('ingredients');
                setIsPageNavOpen(false);
              }}
            >Ingredients</div>
  
            <div
              className={`menu-item ${tab === 'equipment' ? '--active' : ''}`}
              onClick={() => {
                setTab('equipment');
                setIsPageNavOpen(false);
              }}
            >Equipment</div>
  
            <div
              className={`menu-item ${tab === 'settings' ? '--active' : ''}`}
              onClick={() => {
                setTab('settings');
                setIsPageNavOpen(false);
              }}
            >Account Settings</div>
          </nav>
        </>
      ) : false}

      {tab === "settings" ? (
        <div className='dashboard-content account-settings'>
          <h2>Account Settings</h2>

          <h3>Username</h3>
          <p>{auth.authname}</p>
          <label htmlFor='new-username'>New Username</label>
          <input
            name='new-username'
            onChange={e => setNewUsername(e.target.value)}
            value={new_username}
            minLength={6}
            maxLength={20}
          />
          <button
            className='new-entity'
            onClick={updateUsername}
          >Update Username</button>

          <hr/>
    
          <h3>Email</h3>
          <p>{auth.auth_email}</p>
          <label htmlFor='new-email'>New Email</label>
          <input
            id='new-email'
            name='new-email'
            onChange={e => setNewEmail(e.target.value)}
            value={new_email}
            minLength={5}
            maxLength={60}
          />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            minLength={8}
            maxLength={64}
            type='password'
          />
          <button
            className='new-entity'
            onClick={updateEmail}
          >Update Email</button>

          <hr/>
    
          <h3>Password</h3>
          <label htmlFor='current-password'>Current Password</label>
          <input
            id='current-password'
            name='current-password'
            onChange={e => setCurrentPassword(e.target.value)}
            value={current_password}
            minLength={8}
            maxLength={64}
            type='password'
          />
          <label htmlFor='new-password'>New Password</label>
          <input
            id='new-password'
            name='new-password'
            onChange={e => setNewPassword(e.target.value)}
            value={new_password}
            minLength={8}
            maxLength={64}
            type='password'
          />
          <label htmlFor='new-password-again'>New Password Again</label>
          <input
            id='new-password-again'
            name='new-password-again'
            onChange={e => setNewPasswordAgain(e.target.value)}
            value={new_password_again}
            minLength={8}
            maxLength={64}
            type='password'
          />
          <button
            className='new-entity'
            onClick={updatePassword}
          >Update Password</button>

          <hr/>

          <h3 style={{color: '#c10006'}}>Delete Account</h3>
          <label htmlFor='del-password'>Password</label>
          <input
            name='del-password'
            onChange={e => setDelPassword(e.target.value)}
            value={del_password}
            minLength={8}
            maxLength={64}
            type='password'
          />
          <button
            className='new-entity'
            onClick={deleteAccount}
          >Delete Account</button>
        </div>
      ) : false}

      {tab === "avatar"
        ? avatar ? (
          <div className="dashboard-content dashboard-avatar-edit">
            <ReactCrop
              aspect={1}
              className="avatar-edit-tool"
              crop={crop}
              onChange={crop => setCrop(crop)}
              onComplete={crop => makeCrops(crop)}
              style={{minHeight: "300px"}}
            >
              <img
                onLoad={e => imageRef.current = e.currentTarget}
                src={avatar as string}
              />
            </ReactCrop>
            <span className="crop-tool-tip">
                {'Resize and move the crop above. The images below will be saved for you.'}
              </span>
            <div className="crops">
              <div className="crop-small-outer">
                <span>Full Size</span>
                <img className="crop-small" src={smallCrop} />
              </div>
              <div className="crop-tiny-outer">
                <span>Tiny Size</span>
                <img className="crop-tiny" src={tinyCrop} />
              </div>
            </div>
            <button
              className="--submit"
              disabled={loading}
              name="submit-avatar"
              onClick={uploadAvatar}
            >Complete</button>
            <button
              className="--cancel"
              disabled={loading}
              name="cancel-avatar"
              onClick={cancelAvatar}
            >Cancel</button>
          </div>
        ) : (
          <div className="dashboard-content profile-settings dashboard-avatar">
            <h2>Profile Settings</h2>
            <a
              href={`/${auth.authname}/profile`}
              target="_blank"
              rel="noopener noreferrer"
            >View Profile</a>
            <h3>Current Avatar</h3>
            <img src={`${avatarUrl}.jpg`} />
            <label>Change Avatar</label>
            <input
              accept="image/*"
              name="set-avatar"
              onChange={onSelectFile}
              type="file"
            />
          </div>
        )
        : false
      }

      {tab === "plans" && subTab === "public" ? (
        <div className="dashboard-content">
          <h2>Public Plans</h2>
  
          <Link href={`/${auth.authname}/plan/form`} className="new-entity">
            Create Public Plan
          </Link>
  
          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Unattribute Public Plan: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => unattributePublicPlan(deleteId)}>
                  Yes, Unattribute Plan
                </button>
              </AriaModal>
            )
            : false
          }
  
          {userData.my_public_plans.length
            ? userData.my_public_plans.map(p => (
              <div className="dashboard-item" key={p.plan_id}>
                <span className="name">
                  <Link href={`/${auth.authname}/plan/detail/${p.plan_name}`}>
                    {p.plan_name}
                  </Link>
                </span>

                <span className="action">
                  <Link href={`/${auth.authname}/plan/form/edit/${p.plan_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(p.plan_id, p.plan_name)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any public plans yet.</div>
          }
        </div>
      ): false}

      {tab === "plans" && subTab === "private" ? (
        <div className="dashboard-content">
          <h2>Private Plans</h2>
  
          <Link href={`/${auth.authname}/private/plan/form`} className="new-entity">
            Create Private Plan
          </Link>
  
          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Delete Private Plan: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => deletePrivatePlan(deleteId)}>
                  Yes, Delete Plan
                </button>
              </AriaModal>
            )
            : false
          }
  
          {userData.my_private_plans.length
            ? userData.my_private_plans.map(p => (
              <div className="dashboard-item" key={p.plan_id}>
                <span className="name">
                  <Link href={`/${auth.authname}/private/plan/detail/${p.plan_id}`}>{p.plan_name}</Link>
                </span>

                <span className="action">
                  <Link href={`/${auth.authname}/private/plan/form/edit/${p.plan_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(p.plan_id, p.plan_name)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private plans yet.</div>
          }
        </div>
      ) : false}

      {tab === "recipes" && subTab === "public" ? (
        <div className="dashboard-content">
          <h2>Public Recipes</h2>

          <Link href={`/${auth.authname}/recipe/form`} className="new-entity">
            Create Public Recipe
          </Link>

          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Unattribute Recipe: '}{deleteName}{' ?'}</p>
                <p>Author will be renamed to "Unknown" and you will no longer control this recipe.</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => unattributePublicRecipe(deleteId)}>
                  Yes, Unattribute Recipe
                </button>
              </AriaModal>
            )
            : false
          }

          {userData.my_public_recipes.length
            ? userData.my_public_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "default"
                    ? <img src={`${publicUrl}/recipe/${auth.auth_id}/${r.image_filename}-tiny.jpg`} />
                    : <div className="img-28-28"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/${auth.authname}/recipe/detail/${r.title}`}>{r.title}</Link>
                </span>

                <span className="action">
                  <Link href={`/${auth.authname}/recipe/form/edit/${r.recipe_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(r.recipe_id, r.title)}
                >Unattribute</span>
              </div>
            ))
            : <div className="no-content">You haven't created any public recipes yet.</div>
          }
        </div>
      ) : false}

      {tab === "recipes" && subTab === "private" ? (
        <div className="dashboard-content">
          <h2>Private Recipes</h2>

          <Link href={`/${auth.authname}/private/recipe/form`} className="new-entity">
            Create Private Recipe
          </Link>

          {modalActive
            ? (
              <AriaModal {...commonAriaModalProps}>
                <p>{'Delete Private Recipe: '}{deleteName}{' ?'}</p>

                <button className="--cancel" onClick={deactivateModal}>
                  Cancel
                </button>

                <button className="--action" onClick={() => deletePrivateRecipe(deleteId)}>
                  Yes, Delete Recipe
                </button>
              </AriaModal>
            )
            : false
          }

          {userData.my_private_recipes.length
            ? userData.my_private_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "default"
                    ? <img src={`${privateUrl}/recipe/${auth.auth_id}/${r.image_filename}-tiny.jpg`} />
                    : <div className="img-28-28"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/${auth.authname}/private/recipe/detail/${r.recipe_id}`}>{r.title}</Link>
                </span>

                <span className="action">
                  <Link href={`/${auth.authname}/private/recipe/form/edit/${r.recipe_id}`}>Edit</Link>
                </span>

                <span
                  className="delete"
                  onClick={() => activateModal(r.recipe_id, r.title)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private recipes yet.</div>
          }
        </div>
      ) : false}

      {tab === "recipes" && subTab === "favorite" ? (
        <div className="dashboard-content">
          <h2 className="--tall">Favorite Recipes</h2>

          {userData.my_favorite_recipes.length
            ? userData.my_favorite_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "default"
                    ? <img src={`${publicUrl}/recipe/${r.author_id}/${r.image_filename}-tiny.jpg`} />
                    : <div className="img--28-18"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/${r.author}/recipe/detail/${r.title}`}>{r.title}</Link>
                </span>

                <span
                  className="unfavorite"
                  onClick={() => unfavorite(r.recipe_id)}
                >Unfavorite</span>
              </div>
            ))
            : <div className="no-content">You haven't favorited any recipes yet.</div>
          }
        </div>
      ): false}

      {tab === "recipes" && subTab === "saved" ? (
        <div className="dashboard-content">
          <h2 className="--tall">Saved Recipes</h2>

          {userData.my_saved_recipes.length
            ? userData.my_saved_recipes.map(r => (
              <div className="dashboard-item" key={r.recipe_id}>
                <span className="tiny">
                  {r.image_filename !== "default"
                    ? <img src={`${publicUrl}/recipe/${r.author_id}/${r.image_filename}-tiny.jpg`} />
                    : <div className="img-28-28"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/${r.author}/recipe/detail/${r.title}`}>{r.title}</Link>
                </span>

                <span
                  className="unsave"
                  onClick={() => unsave(r.recipe_id)}
                >Unsave</span>
              </div>
            ))
            : <div className="no-content">You haven't saved any recipes yet.</div>
          }
        </div>
      ) : false}

      {tab === "ingredients" ? (
        <div className="dashboard-content">
          <h2>Private Ingredients</h2>

          <Link href={`/${auth.authname}/private/ingredient/form`} className="new-entity">
            Create Private Ingredient
          </Link>

          {userData.my_private_ingredients.length
            ? userData.my_private_ingredients.map(i => (
              <div className="dashboard-item" key={i.ingredient_id}>
                <span className="tiny">
                  {i.image_filename !== "default"
                    ? <img src={`${privateUrl}/ingredient/${auth.auth_id}/${i.image_filename}-tiny.jpg`} />
                    : <div className="img-28-28"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/${auth.authname}/private/ingredient/detail/${i.ingredient_id}`}>
                    {i.ingredient_name}
                  </Link>
                </span>

                <span className="action">
                  <Link href={`/${auth.authname}/private/ingredient/form/edit/${i.ingredient_id}`}>
                    Edit
                  </Link>
                </span>

                <span
                  className="delete"
                  onClick={() => deletePrivateIngredient(i.ingredient_id)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private ingredients yet.</div>
          }
        </div>
      ) : false}

      {tab === "equipment" ? (
        <div className="dashboard-content">
          <h2>Private Equipment</h2>

          <Link href={`/${auth.authname}/private/equipment/form`} className="new-entity">
            Create Private Equipment
          </Link>

          {userData.my_private_equipment.length
            ? userData.my_private_equipment.map(e => (
              <div className="dashboard-item" key={e.equipment_id}>
                <span className="tiny">
                  {e.image_filename !== "default"
                    ? <img src={`${privateUrl}/equipment/${auth.auth_id}/${e.image_filename}-tiny.jpg`} />
                    : <div className="img-28-28"></div>
                  }
                </span>

                <span className="name">
                  <Link href={`/${auth.authname}/private/equipment/detail/${e.equipment_id}`}>
                    {e.equipment_name}
                  </Link>
                </span>

                <span className="action">
                  <Link href={`/${auth.authname}/private/equipment/form/edit/${e.equipment_id}`}>
                    Edit
                  </Link>
                </span>

                <span
                  className="delete"
                  onClick={() => deletePrivateEquipment(e.equipment_id)}
                >Delete</span>
              </div>
            ))
            : <div className="no-content">You haven't created any private equipment yet.</div>
          }
        </div>
      ) : false}
    </div>
  );
}
