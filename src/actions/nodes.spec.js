import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        node,
        res: { node_name: "Secret Lowlands" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  // FETCH BLOCKS
  it("should fetch the blocks", async () => {
    const blocks = {
      data: [{
        "id": "5",
        "type": "blocks",
        "attributes": {
          "data": "The Human Torch",
        }
      }, {
        "id": "6",
        "type": "blocks",
        "attributes": {
          "data": "is denied",
        }
      }, {
        "id": "7",
        "type": "blocks",
        "attributes": {
          "data": "a bank loan",
        }
      }]
  };
    
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ blocks: blocks });
        },
      })
    );
    await ActionCreators.fetchBlocksData(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_BLOCKS_STATUS_START,
        node,
      },
      {
        type: ActionTypes.FETCH_BLOCKS_STATUS_SUCCESS,
        node,
        res: {blocks},
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.fetchBlocksData(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_BLOCKS_STATUS_START,
        node,
      },
      {
        type: ActionTypes.FETCH_BLOCKS_STATUS_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

});
