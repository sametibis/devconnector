import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action; // const type = action.type; const payload = action.payload

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], // üstüne eklemesi için
        // posts [...state.posts, payload]: alta ekliyor 
        loading: false,
      };

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                likes: payload.likes,
              }
            : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
