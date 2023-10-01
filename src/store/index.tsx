import { useState, useCallback }             from "react";
import type { ReactNode }                    from "react";
import { createContext, useContextSelector } from "use-context-selector";

import { getItem, setItem }  from "../modules/general/localStorage";
import type { PlanDataView } from "../modules/plan/detail";

function store() {
  const [ cuisines,         setCuisines ]        = useState<CuisineView[]>(getItem("cuisines") || []);
  const [ equipment,        setEquipment ]       = useState<EquipmentView[]>(getItem("equipment") || []);
  const [ equipment_types,  setEquipmentTypes ]  = useState<EquipmentTypeView[]>(getItem("equipment_types") || []);
  const [ ingredients,      setIngredients ]     = useState<IngredientView[]>(getItem("ingredients") || []);
  const [ ingredient_types, setIngredientTypes ] = useState<IngredientTypeView[]>(getItem("ingredient_types") || []);
  const [ units,            setUnits ]           = useState<UnitView[]>(getItem("units") || []);
  const [ methods,          setMethods ]         = useState<MethodView[]>(getItem("methods") || []);
  const [ recipe_types,     setRecipeTypes ]     = useState<RecipeTypeView[]>(getItem("recipe_types") || []);

  const [ theme, setTheme ] = useState<Theme>(getItem("theme") || "");

  const [ my_friendships,         setMyFriendships ]        = useState<FriendshipView[]>(getItem("my_friendships") || []);
  const [ my_public_plans,        setMyPublicPlans ]        = useState<PlanView[]>(getItem("my_public_plans") || []);
  const [ my_public_recipes,      setMyPublicRecipes ]      = useState<RecipeOverview[]>(getItem("my_public_recipes") || []);
  const [ my_favorite_recipes,    setMyFavoriteRecipes ]    = useState<RecipeOverview[]>(getItem("my_favorite_recipes") || []);
  const [ my_private_equipment,   setMyPrivateEquipment ]   = useState<EquipmentView[]>(getItem("my_private_equipment") || []);
  const [ my_private_ingredients, setMyPrivateIngredients ] = useState<IngredientView[]>(getItem("my_private_ingredients") || []);
  const [ my_private_plans,       setMyPrivatePlans ]       = useState<PlanView[]>(getItem("my_private_plans") || []);
  const [ my_private_recipes,     setMyPrivateRecipes ]     = useState<RecipeOverview[]>(getItem("my_private_recipes") || []);
  const [ my_saved_recipes,       setMySavedRecipes ]       = useState<RecipeOverview[]>(getItem("my_saved_recipes") || []);
  const [ my_chatgroups,          setMyChatgroups ]         = useState<ChatgroupView[]>(getItem("my_chatgroups") || []);
  
  const [ auth_id,    setAuthId ]    = useState<string>(getItem("auth_id") || "");
  const [ auth_email, setAuthEmail ] = useState<string>(getItem("auth_email") || "");
  const [ authname,   setAuthname ]  = useState<string>(getItem("authname") || "");

  const [ connected, setConnected ] = useState(false);

  const [ current_private_conversation, setCurrentPrivateConversation ] = useState(getItem("current_private_conversation") || "");  //other auth_id;
  const [ private_conversations,        setPrivateConversations ]       = useState(getItem("private_conversations") || []);
  const [ private_chatmessages,         setPrivateChatmessages ]        = useState(getItem("private_chatmessages") || []);

  const [ current_chatgroup, setCurrentChatgroup ] = useState(getItem("current_chatgroup") || "");
  const [ chatgroups,        setChatgroups ]       = useState(getItem("chatgroups") || []);
  const [ chatgroup_users,   setChatgroupUsers ]   = useState(getItem("chatgroup_users") || []);

  const [ current_chatroom, setCurrentChatroom ] = useState(getItem("current_chatroom") || "");
  const [ chatrooms,        setChatrooms ]       = useState(getItem("chatrooms") || []);
  const [ chatroom_users,   setChatroomUsers ]   = useState(getItem("chatroom_users") || []);
  const [ chatmessages,     setChatmessages ]    = useState(getItem("chatmessages") || []);

  return {
    cuisines,
    setCuisines: useCallback((cuisines: CuisineView[]) => {
      setCuisines(cuisines);
      setItem("cuisines", cuisines);
    }, []),
    equipment,
    setEquipment: useCallback((equipment: EquipmentView[]) => {
      setEquipment(equipment);
      setItem("equipment", equipment);
    }, []),
    equipment_types,
    setEquipmentTypes: useCallback((equipment_types: EquipmentTypeView[]) => {
      setEquipmentTypes(equipment_types);
      setItem("equipment_types", equipment_types);
    }, []),
    ingredients,
    setIngredients: useCallback((ingredients: IngredientView[]) => {
      setIngredients(ingredients);
      setItem("ingredients", ingredients);
    }, []),
    ingredient_types,
    setIngredientTypes: useCallback((ingredient_types: IngredientTypeView[]) => {
      setIngredientTypes(ingredient_types);
      setItem("ingredient_types", ingredient_types);
    }, []),
    units,
    setUnits: useCallback((units: UnitView[]) => {
      setUnits(units);
      setItem("units", units);
    }, []),
    methods,
    setMethods: useCallback((methods: MethodView[]) => {
      setMethods(methods);
      setItem("methods", methods);
    }, []),
    recipe_types,
    setRecipeTypes: useCallback((recipe_types: RecipeTypeView[]) => {
      setRecipeTypes(recipe_types);
      setItem("recipe_types", recipe_types);
    }, []),

    theme,
    setTheme: useCallback((theme: Theme) => {
      setTheme(theme);
      setItem("theme", theme);
    }, []),

    my_friendships,
    setMyFriendships: useCallback((my_friendships: FriendshipView[]) => {
      setMyFriendships(my_friendships);
      setItem("my_friendships", my_friendships);
    }, []),
    my_public_plans,
    setMyPublicPlans: useCallback((my_public_plans: PlanView[]) => {
      setMyPublicPlans(my_public_plans);
      setItem("my_public_plans", my_public_plans);
    }, []),
    my_public_recipes,
    setMyPublicRecipes: useCallback((my_public_recipes: RecipeOverview[]) => {
      setMyPublicRecipes(my_public_recipes);
      setItem("my_public_recipes", my_public_recipes);
    }, []),
    my_favorite_recipes,
    setMyFavoriteRecipes: useCallback((my_favorite_recipes: RecipeOverview[]) => {
      setMyFavoriteRecipes(my_favorite_recipes);
      setItem("my_favorite_recipes", my_favorite_recipes);
    }, []),
    my_private_equipment,
    setMyPrivateEquipment: useCallback((my_private_equipment: EquipmentView[]) => {
      setMyPrivateEquipment(my_private_equipment);
      setItem("my_private_equipment", my_private_equipment);
    }, []),
    my_private_ingredients,
    setMyPrivateIngredients: useCallback((my_private_ingredients: IngredientView[]) => {
      setMyPrivateIngredients(my_private_ingredients);
      setItem("my_private_ingredients", my_private_ingredients);
    }, []),
    my_private_plans,
    setMyPrivatePlans: useCallback((my_private_plans: PlanView[]) => {
      setMyPrivatePlans(my_private_plans);
      setItem("my_private_plans", my_private_plans);
    }, []),
    my_private_recipes,
    setMyPrivateRecipes: useCallback((my_private_recipes: RecipeOverview[]) => {
      setMyPrivateRecipes(my_private_recipes);
      setItem("my_private_recipes", my_private_recipes);
    }, []),
    my_saved_recipes,
    setMySavedRecipes: useCallback((my_saved_recipes: RecipeOverview[]) => {
      setMySavedRecipes(my_saved_recipes);
      setItem("my_saved_recipes", my_saved_recipes);
    }, []),
    my_chatgroups,
    setMyChatgroups: useCallback((my_chatgroups: []) => {
      setMyChatgroups(my_chatgroups);
      setItem("my_chatgroups", my_chatgroups);
    }, []),

    auth_id,
    // They cannot change their auth_id (user_id). It is set once when they login.
    // They can, however, change their email, username, and password from their dashboard user account settings.
    // (Their password, of course, is never sent from the server, so no need to store it here.)
    auth_email,
    setAuthEmail: useCallback((auth_email: string) => {
      setAuthEmail(auth_email);
      setItem("auth_email", auth_email);
    }, []),
    authname,
    setAuthname: useCallback((authname: string) => {
      setAuthname(authname);
      setItem("authname", authname);
    }, []),

    connected,
    setConnected: useCallback((connected: boolean) => {
      setConnected(connected);
      setItem("connected", connected);
    }, []),

    current_private_conversation,
    setCurrentPrivateConversation: useCallback((current_private_conversation: string) => {
      setCurrentPrivateConversation(current_private_conversation);
      setItem("current_private_conversation", current_private_conversation);
    }, []),
    private_conversations,
    setPrivateConversations: useCallback((private_conversations: PrivateConversation[]) => {
      setPrivateConversations(private_conversations);
      setItem("private_conversations", private_conversations);
    }, []),
    private_chatmessages,
    setPrivateChatmessages: useCallback((private_chatmessages: PrivateChatmessageView[]) => {
      setPrivateChatmessages(private_chatmessages);
      setItem("private_chatmessages", private_chatmessages);
    }, []),

    current_chatgroup,
    setCurrentChatgroup: useCallback((current_chatgroup: string) => {
      setCurrentChatgroup(current_chatgroup);
      setItem("current_chatgroup", current_chatgroup);
    }, []),
    chatgroups,
    setChatgroups: useCallback((chatgroups: ChatgroupView[]) => {
      setChatgroups(chatgroups);
      setItem("chatgroups", chatgroups);
    }, []),
    chatgroup_users,
    setChatgroupUsers: useCallback((chatgroup_users: ChatgroupUserView[]) => {
      setChatgroupUsers(chatgroup_users);
      setItem("chatgroup_users", chatgroup_users);
    }, []),

    current_chatroom,
    setCurrentChatroom: useCallback((current_chatroom: string) => {
      setCurrentChatroom(current_chatroom);
      setItem("current_chatroom", current_chatroom);
    }, []),
    chatrooms,
    setChatrooms: useCallback((chatrooms: ChatroomView[]) => {
      setChatrooms(chatrooms);
      setItem("chatrooms", chatrooms);
    }, []),
    chatroom_users,
    setChatroomUsers: useCallback((chatroom_users: ChatroomUserView[]) => {
      setChatroomUsers(chatroom_users);
      setItem("chatroom_users", chatroom_users);
    }, []),
    chatmessages,
    setChatmessages: useCallback((chatmessages: ChatMessageView[]) => {
      setChatmessages(chatmessages);
      setItem("chatmessages", chatmessages);
    }, []),

    login: useCallback((params: LoginParams) => {
      setAuthId(params.auth_id);
      setItem("auth_id", params.auth_id);
      setAuthEmail(params.auth_email);
      setItem("auth_email", params.auth_email);
      setAuthname(params.authname);
      setItem("authname", params.authname);

      setMyFriendships(params.my_friendships);
      setItem("my_friendships", params.my_friendships);
      setMyPublicPlans(params.my_public_plans);
      setItem("my_public_plans", params.my_public_plans);
      setMyPublicRecipes(params.my_public_recipes);
      setItem("my_public_recipes", params.my_public_recipes);
      setMyFavoriteRecipes(params.my_favorite_recipes);
      setItem("my_favorite_recipes", params.my_favorite_recipes);
      setMyPrivateEquipment(params.my_private_equipment);
      setItem("my_private_equipment", params.my_private_equipment);
      setMyPrivateIngredients(params.my_private_ingredients);
      setItem("my_private_ingredients", params.my_private_ingredients);
      setMyPrivatePlans(params.my_private_plans);
      setItem("my_private_plans", params.my_private_plans);
      setMyPrivateRecipes(params.my_private_recipes);
      setItem("my_private_recipes", params.my_private_recipes);
      setMySavedRecipes(params.my_saved_recipes);
      setItem("my_saved_recipes", params.my_saved_recipes);
      setMyChatgroups(params.my_chatgroups);
      setItem("my_chatgroups", params.my_chatgroups);
    }, []),
    logout: useCallback(() => {
      sessionStorage.clear();
      localStorage.clear();
      
      setCuisines([]);
      setEquipment([]);
      setEquipmentTypes([]);
      setIngredients([]);
      setIngredientTypes([]);
      setUnits([]);
      setMethods([]);
      setRecipeTypes([]);

      //setTheme("light");

      setMyFriendships([]);
      setMyPublicPlans([]);
      setMyPublicRecipes([]);
      setMyFavoriteRecipes([]);
      setMyPrivateEquipment([]);
      setMyPrivateIngredients([]);
      setMyPrivatePlans([]);
      setMyPrivateRecipes([]);
      setMySavedRecipes([]);
      setMyChatgroups([]);

      setAuthId("");
      setAuthEmail("");
      setAuthname("");

      setConnected(false);
      setCurrentPrivateConversation("");
      setPrivateConversations([]);
      setPrivateChatmessages([]);
      setCurrentChatgroup("");
      setChatgroups([]);
      setChatgroupUsers([]);
      setCurrentChatroom("");
      setChatrooms([]);
      setChatroomUsers([]);
      setChatmessages([]);
    }, [])
  };
}

const StoreContext = createContext(store());

export function StoreProvider({ children }: StoreContextProviderProps) {
  return (
    <StoreContext.Provider value={store()}>
      {children}
    </StoreContext.Provider>
  );
}

export function useData() {
  return useContextSelector(StoreContext, (s) => ({
    cuisines:         s.cuisines,
    equipment:        s.equipment,
    equipment_types:  s.equipment_types,
    ingredients:      s.ingredients,
    ingredient_types: s.ingredient_types,
    units:            s.units,
    methods:          s.methods,
    recipe_types:     s.recipe_types
  }));
}

export function useTheme() {
  return useContextSelector(StoreContext, (s) => ({
    theme:    s.theme,
    setTheme: s.setTheme
  }));
}

export function useUserData() {
  return useContextSelector(StoreContext, (s) => ({
    my_friendships:          s.my_friendships,
    setMyFriendships:        s.setMyFriendships,
    my_public_plans:         s.my_public_plans,
    setMyPublicPlans:        s.setMyPublicPlans,
    my_public_recipes:       s.my_public_recipes,
    setMyPublicRecipes:      s.setMyPublicRecipes,
    my_favorite_recipes:     s.my_favorite_recipes,
    setMyFavoriteRecipes:    s.setMyFavoriteRecipes,
    my_private_equipment:    s.my_private_equipment,
    setMyPrivateEquipment:   s.setMyPrivateEquipment,
    my_private_ingredients:  s.my_private_ingredients,
    setMyPrivateIngredients: s.setMyPrivateIngredients,
    my_private_plans:        s.my_private_plans,
    setMyPrivatePlans:       s.setMyPrivatePlans,
    my_private_recipes:      s.my_private_recipes,
    setMyPrivateRecipes:     s.setMyPrivateRecipes,
    my_saved_recipes:        s.my_saved_recipes,
    setMySavedRecipes:       s.setMySavedRecipes,
    my_chatgroups:           s.my_chatgroups,
    setMyChatgroups:         s.setMyChatgroups
  }));
}

export function useAuth() {
  return useContextSelector(StoreContext, (s) => ({
    auth_id:      s.auth_id,
    auth_email:   s.auth_email,
    setAuthEmail: s.setAuthEmail,
    authname:     s.authname,
    setAuthname:  s.setAuthname,
    login:        s.login,
    logout:       s.logout
  }));
}

export function useChat() {
  return useContextSelector(StoreContext, (s) => ({
    connected:                     s.connected,
    setConnected:                  s.setConnected,

    current_private_conversation:  s.current_private_conversation,
    setCurrentPrivateConversation: s.setCurrentPrivateConversation,
    private_conversations:         s.private_conversations,
    setPrivateConversations:       s.setPrivateConversations,
    private_chatmessages:          s.private_chatmessages,
    setPrivateChatMessages:        s.setPrivateChatmessages,

    current_chatgroup:   s.current_chatgroup,
    setCurrentChatgroup: s.setCurrentChatgroup,
    chatgroups:          s.chatgroups,
    setChatgroups:       s.setChatgroups,
    chatgroup_users:     s.chatgroup_users,
    setChatgroupUsers:   s.setChatgroupUsers,

    current_chatroom:   s.current_chatroom,
    setCurrentChatroom: s.setCurrentChatroom,
    chatrooms:          s.chatrooms,
    setChatrooms:       s.setChatrooms,
    chatroom_users:     s.chatroom_users,
    setChatroomUsers:   s.setChatroomUsers,
    chatmessages:       s.chatmessages,
    setChatmessages:    s.setChatmessages
  }));
}

type StoreContextProviderProps = {
  children: ReactNode;
};

export type CuisineView = {
  cuisine_id:     number;
  cuisine_name:   string;
  continent_code: string;
  country_code:   string;
  country_name:   string;
};

export type EquipmentView = {
  equipment_id:        string;
  equipment_type_id:   number;
  owner_id:            string;
  equipment_type_name: string;
  equipment_name:      string;
  notes:               string;
  image: {
    image_filename: string;
    caption:        string;
  };
};

export type EquipmentTypeView = {
  equipment_type_id:   number;
  equipment_type_name: string;
};

export type IngredientView = {
  ingredient_id:        string;
  ingredient_type_id:   number;
  owner_id:             string;
  ingredient_type_name: string;
  ingredient_brand:     string | null;
  ingredient_variety:   string | null;
  ingredient_name:      string;
  fullname:             string;
  notes:                string;
  image: {
    image_filename: string;
    caption:        string;
  };
};

export type IngredientTypeView = {
  ingredient_type_id:   number;
  ingredient_type_name: string;
};

export type UnitView = {
  unit_id:   number;
  unit_name: string;
};

export type MethodView = {
  method_id:   number;
  method_name: string;
};

export type RecipeTypeView = {
  recipe_type_id:   number;
  recipe_type_name: string;
};

type Theme = "light" | "dark";

export type FriendshipView = {
  user_id:  number;
  username: string;
  avatar:   string;
  status:   string;
};  // FriendView ???

export type RecipeOverview = {
  recipe_id:      string;
  owner_id:       string;
  recipe_type_id: number;
  cuisine_id:     number;
  title:          string;
  recipe_image:   {
    image_filename: string;
  };
};

export type PlanView = {
  plan_id:   string;
  owner_id:  string;
  plan_name: string;
  plan_data: PlanDataView;
};

type LoginParams = {
  auth_id:                string;
  auth_email:             string;
  authname:               string;
  my_friendships:         FriendshipView[];
  my_public_plans:        PlanView[];
  my_public_recipes:      RecipeOverview[];
  my_favorite_recipes:    RecipeOverview[];
  my_private_equipment:   EquipmentView[];
  my_private_ingredients: IngredientView[];
  my_private_plans:       PlanView[];
  my_private_recipes:     RecipeOverview[];
  my_saved_recipes:       RecipeOverview[];
  my_chatgroups:          ChatgroupView[];
};

type PrivateConversation = {
  user_id:  string;
  username: string;
};

type PrivateChatmessageView = {
  chatmessage_id: string;
  receiver_id:    string;
  sender_id:      string;
  sendername:     string;
  content:        string;
};

type ChatgroupView = {
  chatgroup_id:   string;
  owner_id:       string;
  chatgroup_name: string;
};

type ChatgroupUserView = {
  chatgroup_id: string;
  username:     string;
  is_admin:     boolean;
  is_muted:     boolean;
};

type ChatroomView = {
  chatroom_id:   string;
  chatgroup_id:  string;
  chatroom_name: string;
};

type ChatroomUserView = {
  chatgroup_id: string;
  chatroom_id:  string;
  username:     string;
  is_admin:     boolean;
  is_muted:     boolean;
};

type ChatMessageView = {
  chatmessage_id: string;
  chatroom_id:    string;
  sender_id:      string;
  sendername:     string;
  content:        string;
};
