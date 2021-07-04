import {
  CHECK_NODE_STATUS_START,
  CHECK_NODE_STATUS_SUCCESS,
  CHECK_NODE_STATUS_FAILURE,
  FETCH_BLOCKS_STATUS_START,
  FETCH_BLOCKS_STATUS_SUCCESS,
  FETCH_BLOCKS_STATUS_FAILURE
} from '../constants/actionTypes';
import initialState from './initialState';

export default function nodesReducer(state = initialState().nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };

      // FETCH BLOCKS
      case FETCH_BLOCKS_STATUS_START:
        list = state.list;
        nodeIndex = state.list.findIndex(p => p.url === action.node.url);
        if (nodeIndex >= 0) {
          list = [
            ...state.list.slice(0, nodeIndex),
            {
              ...state.list[nodeIndex],
              showBlocksLoading: true,
              showBlocksError: false
            },
            ...state.list.slice(nodeIndex + 1)
          ];
        }
        return {
          ...state,
          list
        };
      
        case FETCH_BLOCKS_STATUS_SUCCESS:
        list = state.list;
        nodeIndex = state.list.findIndex(p => p.url === action.node.url);
        if (nodeIndex >= 0) {
          list = [
            ...state.list.slice(0, nodeIndex),
            {
              ...state.list[nodeIndex],
              blocks: action.res.data,
              showBlocksLoading: false,
              showBlocksError: false
            },
            ...state.list.slice(nodeIndex + 1)
          ];
        }
        return {
          ...state,
          list
        };
      
      case FETCH_BLOCKS_STATUS_FAILURE:
        list = state.list;
        nodeIndex = state.list.findIndex(p => p.url === action.node.url);
        if (nodeIndex >= 0) {
          list = [
            ...state.list.slice(0, nodeIndex),
            {
              ...state.list[nodeIndex],
              showBlocksLoading: false,
              showBlocksError: true

            },
            ...state.list.slice(nodeIndex + 1)
          ];
        }
        return {
          ...state,
          list
        };
      
    default:
      return state;
  }
}
